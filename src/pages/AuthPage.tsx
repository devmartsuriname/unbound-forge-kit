import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoginArea from '../components/pages/login/LoginArea';
import InnerHeader from '../layouts/headers/InnerHeader';
import FooterFive from '../layouts/footers/FooterFive';

export default function AuthPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

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