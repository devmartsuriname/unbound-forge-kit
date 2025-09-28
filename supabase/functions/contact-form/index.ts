import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@4.0.0";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const CONTACT_FORM_TO = Deno.env.get("CONTACT_FORM_TO") || "info@jungleresortpingpe.com";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const resend = new Resend(RESEND_API_KEY);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactRequest {
  user_name: string;
  user_email: string;
  web?: string;
  message: string;
  language?: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Contact form function called");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Generate idempotency key and get client IP
    const idem = req.headers.get("x-request-id") ?? crypto.randomUUID();
    const ip = req.headers.get("x-forwarded-for")?.split(',')[0]?.trim() ?? "";
    
    const body: ContactRequest = await req.json();
    console.log("Processing contact form for:", body.user_email);

    // Validate required fields
    if (!body.user_name || !body.user_email || !body.message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

    // Rate limiting: prevent >3 submissions per 10 minutes by same email/IP
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const { data: recent } = await supabase
      .from("contact_submissions")
      .select("id, created_at")
      .gte("created_at", tenMinutesAgo)
      .or(`user_email.eq.${body.user_email},ip.eq.${ip}`)
      .limit(3);

    if (recent && recent.length >= 3) {
      console.log("Rate limit exceeded for:", body.user_email, ip);
      return new Response(
        JSON.stringify({ error: "rate_limited", message: "Too many submissions. Please try again later." }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Store submission with idempotency
    const submissionId = crypto.randomUUID();
    const { error: insertError } = await supabase
      .from("contact_submissions")
      .insert({
        id: submissionId,
        user_name: body.user_name,
        user_email: body.user_email,
        web: body.web || null,
        message: body.message,
        status: 'new',
        language: body.language || "en",
        idempotency_key: idem,
        ip: ip || null
      });

    if (insertError && !insertError.message.includes("duplicate key")) {
      console.error("Database insert error:", insertError);
      throw insertError;
    }

    // Send notification email via Resend
    try {
      const userEmailResponse = await resend.emails.send({
        from: "PingPe Jungle Resort <noreply@resend.dev>",
        to: [body.user_email],
        subject: "Thank you for contacting PingPe Jungle Resort",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #047857;">Thank you for your message!</h2>
            <p>Dear ${body.user_name},</p>
            <p>We have received your message and will get back to you within 24 hours.</p>
            <div style="background-color: #f3f4f6; padding: 20px; margin: 20px 0; border-radius: 8px;">
              <h3>Your message:</h3>
              <p style="font-style: italic;">"${body.message}"</p>
            </div>
            <p>We look forward to helping you plan your Suriname jungle adventure!</p>
            <p>Best regards,<br>The PingPe Jungle Resort Team</p>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 12px; color: #6b7280;">
              Submission ID: ${submissionId}<br>
              This is an automated message. Please do not reply to this email.
            </p>
          </div>
        `,
      });

      console.log("User confirmation email sent:", userEmailResponse);

      // Send admin notification
      const adminEmailResponse = await resend.emails.send({
        from: "PingPe Contact Form <notifications@resend.dev>",
        to: [CONTACT_FORM_TO],
        subject: `New Contact Form Submission from ${body.user_name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #dc2626;">New Contact Form Submission</h2>
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${body.user_name}</p>
              <p><strong>Email:</strong> ${body.user_email}</p>
              ${body.web ? `<p><strong>Website:</strong> ${body.web}</p>` : ''}
              <p><strong>Language:</strong> ${body.language || 'en'}</p>
              <p><strong>Submission ID:</strong> ${submissionId}</p>
              <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
              <p><strong>IP Address:</strong> ${ip || 'Unknown'}</p>
            </div>
            <div style="background-color: #fff; padding: 20px; border-left: 4px solid #047857; margin: 20px 0;">
              <h3>Message:</h3>
              <p>${body.message}</p>
            </div>
          </div>
        `,
      });

      console.log("Admin notification email sent:", adminEmailResponse);

    } catch (emailError) {
      console.error("Email sending error:", emailError);
      // Don't fail the entire request if email fails
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        submissionId,
        message: "Contact form submitted successfully"
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );

  } catch (error: any) {
    console.error("Error in contact-form function:", error);
    return new Response(
      JSON.stringify({ 
        error: "internal_error",
        message: "An error occurred while processing your request"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);