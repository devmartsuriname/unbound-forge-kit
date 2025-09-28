# Jungle Resort PingPe - Booking Flow

## Overview

This document outlines the complete booking flow from tour selection to confirmation, including all user interactions, API calls, payment processing, and email notifications.

## Booking Flow Diagram

```
User Journey:
Browse Tours → Select Tour → Choose Date → Enter Details → Payment → Confirmation

Technical Flow:
Frontend → Availability Check → Booking Creation → Payment Processing → Webhook → Email
```

## Detailed Booking Steps

### Step 1: Tour Discovery & Selection

**User Actions:**
- Browse tour catalog
- Apply filters (duration, difficulty, price)
- View tour details
- Read itinerary and inclusions

**Technical Implementation:**
```typescript
// Frontend: Fetch tours
const { data: tours } = await supabase
  .from('tours')
  .select('*')
  .eq('is_active', true)
  .order('sort_order');

// Filter tours
const filteredTours = tours.filter(tour => {
  return (
    (!filters.duration || tour.duration_days === filters.duration) &&
    (!filters.difficulty || tour.difficulty_level === filters.difficulty) &&
    (!filters.maxPrice || tour.price_eur <= filters.maxPrice)
  );
});
```

### Step 2: Date Selection

**User Actions:**
- View departure calendar
- See available spots per departure
- Select preferred departure date

**Technical Implementation:**
```typescript
// Frontend: Fetch available departures
const { data: departures } = await supabase
  .from('tour_departures')
  .select(`
    *,
    tour:tours(max_participants)
  `)
  .eq('tour_id', tourId)
  .gte('departure_date', new Date().toISOString())
  .eq('status', 'scheduled');

// Calculate availability
const availableDepartures = departures.map(departure => {
  const availableSpots = departure.capacity - departure.booked_count;
  const cutoffTime = new Date(departure.departure_date);
  cutoffTime.setHours(cutoffTime.getHours() - departure.cutoff_hours);
  const isBookable = new Date() < cutoffTime && availableSpots > 0;
  
  return {
    ...departure,
    available_spots: availableSpots,
    is_bookable: isBookable,
    cutoff_passed: new Date() >= cutoffTime
  };
});
```

### Step 3: Booking Details Form

**User Actions:**
- Enter participant count
- Fill in customer information
- Add participant details
- Specify special requests

**Form Validation:**
```typescript
// Frontend: Booking form schema
const bookingSchema = z.object({
  customerName: z.string().min(2, 'Name is required'),
  customerEmail: z.string().email('Valid email required'),
  customerPhone: z.string().optional(),
  customerCountry: z.string().min(2, 'Country is required'),
  participantCount: z.number().min(1).max(12),
  participants: z.array(z.object({
    name: z.string().min(2, 'Participant name required'),
    age: z.number().min(1).max(100),
    dietaryRequirements: z.string().optional(),
    emergencyContact: z.string().optional()
  })),
  specialRequests: z.string().optional(),
  emergencyContact: z.string().min(5, 'Emergency contact required')
});
```

### Step 4: Availability Verification

**Before proceeding to payment:**
```typescript
// Frontend: Real-time availability check
const checkAvailability = async (departureId: string, participantCount: number) => {
  const { data } = await supabase.functions.invoke('check-availability', {
    body: { departure_id: departureId, participant_count: participantCount }
  });
  
  if (!data.available) {
    throw new Error(`Sorry, only ${data.available_spots} spots remaining`);
  }
  
  return data;
};
```

**Backend: Availability Function**
```typescript
// Edge Function: check-availability
export default async function handler(req: Request) {
  const { departure_id, participant_count } = await req.json();
  
  // Get departure with current bookings
  const { data: departure } = await supabase
    .from('tour_departures')
    .select(`
      *,
      bookings!inner(participant_count)
    `)
    .eq('id', departure_id)
    .eq('status', 'scheduled')
    .single();
  
  if (!departure) {
    return Response.json({ available: false, reason: 'Departure not found' });
  }
  
  // Check cutoff time
  const cutoffTime = new Date(departure.departure_date);
  cutoffTime.setHours(cutoffTime.getHours() - departure.cutoff_hours);
  
  if (new Date() > cutoffTime) {
    return Response.json({ 
      available: false, 
      reason: 'Booking deadline has passed' 
    });
  }
  
  // Calculate available spots
  const bookedCount = departure.bookings.reduce(
    (sum, booking) => sum + booking.participant_count, 
    0
  );
  const availableSpots = departure.capacity - bookedCount;
  
  return Response.json({
    available: availableSpots >= participant_count,
    available_spots: availableSpots,
    requested_spots: participant_count,
    cutoff_time: cutoffTime.toISOString()
  });
}
```

