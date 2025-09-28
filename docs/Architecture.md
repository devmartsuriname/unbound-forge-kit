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

### Active Routes (Phase 0 Complete)
```
/ → HomeThreeMain (primary homepage)
/tours → ToursMain (renamed from TourGridOneMain)
/tours/:slug → TourDetailMain (renamed from TourDetailsOneMain)
/about → AboutMain
/pricing → PricingMain
/schedule → ScheduleMain (NEW - departure calendar)
/team → TeamMain
/gallery → GalleryMain (NEW - photo galleries)
/contact → ContactMain
/faq → FaqMain
/legal/terms → TermsMain (NEW - terms & conditions)
/legal/privacy → PrivacyMain (NEW - privacy policy)  
/legal/cookies → CookiesMain (NEW - cookie policy)
/shop → ShopMain
/shop/:slug → ShopDetailsMain
/cart → CartMain
/checkout → CheckoutMain
/* → ErrorMain (404 fallback)
```

### Removed Routes (17 pages deleted)
```
✅ Home variants: /home-two, /home-four, /home-five, /home-six, /home-seven
✅ Hotel pages: /hotel-grid, /tour-grid-1, /map-listing
✅ Blog pages: /blog-grid, /blog-standard, /blog-details  
✅ Auth pages: /login, /register
✅ Other: /team-details, /wishlist, /tour-details-2
```

### Navigation Structure (Updated)
```
Home | Tours | About | Pricing | Schedule | Team | Gallery | FAQ | Shop | Contact
```
Legal pages accessible via footer links.

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

## Design System Integration

### Design Foundation
The entire application follows the **Tourex Design System** documented in `/docs/DesignGuide.md`. This includes:
- **Color System**: CSS variables with `--tg-` prefix for theming
- **Typography**: Poppins (body) and Outfit (display) font families
- **Spacing**: Responsive padding utilities and Bootstrap grid extensions
- **Components**: Standardized button variants, form elements, and utility classes

### Backend Interface Consistency
All admin interfaces and dashboard components must adhere to the Tourex design system:
- Use existing color variables (`--tg-theme-primary`, `--tg-grey-*`, etc.)
- Follow typography scale and spacing patterns
- Implement responsive breakpoints and mobile-first design
- Maintain accessibility standards and touch target sizes

Refer to `/docs/DesignGuide.md` for complete implementation guidelines.

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

## Backend Layout & Module Architecture

### Layout Structure

The backend administration interface follows a modern, responsive layout pattern with integrated theme switching capabilities:

```
┌─────────────────────────────────────────────────────────────┐
│ Header Bar (Global theme toggle + user menu)                │
├─────────────────────────────────────────────────────────────┤
│ Sidebar Nav  │ Main Content Area                            │
│              │                                              │
│ ◉ Dashboard  │ ┌─────────────────────────────────────────┐ │
│ ◉ Tours      │ │                                         │ │
│ ◉ Bookings   │ │        Dynamic Content                  │ │
│ ◉ Payments   │ │        (Based on sidebar selection)     │ │
│ ◉ FAQ        │ │                                         │ │
│ ◉ Team       │ │                                         │ │
│ ◉ Contact    │ │                                         │ │
│ ◉ Content    │ │                                         │ │
│ ◉ Shop       │ │                                         │ │
│ ◉ Gallery    │ │                                         │ │
│ ◉ Users      │ │                                         │ │
│ ◉ Analytics  │ │                                         │ │
│ ◉ Settings   │ └─────────────────────────────────────────┘ │
│              │                                              │
└─────────────────────────────────────────────────────────────┘
```

### Module Architecture

#### Phase 2: Foundation Setup
**Status**: Pending Implementation
**Priority**: Critical Infrastructure

- **Admin Layout Component**: Sidebar navigation with Shadcn Sidebar integration
- **Theme System**: Light/Dark/System mode switching using Tourex CSS variables
- **Authentication**: Supabase Auth with role-based access control
- **Protected Routes**: Admin route guards with permission checking
- **Responsive Design**: Mobile-first admin interface following Tourex breakpoints

