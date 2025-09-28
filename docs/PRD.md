# Jungle Resort PingPe Booking Platform (v1.0)

## 1) Problem Statement (The XYZ Problem)

Travelers struggle to **discover, compare, and book** authentic multi-day jungle tours (PingPe) online. Current flows are fragmented (manual inquiries, slow confirmations, unclear availability/pricing) and lack instant, secure **pay-online checkout**. Operators need a **maintainable, modular** platform to publish tours, schedules, and accept payments, without compromising future migration or scalability.

---

## 2) Goals & Objectives

* Enable **direct online booking & full payment** (no deposits) for PingPe tours.
* Keep **Tourex React** visual design **unchanged**; only replace demo content.
* Provide **NL/EN** content parity and SEO foundations for EU markets.
* Implement **availability, capacity & 72h cut-off** logic.
* Offer **Stripe / PayPal** online payments + **bank transfer** & **local options** as offline methods with clear instructions.
* Add **Shop** for resort crafts (separate cart/checkout).
* Prepare a clean **Supabase** backend with strict RLS for tours, departures, bookings, payments, and shop.

---

## 3) Target Users & Personas

* **Explorer Couples/Friends (EU)** – want authentic experiences; easy online payment.
* **Small Groups/Family** – value clarity on itinerary, safety, inclusions, and capacity.
* **Local Tour Coordinators** – need clean admin workflows & reliable availability.

---

## 4) Success Metrics

* Time-to-book < 3 min (from tour page → paid).
* Checkout success rate ≥ 70% (paid / checkout started).
* Bounce on tour detail < 40%.
* ≥ 10 organic keywords in top 20 (3 months).
* 0 layout regressions vs Tourex baseline.

---

## 5) Scope v1 (In)

* Content replacement (NL/EN), page culling, updated nav.
* Tours catalog + detail with clear inclusions/exclusions & day-by-day outline.
* Booking flow: date selection (available departures), pax, price calc, full checkout.
* Payments: Stripe & PayPal (live after backend pass), bank transfer/local as offline.
* Availability rules: per-departure capacity, 72h cut-off.
* Shop with basic cart/checkout.
* Legal pages, FAQ, contact (map/WhatsApp), gallery, team.
* SEO (meta, schema), GA4, Meta Pixel, cookie consent.

**Out of Scope (v1):** Customer portals, blog, vouchers/coupons, advanced dynamic pricing, DMS integration, dynamic currency conversion.

---

## 6) Non-Functional Requirements

* **Design parity**: No layout/styling changes; use existing Tourex components/SCSS.
* **Performance**: FCP < 2.5s on 4G; images optimized; code-split.
* **A11y**: Keyboard-navigable, alt text, contrast ≥ WCAG AA.
* **Security**: Supabase RLS on all tables; server-side validation.
* **Portability**: Payment abstraction & service layer; avoid vendor-lock.

---

## 7) Information Architecture & URLs

**Keep**:

* `/` – Home Three
* `/tours`, `/tours/:slug`
* `/about`
* `/pricing`
* `/schedule`
* `/team`
* `/gallery`
* `/contact`
* `/faq`
* `/legal/terms`, `/legal/privacy`, `/legal/cookies`
* `/shop`, `/shop/:slug`, `/cart`, `/checkout`

**Remove**:

* All other Home variants
* Hotel* pages
* Blog
* Auth pages
* Restaurant/Rental pages

---

## 8) Functional Requirements (Modules)

### M1 — Internationalization (NL/EN)

* `i18n` with resource files; all visible strings externalized.
* Per page: SEO title/description in NL/EN.
* Tour content fields duplicated for translations.

### M2 — Tours Catalog & Details

* Filters: duration, difficulty, month.
* Cards show highlights & price-from.
* Detail page sections: Hero, Overview, Itinerary by day, What's included/excluded, Practical info, Gallery, FAQs, CTA.

### M3 — Booking & Availability

* Departure calendar with **available seats** and **72h cut-off**.
* Capacity model: default 12 seats per departure.
* Price model v1: flat per-person EUR.
* Confirmation page & email.

### M4 — Payments

* **Stripe** (Card, Apple/Google Pay) + **PayPal**.
* **Bank transfer/local** payment as **offline** method with instructions.
* Single currency: EUR.
* Webhooks update booking status.

### M5 — Shop

* Product catalog, detail, cart, checkout.
* Inventory (simple stock count).
* Shipping = Pickup/Local delivery with optional shipping to other locations (additional costs based on location).

### M6 — Contact, Team, Gallery, FAQ, Legal

* Contact form (spam-safe), map embed, WhatsApp CTA.
* Team cards with roles & short bios.
* Gallery grid (lightbox).
* FAQ accordion.
* Legal pages (drafts included).

### M7 — Analytics, SEO, Consent

* GA4, Meta Pixel, cookie consent banner.
* JSON-LD schema: Organization, LocalBusiness, Product, BreadcrumbList.

---

## 9) Data Model (Supabase)

**tours**: id, slug, title_nl/en, summary, duration_days, price_eur, includes, excludes, practical, gallery, is_active
**tour_departures**: id, tour_id, date, capacity, cutoff_hours, status
**bookings**: id, tour_id, departure_id, user info, pax, amount, payment_method, status
**payments**: id, booking_id, provider, ref, amount, status, payload
**products**: id, slug, title, description, price, stock, gallery, is_active
**orders**: id, contact info, amount, status, shipping, items
**media**: id, url, alt, dimensions
**settings**: key, value

