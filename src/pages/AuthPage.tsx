import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginArea from '../components/pages/login/LoginArea';
import InnerHeader from '../layouts/headers/InnerHeader';
import FooterFive from '../layouts/footers/FooterFive';

export default function AuthPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if this is an admin-related auth request
  const isAdminAuth = location.state?.from?.pathname?.startsWith('/admin') || 
                     location.pathname === '/admin/auth' ||
                     new URLSearchParams(location.search).get('admin') === 'true';

  useEffect(() => {
    if (user) {
      // Redirect to admin if this was an admin auth request
      if (isAdminAuth) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  }, [user, navigate, isAdminAuth]);

  // Clean admin auth layout - no public header/footer
  if (isAdminAuth) {
    return (
      <div className="tg-login-area admin-auth d-flex align-items-center" style={{ minHeight: '100vh' }}>
        <div className="w-100" style={{ background: 'var(--tg-grey-5)', padding: '40px 20px' }}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10">
                <div className="tg-login-wrapper admin-portal">
                  <div className="tg-login-top text-center mb-30">
                    <h2>Admin Portal</h2>
                    <p>Sign in to access the admin dashboard</p>
                  </div>
                  <LoginArea />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Regular public auth layout with header/footer
  return (
    <>
      <InnerHeader />
      <main>
        <LoginArea />
      </main>
      <FooterFive />
    </>
  );
}