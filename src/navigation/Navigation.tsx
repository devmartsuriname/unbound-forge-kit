import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import AuthPage from '../pages/AuthPage';
import { AdminLayout } from '../components/admin/AdminLayout';
import AdminDashboard from '../pages/admin/AdminDashboard';
import HomeThreeMain from '../pages/HomeThreeMain';
import ToursMain from '../pages/ToursMain';
import TourDetailMain from '../pages/TourDetailMain';
import AboutMain from '../pages/AboutMain';
import TeamMain from '../pages/TeamMain';
import ShopMain from '../pages/ShopMain';
import ShopDetailsMain from '../pages/ShopDetailsMain';
import CartMain from '../pages/CartMain';
import CheckoutMain from '../pages/CheckoutMain';
import PricingMain from '../pages/PricingMain';
import ScheduleMain from '../pages/ScheduleMain';
import GalleryMain from '../pages/GalleryMain';
import FaqMain from '../pages/FaqMain';
import ContactMain from '../pages/ContactMain';
import TermsMain from '../pages/legal/TermsMain';
import PrivacyMain from '../pages/legal/PrivacyMain';
import CookiesMain from '../pages/legal/CookiesMain';
import ErrorMain from '../pages/ErrorMain';

const AppNavigation = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomeThreeMain />} />
          <Route path="/tours" element={<ToursMain />} />
          <Route path="/tours/:slug" element={<TourDetailMain />} />
          <Route path="/about" element={<AboutMain />} />
          <Route path="/pricing" element={<PricingMain />} />
          <Route path="/schedule" element={<ScheduleMain />} />
          <Route path="/team" element={<TeamMain />} />
          <Route path="/gallery" element={<GalleryMain />} />
          <Route path="/faq" element={<FaqMain />} />
          <Route path="/shop" element={<ShopMain />} />
          <Route path="/shop/:slug" element={<ShopDetailsMain />} />
          <Route path="/cart" element={<CartMain />} />
          <Route path="/checkout" element={<CheckoutMain />} />
          <Route path="/contact" element={<ContactMain />} />
          <Route path="/legal/terms" element={<TermsMain />} />
          <Route path="/legal/privacy" element={<PrivacyMain />} />
          <Route path="/legal/cookies" element={<CookiesMain />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
          </Route>
          <Route path="*" element={<ErrorMain />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppNavigation;
