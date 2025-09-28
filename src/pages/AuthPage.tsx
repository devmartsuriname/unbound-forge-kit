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
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Portal</h1>
            <p className="mt-2 text-sm text-gray-600">Sign in to access the admin dashboard</p>
          </div>
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10">
            <LoginArea />
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