# Jungle Resort PingPe - Backend Architecture (Supabase)

## Overview

This document outlines the backend architecture using Supabase for the Jungle Resort PingPe booking platform. The backend handles tours, bookings, payments, shop orders, and user management with strict Row Level Security.

## Database Schema

### Core Tables

#### tours
```sql
CREATE TABLE tours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title_en TEXT NOT NULL,
  title_nl TEXT NOT NULL,
  summary_en TEXT NOT NULL,
  summary_nl TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_nl TEXT NOT NULL,
  duration_days INTEGER NOT NULL,
  difficulty_level TEXT CHECK (difficulty_level IN ('easy', 'moderate', 'challenging')),
  price_eur DECIMAL(10,2) NOT NULL,
  max_participants INTEGER DEFAULT 12,
  min_participants INTEGER DEFAULT 2,
  includes_en TEXT[] NOT NULL,
  includes_nl TEXT[] NOT NULL,
  excludes_en TEXT[] NOT NULL,
  excludes_nl TEXT[] NOT NULL,
  practical_info_en TEXT,
  practical_info_nl TEXT,
  itinerary_en JSONB, -- Array of day objects {day: 1, title: "", description: ""}
  itinerary_nl JSONB,
  gallery_images TEXT[], -- Array of image URLs
  featured_image TEXT,
  seo_title_en TEXT,
  seo_title_nl TEXT,
  seo_description_en TEXT,
  seo_description_nl TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### tour_departures
```sql
CREATE TABLE tour_departures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id UUID REFERENCES tours(id) ON DELETE CASCADE,
  departure_date DATE NOT NULL,
  return_date DATE NOT NULL,
  capacity INTEGER NOT NULL DEFAULT 12,
  booked_count INTEGER DEFAULT 0,
  price_override DECIMAL(10,2), -- Optional price override for this departure
  cutoff_hours INTEGER DEFAULT 72,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'cancelled')),
  guide_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(tour_id, departure_date)
);
```

#### bookings
```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id UUID REFERENCES tours(id),
  departure_id UUID REFERENCES tour_departures(id),
  booking_reference TEXT UNIQUE NOT NULL, -- Human-readable reference
  
  -- Customer Information
  customer_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  customer_country TEXT,
  
  -- Booking Details
  participant_count INTEGER NOT NULL,
  participants JSONB NOT NULL, -- Array of {name, age, dietary_requirements, etc}
  total_amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'EUR',
  
  -- Payment
  payment_method TEXT CHECK (payment_method IN ('stripe', 'paypal', 'bank_transfer', 'local')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_reference TEXT,
  
  -- Booking Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  
  -- Special Requests
  special_requests TEXT,
  dietary_requirements TEXT,
  emergency_contact TEXT,
  
  -- Metadata
  booking_notes TEXT, -- Admin notes
  source TEXT DEFAULT 'website', -- booking source tracking
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  confirmed_at TIMESTAMP WITH TIME ZONE,
  cancelled_at TIMESTAMP WITH TIME ZONE
);
```

#### payments
```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id),
  provider TEXT NOT NULL CHECK (provider IN ('stripe', 'paypal', 'bank_transfer', 'local')),
  provider_payment_id TEXT, -- Stripe payment_intent_id, PayPal order_id, etc.
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'EUR',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'refunded')),
  failure_reason TEXT,
  webhook_payload JSONB, -- Store full webhook data for debugging
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed_at TIMESTAMP WITH TIME ZONE,
  
  INDEX(booking_id),
  INDEX(provider_payment_id)
);
```

### Shop Tables

#### products
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name_en TEXT NOT NULL,
  name_nl TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_nl TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INTEGER DEFAULT 0,
  images TEXT[], -- Array of image URLs
  featured_image TEXT,
  category TEXT,
  tags TEXT[],
  weight_grams INTEGER, -- For shipping calculations
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### orders
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  
  -- Customer Information
  customer_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  
  -- Shipping Information
  shipping_method TEXT CHECK (shipping_method IN ('pickup', 'local_delivery', 'shipping')),
  shipping_address JSONB, -- {street, city, postal_code, country}
  shipping_cost DECIMAL(10,2) DEFAULT 0,
  
  -- Order Details
  items JSONB NOT NULL, -- Array of {product_id, name, price, quantity}
  subtotal DECIMAL(10,2) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'EUR',
  
  -- Payment
  payment_method TEXT CHECK (payment_method IN ('stripe', 'paypal', 'bank_transfer', 'cash')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_reference TEXT,
  
  -- Order Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'ready', 'completed', 'cancelled')),
  
  -- Metadata
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  shipped_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE
);
```

