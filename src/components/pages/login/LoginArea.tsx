import { useState } from 'react';
import LoginForm from "../../forms/LoginForm";

const LoginArea = () => {
   const [isSignUp, setIsSignUp] = useState(false);

   const toggleMode = () => {
      setIsSignUp(!isSignUp);
   };

   return (
      <div className="tg-login-area pt-130 pb-130">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-6 col-lg-8 col-md-10">
                  <div className="tg-login-wrapper">
                     <div className="tg-login-top text-center mb-30">
                        <h2>{isSignUp ? 'Create Account' : 'Sign in to your account'}</h2>
                        <p>{isSignUp ? 'Enter your information to create a new account' : 'Enter your credentials to access your account.'}</p>
                     </div>
                     <div className="tg-login-form">
                        <div className="tg-tour-about-review-form">
                           <LoginForm onToggleMode={toggleMode} isSignUp={isSignUp} />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default LoginArea
