# Jungle Resort PingPe - Task Tracking

## Phase 0: Project Hygiene & Setup
**Status**: 🟡 In Progress

### Documentation
- [x] Create PRD.md 
- [x] Create Tasks.md
- [x] Create Architecture.md
- [x] Create Backend.md
- [x] Create BookingFlow.md
- [x] Create Payments.md
- [x] Create ContentMapping.md
- [x] Create SEO.md
- [x] Create Legal.md
- [x] Create Localization.md
- [x] Create Changelog.md
- [x] Create RestorePoint.md

### Route Cleanup
- [ ] Audit existing routes in App.tsx/Router
- [ ] Remove Home variants (except Home Three)
- [ ] Remove Hotel* pages
- [ ] Remove Blog pages
- [ ] Remove Auth pages
- [ ] Remove Restaurant/Rental pages
- [ ] Update navigation components
- [ ] Verify all kept routes work

### Dependencies & Setup
- [ ] Install react-i18next + i18next
- [ ] Install zod for validation
- [ ] Install GA4 package (@gtag/lib)
- [ ] Install Meta Pixel package
- [ ] Setup cookie consent banner
- [ ] Configure path aliases (@/components, @/utils, etc.)

---

## Phase 1: Content Pass
**Status**: ⬜ Not Started

### Internationalization
- [ ] Setup i18next configuration
- [ ] Create translation files (en.json, nl.json)
- [ ] Add language switcher component
- [ ] Externalize all hardcoded strings
- [ ] Test language switching functionality

### Home Page (Home Three)
- [ ] Replace hero section with jungle resort USPs
- [ ] Update hero imagery (jungle/resort)
- [ ] Replace tour cards with PingPe tours
- [ ] Update testimonials section
- [ ] Add WhatsApp booking CTA
- [ ] Update footer content

### Tours Section
- [ ] Replace demo tours with jungle tour content
- [ ] Create tour detail page structure
- [ ] Add itinerary day-by-day sections
- [ ] Include/exclude lists per tour
- [ ] Practical information sections
- [ ] Gallery integration
- [ ] FAQ sections per tour
- [ ] Booking CTA buttons

### About Page
- [ ] Replace with resort story
- [ ] Eco-tourism & sustainability content
- [ ] Local community partnership info
- [ ] Safety & certifications
- [ ] Update imagery

### Team Page
- [ ] Replace with jungle guides
- [ ] Local staff profiles
- [ ] Guide certifications & experience
- [ ] Languages spoken
- [ ] Specialties (birding, survival, etc.)

### Pricing Page
- [ ] Convert to tour package pricing
- [ ] Multi-day tour inclusions
- [ ] Payment options explanation
- [ ] Group discounts info
- [ ] Cancellation policy summary

### Schedule Page
- [ ] Monthly departure calendar
- [ ] Seasonal availability info
- [ ] Weather considerations
- [ ] Best time to visit guide

### Gallery Page
- [ ] Jungle & wildlife photos
- [ ] Resort facilities
- [ ] Tour activities
- [ ] Guest experiences
- [ ] Before/after lightbox functionality

### FAQ Page
- [ ] Booking & payment questions
- [ ] What to bring/pack
- [ ] Physical requirements
- [ ] Safety & insurance
- [ ] Weather & seasons
- [ ] Transportation
- [ ] Food & dietary restrictions

### Contact Page
- [ ] Resort location & map
- [ ] WhatsApp integration
- [ ] Contact form (no backend yet)
- [ ] Emergency contact info
- [ ] Getting there directions

### Legal Pages
- [ ] Terms & Conditions draft
- [ ] Privacy Policy draft
- [ ] Cookie Policy draft
- [ ] Booking terms specific
- [ ] Liability disclaimers

### Analytics & Tracking
- [ ] GA4 setup & configuration
- [ ] Meta Pixel implementation
- [ ] Cookie consent banner
- [ ] Privacy-compliant tracking
- [ ] Test event firing

---

## Phase 2: Backend Foundation
**Status**: ⬜ Requires Supabase Connection

### Supabase Setup
- [ ] Connect Lovable to Supabase
- [ ] Create database schema
- [ ] Setup Row Level Security
- [ ] Configure authentication
- [ ] Setup storage buckets

### Database Tables
- [ ] tours table with NL/EN fields
- [ ] tour_departures with availability
- [ ] bookings table
- [ ] payments table
- [ ] products table (shop)
- [ ] orders table
- [ ] media table
- [ ] settings table

### Edge Functions
- [ ] Payment webhook handler
- [ ] Booking confirmation emails
- [ ] Availability checker
- [ ] Order processing

---

## Phase 3: Booking System
**Status**: ⬜ Depends on Phase 2

### Tour Catalog
- [ ] Dynamic tour loading from Supabase
- [ ] Filter functionality
- [ ] Search capabilities
- [ ] Pagination
- [ ] Tour detail dynamic content

### Availability Engine
- [ ] 72-hour cutoff logic
- [ ] Capacity management
- [ ] Real-time availability
- [ ] Departure calendar component

### Booking Flow
- [ ] Date selection UI
- [ ] Passenger details form
- [ ] Payment method selection
- [ ] Confirmation page
- [ ] Email confirmations

---

## Phase 4: Payments Integration
**Status**: ⬜ Depends on Phase 3

### Payment Providers
- [ ] Stripe integration
- [ ] PayPal integration
- [ ] Bank transfer instructions
- [ ] Local payment options

### Payment Processing
- [ ] Webhook handling
- [ ] Payment status updates
- [ ] Refund processing
- [ ] Payment failure handling

---

## Phase 5: Shop System
**Status**: ⬜ Optional for v1

### Product Catalog
- [ ] Product display
- [ ] Inventory management
- [ ] Cart functionality
- [ ] Checkout process

---

## Phase 6: SEO & Performance
**Status**: ⬜ Final Phase

### SEO Implementation
- [ ] Meta tags per page
- [ ] JSON-LD structured data
- [ ] Sitemap generation
- [ ] Open Graph tags

### Performance Optimization
- [ ] Image optimization
- [ ] Code splitting
- [ ] Lazy loading
- [ ] Lighthouse audit
- [ ] Accessibility improvements

---

## Current Priority: Phase 0 - Documentation Complete ✅

**Next Steps**: 
1. Route cleanup and dependency installation
2. Begin Phase 1 content pass

**Blockers**: 
- Phase 2+ requires Supabase integration
- Payment functionality needs Stripe/PayPal setup

**Notes**:
- Maintain pixel-perfect design parity with Tourex
- All content changes only, no layout modifications
- Prepare for backend integration in Phase 2

---

**Last Updated**: Initial creation
**Next Review**: After Phase 0 completion