#### Phase 3: Core Modules (Priority 1)
**Status**: Backend Foundation Required

**Dashboard Module**
- Real-time booking statistics and tour performance metrics
- Recent bookings overview with status indicators
- Revenue tracking and payment summaries
- Quick access to pending tasks and notifications

**Tours Management Module**
- CRUD operations for tours with bilingual content (EN/NL)
- Tour itinerary management with day-by-day scheduling
- Pricing configuration and seasonal adjustments
- Tour media gallery management and featured image selection

**Bookings Management Module**
- Complete booking lifecycle management from inquiry to completion
- Passenger information management with contact details
- Booking status tracking (pending, confirmed, paid, completed, cancelled)
- Departure capacity management and availability updates

**Payments & Finance Module**
- Payment processing integration with Stripe/PayPal/Bank transfers
- Financial reporting with booking revenue analysis
- Refund processing and payment dispute management
- Automated payment confirmation and receipt generation

#### Phase 4: Content Management (Priority 2)
**Status**: Phase 3 Dependencies

**FAQ Management Module**
- Four-category FAQ system (Booking & Payment, Tour Preparation, During Tour, Health & Safety)
- Bilingual FAQ content management with rich text editing
- FAQ ordering and categorization with drag-and-drop interface
- Public FAQ display with search and filtering capabilities

**Team Management Module**
- Staff profile management with certifications and specialties
- Guide availability tracking and tour assignment
- Language skills documentation and communication preferences
- Staff photo management and bio content (EN/NL)

**Contact Submissions Module**
- Customer inquiry management with response tracking
- Automated email integration using Resend service
- Inquiry categorization and priority assignment
- Response templates for common inquiries

**Content Management Module**
- About page content editing with rich text capabilities
- Homepage section management (hero, testimonials, features)
- Blog content management for cultural and wildlife articles
- SEO metadata management for all content pages

#### Phase 5: Advanced Features (Priority 3)
**Status**: Optional for MVP

**Shop/Products Management Module**
- Product catalog with inventory tracking and variant management
- Order processing and fulfillment workflow
- Customer order history and support ticket integration
- Product media management and pricing strategies

**Gallery Management Module**
- Photo and video upload with categorization and tagging
- Gallery organization by tour, location, and activity type
- Media optimization and responsive image generation
- Public gallery display with lightbox functionality

**User Management Module**
- Customer account management with booking history
- Admin user roles and permission management
- User activity tracking and engagement analytics
- Customer communication preferences and marketing consent

**Analytics & Reporting Module**
- Business intelligence dashboard with key performance indicators
- Booking trends analysis and seasonal performance reports
- Customer behavior tracking and conversion optimization
- Financial reporting with profit margin analysis

#### Phase 6: Authentication & Security Enhancements (Priority 4)
**Status**: Ongoing Security Requirements

**Advanced Authentication**
- Multi-factor authentication for admin accounts
- Session management with automatic timeout and renewal
- Audit logging for all admin actions and data modifications
- API rate limiting and request validation

**Security & Compliance**
- Data encryption for sensitive customer information
- GDPR compliance tools for data export and deletion
- Backup and disaster recovery procedures
- Security monitoring and intrusion detection

### Theme Integration Strategy

The backend interface leverages the established Tourex Design System:

- **CSS Variables**: All `--tg-*` variables from the Design Guide for consistent theming
- **Component Library**: Shadcn components styled with Tourex color tokens
- **Responsive Breakpoints**: Mobile-first design using Tourex grid system
- **Typography**: Poppins/Outfit font families with established scale
- **Dark Mode**: Automatic theme switching with system preference detection

### Technical Implementation Notes

- **Authentication**: Supabase RLS policies for secure data access
- **Real-time Updates**: Supabase realtime subscriptions for live data
- **Form Validation**: Zod schemas with bilingual error messages
- **State Management**: Redux Toolkit for complex admin state
- **File Uploads**: Supabase Storage for media and document management

---

**Last Updated**: Backend Layout Plan created (Phase 1B Ready)
**Next Review**: After Phase 2 foundation implementation