### Supporting Tables

#### media
```sql
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  alt_text_en TEXT,
  alt_text_nl TEXT,
  filename TEXT,
  file_size INTEGER,
  mime_type TEXT,
  width INTEGER,
  height INTEGER,
  entity_type TEXT, -- 'tour', 'product', 'general'
  entity_id UUID,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### settings
```sql
CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Row Level Security (RLS)

### Public Read Access
```sql
-- Tours are publicly readable when active
ALTER TABLE tours ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tours are publicly readable" ON tours
  FOR SELECT USING (is_active = true);

-- Departures are publicly readable for active tours
ALTER TABLE tour_departures ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Departures are publicly readable" ON tour_departures
  FOR SELECT USING (
    status = 'scheduled' AND 
    departure_date > CURRENT_DATE
  );

-- Products are publicly readable when active
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Products are publicly readable" ON products
  FOR SELECT USING (is_active = true);

-- Media is publicly readable
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Media is publicly readable" ON media
  FOR SELECT USING (true);

-- Settings are publicly readable
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Settings are publicly readable" ON settings
  FOR SELECT USING (true);
```

### Booking Creation
```sql
-- Allow anonymous booking creation with limited fields
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow booking creation" ON bookings
  FOR INSERT WITH CHECK (
    customer_email IS NOT NULL AND
    customer_name IS NOT NULL AND
    participant_count > 0 AND
    total_amount > 0
  );

-- Allow anonymous order creation
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow order creation" ON orders
  FOR INSERT WITH CHECK (
    customer_email IS NOT NULL AND
    customer_name IS NOT NULL AND
    total_amount > 0
  );
```

### Admin/Service Access
```sql
-- Service role can do everything
CREATE POLICY "Service role full access" ON bookings
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access" ON payments
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access" ON orders
  FOR ALL USING (auth.role() = 'service_role');
```

## Edge Functions

### Webhook Handlers

#### process-stripe-webhook
```typescript
// supabase/functions/process-stripe-webhook/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const signature = req.headers.get('stripe-signature')
  const body = await req.text()
  
  // Verify webhook signature
  const event = stripe.webhooks.constructEvent(body, signature, WEBHOOK_SECRET)
  
  switch (event.type) {
    case 'payment_intent.succeeded':
      await handlePaymentSuccess(event.data.object)
      break
    case 'payment_intent.payment_failed':
      await handlePaymentFailure(event.data.object)
      break
  }
  
  return new Response('OK')
})

async function handlePaymentSuccess(paymentIntent: any) {
  const { booking_id } = paymentIntent.metadata
  
  // Update booking status
  await supabase
    .from('bookings')
    .update({ 
      payment_status: 'paid',
      status: 'confirmed',
      confirmed_at: new Date().toISOString()
    })
    .eq('id', booking_id)
  
  // Send confirmation email
  await sendBookingConfirmation(booking_id)
}
```

#### send-booking-confirmation
```typescript
// supabase/functions/send-booking-confirmation/index.ts
import { Resend } from 'https://esm.sh/resend@3.2.0'

serve(async (req) => {
  const { booking_id } = await req.json()
  
  // Fetch booking details
  const { data: booking } = await supabase
    .from('bookings')
    .select(`
      *,
      tour:tours(*),
      departure:tour_departures(*)
    `)
    .eq('id', booking_id)
    .single()
  
  // Send email via Resend
  await resend.emails.send({
    from: 'bookings@jungleresort.com',
    to: booking.customer_email,
    subject: `Booking Confirmation - ${booking.tour.title_en}`,
    html: generateBookingEmailTemplate(booking)
  })
  
  return new Response('OK')
})
```

### Availability Checker
```typescript
// supabase/functions/check-availability/index.ts
serve(async (req) => {
  const { tour_id, departure_date, participant_count } = await req.json()
  
  const { data: departure } = await supabase
    .from('tour_departures')
    .select('*, bookings(participant_count)')
    .eq('tour_id', tour_id)
    .eq('departure_date', departure_date)
    .eq('status', 'scheduled')
    .single()
  
  if (!departure) {
    return new Response(JSON.stringify({ available: false, reason: 'No departure found' }))
  }
  
  // Check cutoff time
  const cutoffTime = new Date(departure.departure_date)
  cutoffTime.setHours(cutoffTime.getHours() - departure.cutoff_hours)
  
  if (new Date() > cutoffTime) {
    return new Response(JSON.stringify({ available: false, reason: 'Booking cutoff passed' }))
  }
  
  // Check capacity
  const bookedCount = departure.bookings.reduce((sum, b) => sum + b.participant_count, 0)
  const availableSpots = departure.capacity - bookedCount
  
  return new Response(JSON.stringify({
    available: availableSpots >= participant_count,
    available_spots: availableSpots,
    requested_spots: participant_count
  }))
})
```

