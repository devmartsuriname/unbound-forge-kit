import ReactGA from 'react-ga4';

// Analytics configuration
const MEASUREMENT_ID = process.env.VITE_GA_MEASUREMENT_ID || '';
const META_PIXEL_ID = process.env.VITE_META_PIXEL_ID || '';

// Initialize Google Analytics 4
export const initGA = () => {
  if (MEASUREMENT_ID) {
    ReactGA.initialize(MEASUREMENT_ID);
  }
};

// Track page views
export const trackPageView = (path: string, title?: string) => {
  if (MEASUREMENT_ID) {
    ReactGA.send({ 
      hitType: 'pageview', 
      page: path,
      title: title || document.title
    });
  }
};

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (MEASUREMENT_ID) {
    ReactGA.event({
      action,
      category,
      label,
      value
    });
  }
};

// Track booking events
export const trackBookingEvent = (eventName: string, tourId?: string, value?: number) => {
  trackEvent(eventName, 'Booking', tourId, value);
};

// Track shop events  
export const trackShopEvent = (eventName: string, productId?: string, value?: number) => {
  trackEvent(eventName, 'Shop', productId, value);
};

// Initialize Meta Pixel (placeholder)
export const initMetaPixel = () => {
  if (META_PIXEL_ID) {
    // Meta Pixel implementation to be added when configured
    console.log('Meta Pixel ready for configuration:', META_PIXEL_ID);
  }
};

// Initialize all analytics
export const initAnalytics = () => {
  initGA();
  initMetaPixel();
};