### Step 5: Booking Creation

**Frontend: Create pending booking**
```typescript
const createBooking = async (bookingData: BookingFormData) => {
  // Calculate total amount
  const totalAmount = departure.price_override || tour.price_eur * bookingData.participantCount;
  
  const { data: booking, error } = await supabase
    .from('bookings')
    .insert({
      tour_id: tourId,
      departure_id: departureId,
      customer_email: bookingData.customerEmail,
      customer_name: bookingData.customerName,
      customer_phone: bookingData.customerPhone,
      customer_country: bookingData.customerCountry,
      participant_count: bookingData.participantCount,
      participants: bookingData.participants,
      total_amount: totalAmount,
      payment_method: selectedPaymentMethod,
      special_requests: bookingData.specialRequests,
      emergency_contact: bookingData.emergencyContact,
      status: 'pending'
    })
    .select()
    .single();
  
  if (error) throw error;
  return booking;
};
```

### Step 6: Payment Processing

#### Option A: Stripe Payment

**Frontend: Create Stripe Payment Intent**
```typescript
const processStripePayment = async (booking: Booking) => {
  // Create payment intent via Edge Function
  const { data: paymentIntent } = await supabase.functions.invoke('create-stripe-payment', {
    body: {
      booking_id: booking.id,
      amount: booking.total_amount,
      currency: booking.currency,
      customer_email: booking.customer_email
    }
  });
  
  // Confirm payment with Stripe Elements
  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      return_url: `${window.location.origin}/booking/confirmation/${booking.id}`
    }
  });
  
  if (error) {
    // Handle payment failure
    await updateBookingStatus(booking.id, 'payment_failed');
    throw error;
  }
};
```

**Backend: Create Stripe Payment Intent**
```typescript
// Edge Function: create-stripe-payment
export default async function handler(req: Request) {
  const { booking_id, amount, currency, customer_email } = await req.json();
  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Convert to cents
    currency: currency.toLowerCase(),
    customer_email,
    metadata: {
      booking_id,
      source: 'jungle_resort_website'
    },
    automatic_payment_methods: {
      enabled: true
    }
  });
  
  // Store payment record
  await supabase
    .from('payments')
    .insert({
      booking_id,
      provider: 'stripe',
      provider_payment_id: paymentIntent.id,
      amount,
      currency,
      status: 'pending'
    });
  
  return Response.json({
    client_secret: paymentIntent.client_secret,
    payment_intent_id: paymentIntent.id
  });
}
```

#### Option B: PayPal Payment

**Frontend: PayPal Integration**
```typescript
const processPayPalPayment = async (booking: Booking) => {
  // Create PayPal order via Edge Function
  const { data: order } = await supabase.functions.invoke('create-paypal-payment', {
    body: {
      booking_id: booking.id,
      amount: booking.total_amount,
      currency: booking.currency
    }
  });
  
  // Redirect to PayPal for approval
  window.location.href = order.approval_url;
};
```

#### Option C: Offline Payment (Bank Transfer)

**Frontend: Show bank details**
```typescript
const processOfflinePayment = async (booking: Booking) => {
  // Update booking with offline payment method
  await supabase
    .from('bookings')
    .update({ 
      payment_method: 'bank_transfer',
      status: 'pending_payment'
    })
    .eq('id', booking.id);
  
  // Show bank transfer instructions
  return {
    bank_details: {
      account_name: 'Jungle Resort PingPe',
      iban: 'NL91 ABNA 0417 1643 00',
      bic: 'ABNANL2A',
      reference: booking.booking_reference,
      amount: booking.total_amount,
      currency: booking.currency
    }
  };
};
```

### Step 7: Payment Webhook Processing

