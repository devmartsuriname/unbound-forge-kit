
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/use-toast';
import { z } from 'zod';

const loginSchema = z.object({
   email: z.string().email('Invalid email address'),
   password: z.string().min(6, 'Password must be at least 6 characters'),
});

interface LoginFormProps {
   onToggleMode?: () => void;
   isSignUp?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onToggleMode, isSignUp = false }) => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [rememberMe, setRememberMe] = useState(false);
   const [loading, setLoading] = useState(false);
   
   const { signIn, signUp } = useAuth();
   const { toast } = useToast();

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);

      try {
         const validationData = {
            email,
            password,
         };

         const result = loginSchema.safeParse(validationData);
         if (!result.success) {
            const errors = result.error.issues.map((err: any) => err.message).join(', ');
            toast({
               title: 'Validation Error',
               description: errors,
               variant: 'destructive',
            });
            return;
         }

         let error;
         if (isSignUp) {
            ({ error } = await signUp(email, password, firstName, lastName));
         } else {
            ({ error } = await signIn(email, password));
         }

         if (error) {
            toast({
               title: isSignUp ? 'Sign Up Error' : 'Sign In Error',
               description: error.message,
               variant: 'destructive',
            });
         } else {
            toast({
               title: isSignUp ? 'Account Created' : 'Signed In Successfully',
               description: isSignUp 
                  ? 'Please check your email to verify your account.' 
                  : 'Welcome back!',
            });
         }
      } catch (err) {
         toast({
            title: 'Error',
            description: 'An unexpected error occurred',
            variant: 'destructive',
         });
      } finally {
         setLoading(false);
      }
   };

   return (
      <form onSubmit={handleSubmit}>
         <div className="row">
            {isSignUp && (
               <>
                  <div className="col-md-6 mb-25">
                     <input 
                        className="input" 
                        type="text" 
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                     />
                  </div>
                  <div className="col-md-6 mb-25">
                     <input 
                        className="input" 
                        type="text" 
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                     />
                  </div>
               </>
            )}
            <div className="col-lg-12 mb-25">
               <input 
                  className="input" 
                  type="email" 
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
               />
            </div>
            <div className="col-lg-12 mb-25">
               <input 
                  className="input" 
                  type="password" 
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
               />
            </div>
            <div className="col-lg-12">
               <div className="d-flex align-items-center justify-content-between">
                  <div className="review-checkbox d-flex align-items-center mb-25">
                     <input 
                        className="tg-checkbox" 
                        type="checkbox" 
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                     />
                     <label htmlFor="rememberMe" className="tg-label">Remember me</label>
                  </div>
                  <div className="tg-login-navigate mb-25">
                     <button 
                        type="button"
                        onClick={onToggleMode}
                        className="text-decoration-underline border-0 bg-transparent"
                        style={{ fontSize: '15px', textTransform: 'capitalize', color: 'var(--tg-common-black)' }}
                     >
                        {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                     </button>
                  </div>
               </div>
               <button 
                  type="submit" 
                  className="tg-btn w-100"
                  disabled={loading}
               >
                  {loading ? 'Please wait...' : (isSignUp ? 'Sign Up' : 'Sign In')}
               </button>
            </div>
         </div>
      </form>
   )
}

export default LoginForm
