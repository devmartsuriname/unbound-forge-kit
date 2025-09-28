# Jungle Resort PingPe - Frontend Architecture

## Overview

This document outlines the frontend architecture for the Jungle Resort PingPe booking platform, built on the existing Tourex React template with minimal layout changes.

## Technology Stack

### Core Framework
- **React 18.3** - Component library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **SCSS/Bootstrap** - Styling (existing Tourex design)

### State Management
- **Redux Toolkit** - Global state management
- **React Hook Form** - Form state and validation
- **React Query/SWR** - Server state (future consideration)

### Routing & Navigation
- **React Router v6** - Client-side routing
- **React Helmet Async** - SEO meta management

### Internationalization
- **react-i18next** - NL/EN translations
- **i18next-browser-languagedetector** - Language detection

### Forms & Validation
- **react-hook-form** - Form handling
- **zod** - Schema validation
- **@hookform/resolvers** - Validation integration

### UI Components
- **Existing Tourex Components** - Maintaining design parity
- **React Modal Video** - Gallery lightbox
- **React Toastify** - Notifications
- **React Paginate** - Pagination
- **Flatpickr** - Date picking

### Analytics & Tracking
- **GA4** - Google Analytics
- **Meta Pixel** - Facebook tracking
- **Cookie Consent** - GDPR compliance

## Folder Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Shared components
│   ├── forms/           # Form components
│   ├── layout/          # Layout components
│   └── tours/           # Tour-specific components
├── pages/               # Route components
│   ├── Home/
│   ├── Tours/
│   ├── About/
│   ├── Shop/
│   └── Legal/
├── hooks/               # Custom React hooks
├── services/            # API and external services
│   ├── api/            # Supabase client
│   ├── payments/       # Payment providers
│   └── analytics/      # Tracking services
├── store/               # Redux store configuration
│   ├── slices/         # Redux slices
│   └── middleware/     # Custom middleware
├── utils/               # Utility functions
├── types/               # TypeScript type definitions
├── locales/             # Translation files
│   ├── en/
│   └── nl/
├── assets/              # Static assets
└── styles/              # SCSS files (existing)
```

## Route Structure

### Active Routes (Keep)
```
/ → Home (Home Three variant)
/tours → Tours catalog
/tours/:slug → Tour detail
/about → About resort
/pricing → Tour packages
/schedule → Departure calendar
/team → Guides & staff
/gallery → Photo gallery
/contact → Contact & location
/faq → Frequently asked questions
/legal/terms → Terms & conditions
/legal/privacy → Privacy policy
/legal/cookies → Cookie policy
/shop → Resort crafts
/shop/:slug → Product detail
/cart → Shopping cart
/checkout → Checkout process
```

### Removed Routes
- All other Home variants
- Hotel* pages
- Blog/news pages
- Auth pages (login/register)
- Restaurant pages
- Rental pages

## State Management Architecture

### Redux Store Structure
```typescript
interface RootState {
  tours: ToursState;
  bookings: BookingsState;
  shop: ShopState;
  ui: UIState;
  user: UserState;
  i18n: LocalizationState;
}
```

### Key State Slices

**Tours State**
```typescript
interface ToursState {
  tours: Tour[];
  currentTour: Tour | null;
  departures: Departure[];
  filters: TourFilters;
  loading: boolean;
  error: string | null;
}
```

**Booking State**
```typescript
interface BookingsState {
  currentBooking: Booking | null;
  selectedDeparture: Departure | null;
  passengers: PassengerInfo[];
  paymentMethod: PaymentMethod;
  status: BookingStatus;
}
```

**Shop State**
```typescript
interface ShopState {
  products: Product[];
  cart: CartItem[];
  checkout: CheckoutInfo;
  orders: Order[];
}
```

## Service Layer Architecture

### API Service Abstraction
```typescript
// services/api/supabase.ts
class SupabaseService {
  async getTours(): Promise<Tour[]>
  async getTourBySlug(slug: string): Promise<Tour>
  async getDepartures(tourId: string): Promise<Departure[]>
  async createBooking(booking: BookingRequest): Promise<Booking>
  async updateBookingStatus(id: string, status: BookingStatus): Promise<void>
}