**Stripe Webhook Handler**
```typescript
// Edge Function: process-stripe-webhook
export default async function handler(req: Request) {
  const signature = req.headers.get('stripe-signature');
  const body = await req.text();
  
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return new Response('Webhook signature verification failed', { status: 400 });
  }
  
  switch (event.type) {
    case 'payment_intent.succeeded':
      await handlePaymentSuccess(event.data.object);
      break;
    case 'payment_intent.payment_failed':
      await handlePaymentFailure(event.data.object);
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
  
  return new Response('OK');
}

async function handlePaymentSuccess(paymentIntent: any) {
  const bookingId = paymentIntent.metadata.booking_id;
  
  // Update payment record
  await supabase
    .from('payments')
    .update({
      status: 'completed',
      processed_at: new Date().toISOString(),
      webhook_payload: paymentIntent
    })
    .eq('provider_payment_id', paymentIntent.id);
  
  // Update booking status
  await supabase
    .from('bookings')
    .update({
      payment_status: 'paid',
      status: 'confirmed',
      confirmed_at: new Date().toISOString()
    })
    .eq('id', bookingId);
  
  // Send confirmation email
  await supabase.functions.invoke('send-booking-confirmation', {
    body: { booking_id: bookingId }
  });
}
```

### Step 8: Email Confirmation

**Booking Confirmation Email**
```typescript
// Edge Function: send-booking-confirmation
export default async function handler(req: Request) {
  const { booking_id } = await req.json();
  
  // Fetch complete booking details
  const { data: booking } = await supabase
    .from('bookings')
    .select(`
      *,
      tour:tours(*),
      departure:tour_departures(*)
    `)
    .eq('id', booking_id)
    .single();
  
  const emailHtml = generateBookingConfirmationEmail(booking);
  
  // Send via Resend
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'Jungle Resort PingPe <bookings@jungleresort.com>',
      to: booking.customer_email,
      subject: `Booking Confirmation - ${booking.tour.title_en} (${booking.booking_reference})`,
      html: emailHtml
    })
  });
  
  return new Response('OK');
}
```

### Step 9: Confirmation Page

**Frontend: Booking confirmation display**
```typescript
const BookingConfirmation: React.FC = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState<Booking | null>(null);
  
  useEffect(() => {
    fetchBookingDetails();
  }, [bookingId]);
  
  const fetchBookingDetails = async () => {
    const { data } = await supabase
      .from('bookings')
      .select(`
        *,
        tour:tours(*),
        departure:tour_departures(*)
      `)
      .eq('id', bookingId)
      .single();
    
    setBooking(data);
  };
  
  return (
    <div className="booking-confirmation">
      <h1>Booking Confirmed!</h1>
      <div className="booking-details">
        <p>Booking Reference: {booking?.booking_reference}</p>
        <p>Tour: {booking?.tour.title_en}</p>
        <p>Departure: {booking?.departure.departure_date}</p>
        <p>Participants: {booking?.participant_count}</p>
        <p>Total Amount: €{booking?.total_amount}</p>
      </div>
      
      {booking?.payment_method === 'bank_transfer' && (
        <BankTransferInstructions booking={booking} />
      )}
      
      <button onClick={() => downloadBookingPDF(booking)}>
        Download Booking Confirmation
      </button>
    </div>
  );
};
```

## Error Handling & Edge Cases

### Payment Failures
- Show clear error messages
- Allow retry with different payment method
- Preserve booking data for retry attempts
- Send failure notification emails

### Availability Changes
- Real-time availability checks before payment
- Handle race conditions with optimistic locking
- Show alternative dates if selected date becomes unavailable

### Partial Payments
- Not supported in v1 (full payment required)
- Future enhancement for deposits

### Booking Modifications
- Not supported in v1 (contact customer service)
- Future enhancement for self-service changes

### Cancellations
- Customer-initiated: Contact customer service
- Admin-initiated: Automatic refund processing
- Weather-related: Rescheduling options

## Performance Considerations

### Database Optimization
- Index on frequently queried fields
- Connection pooling for high traffic
- Read replicas for tour catalog queries

### Caching Strategy
- Cache tour details and pricing
- Cache availability for recent queries
- Invalidate cache on booking changes

### Rate Limiting
- Prevent booking spam attempts
- Limit availability check frequency
- Protect payment endpoints

## Security Measures

### Data Validation
- Server-side validation for all inputs
- SQL injection prevention via Supabase
- XSS protection in email templates

### Payment Security
- PCI DSS compliance via Stripe/PayPal
- No card data stored locally
- Secure webhook verification

### Privacy Protection
- GDPR-compliant data handling
- Customer data encryption
- Right to be forgotten implementation

---

**Last Updated**: Initial booking flow design
**Next Review**: After Supabase integration testing