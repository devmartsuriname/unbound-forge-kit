import { toast } from 'react-toastify';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { supabase } from '../../integrations/supabase/client';
import { useRef } from 'react';


const schema = yup.object().shape({
   user_name: yup.string().required().label("Name"),
   user_email: yup.string().required().email().label("Email"),
   web: yup.string().optional().label("Website"),
   message: yup.string().required().label("Message"),
});

const ContactForm = () => {

   const { register, handleSubmit, reset, formState: { errors }, } = useForm({ resolver: yupResolver(schema), });

   const form = useRef<HTMLFormElement>(null);

   const sendEmail = async (formData: any) => {
      try {
         // Insert into database
         const { data: submission, error } = await supabase
            .from('contact_submissions')
            .insert([{
               user_name: formData.user_name,
               user_email: formData.user_email,
               web: formData.web || null,
               message: formData.message,
            }])
            .select()
            .single();

         if (error) {
            toast.error('Failed to send message. Please try again.', { position: 'top-center' });
            return;
         }

         // Send email notification
         try {
            await supabase.functions.invoke('send-contact-notification', {
               body: {
                  name: formData.user_name,
                  email: formData.user_email,
                  website: formData.web,
                  message: formData.message,
                  submissionId: submission.id,
               },
            });
         } catch (emailError) {
            console.warn('Email notification failed:', emailError);
            // Don't fail the whole process if email fails
         }

         toast.success('Message sent successfully! We will get back to you soon.', { position: 'top-center' });
         reset();
      } catch (error) {
         console.error('Error sending message:', error);
         toast.error('Failed to send message. Please try again.', { position: 'top-center' });
      }
   };

   return (
      <form ref={form} onSubmit={handleSubmit(sendEmail)} id="contact-form">
         <div className="row">
            <div className="col-lg-6 mb-25">
               <input className="input" type="text" {...register("user_name")} placeholder="Name" />
               <p className="form_error">{errors.user_name?.message}</p>
            </div>
            <div className="col-lg-6 mb-25">
               <input className="input" type="email" {...register("user_email")} placeholder="E-mail" />
               <p className="form_error">{errors.user_email?.message}</p>
            </div>
            <div className="col-lg-12 mb-25">
               <input className="input" type="text" {...register("web")} placeholder="Website" />
               <p className="form_error">{errors.web?.message}</p>
            </div>
            <div className="col-lg-12">
               <textarea className="textarea mb-5" {...register("message")} placeholder="Comments"></textarea>
               <p className="form_error">{errors.message?.message}</p>
               <div className="review-checkbox d-flex align-items-center mb-25">
                  <input name="checkbox" className="tg-checkbox" type="checkbox" id="australia" />
                  <label htmlFor="australia" className="tg-label">
                     Save my name, email, and website in this browser for the next time I comment.
                  </label>
               </div>
               <button type="submit" className="tg-btn" name="message">Send Message</button>
               <p className="ajax-response mb-0 pt-10"></p>
            </div>
         </div>
      </form>
   )
}

export default ContactForm