## Seed Data

### Sample Tours
```sql
INSERT INTO tours (slug, title_en, title_nl, summary_en, summary_nl, description_en, description_nl, duration_days, difficulty_level, price_eur, includes_en, includes_nl, excludes_en, excludes_nl) VALUES
(
  'upper-suriname-discovery',
  'Upper Suriname Discovery',
  'Upper Suriname Ontdekking',
  'Explore pristine rainforest and traditional villages',
  'Verken ongerepte regenwoud en traditionele dorpen',
  'A comprehensive 4-day journey through...',
  'Een uitgebreide 4-daagse reis door...',
  4,
  'moderate',
  450.00,
  ARRAY['All meals', 'Professional guide', 'Transportation', 'Accommodation'],
  ARRAY['Alle maaltijden', 'Professionele gids', 'Transport', 'Accommodatie'],
  ARRAY['Personal expenses', 'Travel insurance', 'Tips'],
  ARRAY['Persoonlijke uitgaven', 'Reisverzekering', 'Fooien']
);
```

### Sample Departures
```sql
INSERT INTO tour_departures (tour_id, departure_date, return_date, capacity) 
SELECT 
  t.id,
  date_series,
  date_series + INTERVAL '4 days',
  12
FROM tours t,
GENERATE_SERIES(
  CURRENT_DATE + INTERVAL '1 week',
  CURRENT_DATE + INTERVAL '6 months',
  INTERVAL '2 weeks'
) date_series
WHERE t.slug = 'upper-suriname-discovery';
```

### Sample Products
```sql
INSERT INTO products (slug, name_en, name_nl, description_en, description_nl, price, stock_quantity) VALUES
(
  'handwoven-basket',
  'Traditional Handwoven Basket',
  'Traditionele Handgeweven Mand',
  'Authentic basket made by local artisans',
  'Authentieke mand gemaakt door lokale ambachtslieden',
  35.00,
  15
);
```

## Database Functions

### Update Booking Count
```sql
CREATE OR REPLACE FUNCTION update_departure_booking_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE tour_departures 
    SET booked_count = booked_count + NEW.participant_count
    WHERE id = NEW.departure_id;
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    UPDATE tour_departures 
    SET booked_count = booked_count - OLD.participant_count + NEW.participant_count
    WHERE id = NEW.departure_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE tour_departures 
    SET booked_count = booked_count - OLD.participant_count
    WHERE id = OLD.departure_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER booking_count_trigger
  AFTER INSERT OR UPDATE OR DELETE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_departure_booking_count();
```

### Generate Booking Reference
```sql
CREATE OR REPLACE FUNCTION generate_booking_reference()
RETURNS TRIGGER AS $$
BEGIN
  NEW.booking_reference = 'JR' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || 
                         LPAD(EXTRACT(EPOCH FROM NOW())::TEXT, 6, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER booking_reference_trigger
  BEFORE INSERT ON bookings
  FOR EACH ROW EXECUTE FUNCTION generate_booking_reference();
```

## Backup & Maintenance

### Automated Backups
- Daily automated backups via Supabase
- Point-in-time recovery enabled
- Cross-region backup replication

### Data Retention
- Booking data: 7 years (legal requirement)
- Payment data: 7 years (legal requirement)
- Analytics data: 2 years
- Media files: Indefinite

### Performance Monitoring
- Query performance monitoring
- Index usage analysis
- Connection pool monitoring
- Error rate tracking

## Security Considerations

### Data Protection
- Encryption at rest (Supabase default)
- Encryption in transit (TLS)
- PII anonymization for analytics
- GDPR compliance features

### Access Control
- Row Level Security on all tables
- Service role for backend operations
- Anonymous role for public data
- Admin roles for management

### Audit Trail
- All booking changes logged
- Payment transaction history
- Admin action logging
- Data access monitoring

---

**Last Updated**: Initial backend design
**Next Review**: After Supabase connection established