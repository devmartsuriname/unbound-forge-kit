import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactNotificationRequest {
  name: string;
  email: string;
  website?: string;
  message: string;
  submissionId: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Contact notification function called");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, website, message, submissionId }: ContactNotificationRequest = await req.json();
    
    console.log("Processing contact notification for:", email);

    // Send confirmation email to user
    const userEmailResponse = await resend.emails.send({
      from: "PingPe Jungle Resort <noreply@resend.dev>",
      to: [email],
      subject: "Thank you for contacting PingPe Jungle Resort",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #047857;">Thank you for your message!</h2>
          <p>Dear ${name},</p>
          <p>We have received your message and will get back to you within 24 hours.</p>
          <div style="background-color: #f3f4f6; padding: 20px; margin: 20px 0; border-radius: 8px;">
            <h3>Your message:</h3>
            <p style="font-style: italic;">"${message}"</p>
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

    // Send notification email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "PingPe Contact Form <notifications@resend.dev>",
      to: ["admin@pingpe-resort.com"], // Replace with actual admin email
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">New Contact Form Submission</h2>
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${website ? `<p><strong>Website:</strong> ${website}</p>` : ''}
            <p><strong>Submission ID:</strong> ${submissionId}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>
          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #047857; margin: 20px 0;">
            <h3>Message:</h3>
            <p>${message}</p>
          </div>
          <p><a href="#" style="background-color: #047857; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View in Admin Panel</a></p>
        </div>
      `,
    });

    console.log("Admin notification email sent:", adminEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        userEmailId: userEmailResponse.data?.id,
        adminEmailId: adminEmailResponse.data?.id 
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
    console.error("Error in send-contact-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);