// services/api/index.ts
export const apiService = new SupabaseService();
```

### Payment Service Abstraction
```typescript
// services/payments/index.ts
interface PaymentProvider {
  createPayment(amount: number, metadata: any): Promise<PaymentResponse>
  handleWebhook(payload: any): Promise<WebhookResult>
  refundPayment(paymentId: string): Promise<RefundResponse>
}

class StripeProvider implements PaymentProvider { /* ... */ }
class PayPalProvider implements PaymentProvider { /* ... */ }

export const paymentService = {
  stripe: new StripeProvider(),
  paypal: new PayPalProvider(),
}
```

### Analytics Service
```typescript
// services/analytics/index.ts
class AnalyticsService {
  trackTourView(tourSlug: string): void
  trackBookingStart(tourId: string): void
  trackBookingComplete(bookingId: string, amount: number): void
  trackPageView(path: string): void
}

export const analytics = new AnalyticsService();
```

## Component Architecture

### Layout Components
```typescript
// components/layout/AppLayout.tsx
const AppLayout: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="app-layout">
    <Header />
    <main>{children}</main>
    <Footer />
    <CookieConsent />
    <ToastContainer />
  </div>
);
```

### Form Components
```typescript
// components/forms/BookingForm.tsx
const BookingForm: React.FC<BookingFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema)
  });
  
  return <form onSubmit={handleSubmit(onSubmit)}>...</form>;
};
```

### Tour Components
```typescript
// components/tours/TourCard.tsx
const TourCard: React.FC<{ tour: Tour }> = ({ tour }) => (
  <div className="tour-card">
    <img src={tour.imageUrl} alt={tour.title} />
    <h3>{tour.title}</h3>
    <p>{tour.summary}</p>
    <div className="price">€{tour.priceFrom}</div>
    <Link to={`/tours/${tour.slug}`}>View Details</Link>
  </div>
);
```

## Data Flow Patterns

### Booking Flow
```
User Action → Form Validation → Redux Action → API Service → Supabase
    ↓
Webhook Response → Payment Service → Status Update → UI Update
```

### Tour Catalog Flow
```
Page Load → API Request → Supabase Query → Redux State → Component Render
    ↓
Filter Change → Redux Action → Re-fetch Data → Updated UI
```

## Performance Considerations

### Code Splitting
- Route-based splitting with React.lazy()
- Component-level splitting for heavy components
- Dynamic imports for non-critical features

### Image Optimization
- WebP format with fallbacks
- Responsive images with srcset
- Lazy loading for below-fold images

### Bundle Optimization
- Tree shaking for unused code
- Vendor chunks for better caching
- Critical CSS inlining

## Error Boundaries

```typescript
// components/common/ErrorBoundary.tsx
class ErrorBoundary extends React.Component {
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    analytics.trackError(error.message, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

## Testing Strategy

### Unit Tests
- Component testing with React Testing Library
- Hook testing with @testing-library/react-hooks
- Service layer testing with Jest

### Integration Tests
- Form submission flows
- Payment processing
- Booking workflows

### E2E Tests (Future)
- Critical user paths
- Payment flows
- Multi-language functionality

## Security Considerations

### Frontend Security
- Input sanitization
- XSS prevention
- CSRF protection via Supabase
- Secure payment tokenization

### Data Validation
- Client-side validation with zod
- Server-side validation in Supabase
- Type safety with TypeScript

## Migration & Portability

### Vendor Independence
- Abstract payment providers
- Database abstraction layer
- Analytics service abstraction
- Configurable endpoints

### Future Migrations
- Service interfaces for easy swapping
- Environment-based configuration
- Minimal vendor-specific code

## Development Workflow

### Code Standards
- ESLint + Prettier configuration
- TypeScript strict mode
- Component naming conventions
- File organization standards

### Git Workflow
- Feature branches
- PR reviews required
- Automated testing on CI
- Deployment automation

---

**Last Updated**: Initial architecture design
**Next Review**: After Phase 1 implementation