**RLS**:

* Public: read active tours, scheduled departures.
* Insert bookings/orders: allowed with limited fields.
* Updates to booking state/payments: admin service role only.

---

## 10) Payment & Booking Flow

1. User selects tour date (>72h, seats available).
2. Inputs pax + contact.
3. Chooses payment method.
4. Stripe/PayPal → webhook confirms → booking marked paid.
5. Confirmation page + email.

Offline method: `pending` booking + instructions, later marked paid by admin.

---

## 11) Admin (v1 Minimal)

* Supabase SQL views for upcoming departures, pending bookings, paid bookings.
* Simple admin page (later) for booking approval/refunds.

---

## 12) SEO & Content

**USPs (Hero section)**:

* Authentic Jungle Experience in the heart of Upper Suriname
* All-inclusive multi-day tours (meals, guide, transport)
* Safe & Responsible eco-tourism with local community
* Easy online booking with instant confirmation

---

## 13) Legal Drafts (Outlines)

* **Terms**: booking, payment, cancellation, liability, conduct, insurance, law.
* **Privacy**: data collected, purpose, retention, third parties, rights.
* **Cookies**: categories, opt-in, GA4/Pixel disclosure.

---

## 14) Risks & Mitigations

* Pricing TBD → use seed data.
* Connectivity → offline manifests.
* Fraud → Stripe Radar, manual review.

---

## 15) Rollout

* **v1.0 Content Pass** → pages, NL/EN, analytics, legal drafts.
* **v1.1 Backend & Booking** → Supabase, payments, availability.
* **v1.2 Shop Live** → products + checkout.
* **v1.3 Polish & QA** → performance, SEO, A11y.

---

# Technology Choices

* **Frontend**: React + Vite (Tourex Template, SCSS/Bootstrap).
* **State**: Redux store.
* **Forms/Validation**: react-hook-form + zod/yup.
* **i18n**: react-i18next.
* **SEO**: react-helmet-async.
* **Analytics**: GA4, Meta Pixel.
* **Backend**: Supabase (Postgres + RLS + Edge Functions).
* **Payments**: Stripe, PayPal.
* **Email**: Resend.
* **Media**: Supabase Storage.

---

# Phased Plan with Checklists

## Phase 0 — Project Hygiene

* [ ] Freeze Tourex design.
* [ ] Remove unwanted routes.
* [ ] Create /docs MD files.
* [ ] GA4, Pixel, cookie banner setup.
* [ ] i18n scaffold.

## Phase 1 — Content Pass

* [ ] Replace Home Three hero & USP copy.
* [ ] Replace Tours & Details content.
* [ ] Replace About, Team, Gallery.
* [ ] Replace Pricing, Schedule, FAQ, Contact.
* [ ] Add Legal drafts.

## Phase 2 — Backend & Booking

* [ ] Supabase tables + RLS.
* [ ] Edge Functions (payment webhook, booking confirm).
* [ ] Booking UI wiring.
* [ ] Availability logic.
* [ ] Admin SQL views.

## Phase 3 — Shop

* [ ] Product catalog.
* [ ] Cart/checkout flow.
* [ ] Payments integration.

## Phase 4 — Analytics/SEO/Consent

* [ ] GA4 + Pixel events.
* [ ] JSON-LD schemas.
* [ ] Cookie banner opt-in.

## Phase 5 — Polish & QA

* [ ] Lazy load routes.
* [ ] Image sizing & placeholders.
* [ ] Accessibility improvements.
* [ ] Lighthouse ≥90/95/95/90.

---

# MD Files to Create

* `/docs/PRD.md`
* `/docs/Tasks.md`
* `/docs/Architecture.md`
* `/docs/Backend.md`
* `/docs/BookingFlow.md`
* `/docs/Payments.md`
* `/docs/ContentMapping.md`
* `/docs/SEO.md`
* `/docs/Legal.md`
* `/docs/Localization.md`
* `/docs/Changelog.md`
* `/docs/RestorePoint.md`

---

# Instruction Block — Step 1: Content Pass

> Do not modify any layout. Replace content only.

* Remove extra pages (Home, Hotel*, Blog, Auth, Restaurant).
* Keep Home Three, Tours, Details, About, Pricing, Schedule, Team, Gallery, FAQ, Contact, Legal, Shop.
* Add NL/EN resources.
* Replace content (hero, tours, about, team, etc.).
* Add GA4, Pixel, cookie banner.

**Housekeeping**: Update `/docs/PRD.md`, `/docs/ContentMapping.md`, `/docs/SEO.md`, `/docs/Legal.md`, `/docs/Tasks.md`, `/docs/backend.md`, `/docs/architecture.md`.

**Await Further Instructions**

---

# Instruction Block — Step 2: Backend & Booking

> Implement Supabase, booking, availability, payments.

* Create schema + RLS.
* Build booking flow (UI→Supabase→Stripe/PayPal→Webhook→Email).
* Handle offline payments.
* Add availability & cut-off.
* Add shop + orders.
* Add analytics events.

**Housekeeping**: Update `/docs/backend.md`, `/docs/bookingflow.md`, `/docs/payments.md`, `/docs/architecture.md`, `/docs/tasks.md`.

**Await Further Instructions**