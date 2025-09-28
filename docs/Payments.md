# Jungle Resort PingPe - Payment Processing

## Overview

This document outlines the payment processing architecture, covering multiple payment providers, webhook handling, security measures, and refund processes for the Jungle Resort PingPe booking platform.

## Payment Methods Supported

### Online Payment Methods

#### 1. Stripe
- **Credit/Debit Cards**: Visa, Mastercard, American Express
- **Digital Wallets**: Apple Pay, Google Pay
- **Regional Methods**: iDEAL (Netherlands), Bancontact (Belgium)
- **Buy Now, Pay Later**: Klarna (future enhancement)

#### 2. PayPal
- **PayPal Account**: Direct PayPal balance or linked cards
- **PayPal Credit**: Subject to approval
- **Guest Checkout**: Cards without PayPal account

### Offline Payment Methods

#### 3. Bank Transfer (SEPA)
- **Direct Bank Transfer**: Manual payment with booking reference
- **Processing Time**: 1-3 business days
- **Status**: Pending until payment verification

#### 4. Local Payment Options
- **Cash Payment**: At resort location (limited cases)
- **Local Bank**: Partner bank for Surinamese customers
- **Processing**: Manual verification required

## Payment Architecture

### Service Abstraction Layer

```typescript
// services/payments/PaymentProvider.ts
interface PaymentProvider {
  name: string;
  createPayment(request: PaymentRequest): Promise<PaymentResponse>;
  handleWebhook(payload: any, signature: string): Promise<WebhookResult>;
  refundPayment(paymentId: string, amount?: number): Promise<RefundResponse>;
  getPaymentStatus(paymentId: string): Promise<PaymentStatus>;
}

interface PaymentRequest {
  amount: number;
  currency: string;
  booking_id: string;
  customer_email: string;
  customer_name: string;
  description: string;
  return_url: string;
  metadata: Record<string, string>;
}

interface PaymentResponse {
  payment_id: string;
  client_secret?: string;
  approval_url?: string;
  status: 'pending' | 'requires_action' | 'processing';
}
```

### Stripe Implementation

```typescript
// services/payments/StripeProvider.ts
class StripeProvider implements PaymentProvider {
  name = 'stripe';
  
  async createPayment(request: PaymentRequest): Promise<PaymentResponse> {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: Math.round(request.amount * 100), // Convert to cents
      currency: request.currency.toLowerCase(),
      customer_email: request.customer_email,
      description: request.description,
      metadata: {
        booking_id: request.booking_id,
        customer_name: request.customer_name,
        ...request.metadata
      },
      automatic_payment_methods: {
        enabled: true
      },
      receipt_email: request.customer_email
    });
    
    return {
      payment_id: paymentIntent.id,
      client_secret: paymentIntent.client_secret!,
      status: 'pending'
    };
  }
  
  async handleWebhook(payload: any, signature: string): Promise<WebhookResult> {
    let event;
    
    try {
      event = this.stripe.webhooks.constructEvent(
        payload, 
        signature, 
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err) {
      throw new Error('Invalid webhook signature');
    }
    
    switch (event.type) {
      case 'payment_intent.succeeded':
        return this.handlePaymentSuccess(event.data.object);
      case 'payment_intent.payment_failed':
        return this.handlePaymentFailure(event.data.object);
      case 'payment_intent.canceled':
        return this.handlePaymentCanceled(event.data.object);
      default:
        return { processed: false, action: 'ignored' };
    }
  }
  
  private async handlePaymentSuccess(paymentIntent: any): Promise<WebhookResult> {
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
    await this.sendConfirmationEmail(bookingId);
    
    return { 
      processed: true, 
      action: 'payment_confirmed',
      booking_id: bookingId 
    };
  }
}
```

### PayPal Implementation

```typescript
// services/payments/PayPalProvider.ts
class PayPalProvider implements PaymentProvider {
  name = 'paypal';
  
  async createPayment(request: PaymentRequest): Promise<PaymentResponse> {
    const order = await this.paypal.orders.create({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: request.currency,
          value: request.amount.toFixed(2)
        },
        description: request.description,
        custom_id: request.booking_id
      }],
      application_context: {
        return_url: request.return_url,
        cancel_url: `${request.return_url}?cancelled=true`,
        brand_name: 'Jungle Resort PingPe',
        user_action: 'PAY_NOW'
      }
    });
    
    const approvalUrl = order.links?.find(link => link.rel === 'approve')?.href;
    
    return {
      payment_id: order.id!,
      approval_url: approvalUrl,
      status: 'pending'
    };
  }
  
  async handleWebhook(payload: any, signature: string): Promise<WebhookResult> {
    // PayPal webhook verification
    const isValid = await this.verifyWebhookSignature(payload, signature);
    if (!isValid) {
      throw new Error('Invalid webhook signature');
    }
    
    const event = JSON.parse(payload);
    
    switch (event.event_type) {
      case 'PAYMENT.CAPTURE.COMPLETED':
        return this.handlePaymentCapture(event.resource);
      case 'PAYMENT.CAPTURE.DENIED':
        return this.handlePaymentDenied(event.resource);
      default:
        return { processed: false, action: 'ignored' };
    }
  }
}
```

## Webhook Security

### Signature Verification

```typescript
// Edge Function: webhook-handler
export default async function handler(req: Request) {
  const url = new URL(req.url);
  const provider = url.pathname.split('/').pop(); // 'stripe' or 'paypal'
  
  if (!['stripe', 'paypal'].includes(provider!)) {
    return new Response('Invalid provider', { status: 400 });
  }
  
  const signature = req.headers.get(`${provider}-signature`);
  const payload = await req.text();
  
  try {
    const paymentProvider = getPaymentProvider(provider!);
    const result = await paymentProvider.handleWebhook(payload, signature!);
    
    // Log webhook processing
    await supabase
      .from('webhook_logs')
      .insert({
        provider,
        event_type: result.action,
        processed: result.processed,
        booking_id: result.booking_id,
        payload_hash: await hashPayload(payload)
      });
    
    return new Response(JSON.stringify(result));
    
  } catch (error) {
    console.error(`Webhook processing failed: ${error.message}`);
    return new Response('Webhook processing failed', { status: 400 });
  }
}
```

### Idempotency

```typescript
// Ensure webhook events are processed only once
const processWebhookEvent = async (eventId: string, processor: () => Promise<void>) => {
  const { data: existingEvent } = await supabase
    .from('processed_webhook_events')
    .select('id')
    .eq('event_id', eventId)
    .single();
  
  if (existingEvent) {
    console.log(`Event ${eventId} already processed`);
    return;
  }
  
  try {
    await processor();
    
    // Mark event as processed
    await supabase
      .from('processed_webhook_events')
      .insert({ event_id: eventId, processed_at: new Date().toISOString() });
    
  } catch (error) {
    console.error(`Failed to process event ${eventId}:`, error);
    throw error;
  }
};
```

## Payment Flow Implementation

### Frontend Payment Processing

```typescript
// components/booking/PaymentForm.tsx
const PaymentForm: React.FC<PaymentFormProps> = ({ booking, onSuccess }) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('stripe');
  const [processing, setProcessing] = useState(false);
  
  const handleStripePayment = async () => {
    setProcessing(true);
    
    try {
      // Create payment intent
      const { data } = await supabase.functions.invoke('create-payment', {
        body: {
          provider: 'stripe',
          booking_id: booking.id,
          amount: booking.total_amount,
          currency: booking.currency
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
        throw new Error(error.message);
      }
      
    } catch (error) {
      toast.error(`Payment failed: ${error.message}`);
    } finally {
      setProcessing(false);
    }
  };
  
  const handlePayPalPayment = async () => {
    setProcessing(true);
    
    try {
      const { data } = await supabase.functions.invoke('create-payment', {
        body: {
          provider: 'paypal',
          booking_id: booking.id,
          amount: booking.total_amount,
          currency: booking.currency
        }
      });
      
      // Redirect to PayPal
      window.location.href = data.approval_url;
      
    } catch (error) {
      toast.error(`Payment failed: ${error.message}`);
      setProcessing(false);
    }
  };
  
  const handleOfflinePayment = async () => {
    try {
      await supabase
        .from('bookings')
        .update({ 
          payment_method: selectedMethod,
          status: 'pending_payment' 
        })
        .eq('id', booking.id);
      
      onSuccess(booking.id);
      
    } catch (error) {
      toast.error('Failed to process offline payment request');
    }
  };
  
  return (
    <div className="payment-form">
      <div className="payment-methods">
        <PaymentMethodSelector 
          selected={selectedMethod}
          onChange={setSelectedMethod}
        />
      </div>
      
      {selectedMethod === 'stripe' && (
        <StripeElementsForm onSubmit={handleStripePayment} />
      )}
      
      {selectedMethod === 'paypal' && (
        <PayPalButton onSubmit={handlePayPalPayment} />
      )}
      
      {['bank_transfer', 'local'].includes(selectedMethod) && (
        <OfflinePaymentInstructions 
          method={selectedMethod}
          onConfirm={handleOfflinePayment}
        />
      )}
    </div>
  );
};
```

### Backend Payment Creation

```typescript
// Edge Function: create-payment
export default async function handler(req: Request) {
  const { provider, booking_id, amount, currency } = await req.json();
  
  // Fetch booking details
  const { data: booking } = await supabase
    .from('bookings')
    .select(`
      *,
      tour:tours(title_en),
      departure:tour_departures(departure_date)
    `)
    .eq('id', booking_id)
    .single();
  
  if (!booking) {
    return new Response('Booking not found', { status: 404 });
  }
  
  // Verify amount matches booking
  if (booking.total_amount !== amount) {
    return new Response('Amount mismatch', { status: 400 });
  }
  
  const paymentProvider = getPaymentProvider(provider);
  
  try {
    const paymentResponse = await paymentProvider.createPayment({
      amount,
      currency,
      booking_id,
      customer_email: booking.customer_email,
      customer_name: booking.customer_name,
      description: `${booking.tour.title_en} - ${booking.departure.departure_date}`,
      return_url: `${process.env.FRONTEND_URL}/booking/confirmation/${booking_id}`,
      metadata: {
        tour_title: booking.tour.title_en,
        departure_date: booking.departure.departure_date,
        participant_count: booking.participant_count.toString()
      }
    });
    
    // Store payment record
    await supabase
      .from('payments')
      .insert({
        booking_id,
        provider,
        provider_payment_id: paymentResponse.payment_id,
        amount,
        currency,
        status: 'pending'
      });
    
    return Response.json(paymentResponse);
    
  } catch (error) {
    console.error('Payment creation failed:', error);
    return new Response('Payment creation failed', { status: 500 });
  }
}
```

## Refund Processing

### Automatic Refunds

```typescript
// services/payments/RefundService.ts
class RefundService {
  async processRefund(bookingId: string, reason: string, amount?: number) {
    const { data: booking } = await supabase
      .from('bookings')
      .select(`
        *,
        payments(*)
      `)
      .eq('id', bookingId)
      .single();
    
    if (!booking) {
      throw new Error('Booking not found');
    }
    
    const successfulPayment = booking.payments.find(p => p.status === 'completed');
    if (!successfulPayment) {
      throw new Error('No successful payment found');
    }
    
    const refundAmount = amount || booking.total_amount;
    const paymentProvider = getPaymentProvider(successfulPayment.provider);
    
    try {
      const refundResponse = await paymentProvider.refundPayment(
        successfulPayment.provider_payment_id,
        refundAmount
      );
      
      // Create refund record
      await supabase
        .from('refunds')
        .insert({
          booking_id: bookingId,
          payment_id: successfulPayment.id,
          amount: refundAmount,
          reason,
          provider_refund_id: refundResponse.refund_id,
          status: 'pending'
        });
      
      // Update booking status
      await supabase
        .from('bookings')
        .update({
          status: 'refunded',
          payment_status: 'refunded'
        })
        .eq('id', bookingId);
      
      // Send refund notification email
      await this.sendRefundNotification(bookingId, refundAmount);
      
      return refundResponse;
      
    } catch (error) {
      console.error('Refund processing failed:', error);
      throw error;
    }
  }
}
```

## Payment Analytics

### Transaction Tracking

```typescript
// Analytics events for payment flow
const trackPaymentEvents = {
  paymentStarted: (booking: Booking, method: string) => {
    analytics.track('payment_started', {
      booking_id: booking.id,
      payment_method: method,
      amount: booking.total_amount,
      currency: booking.currency
    });
  },
  
  paymentCompleted: (booking: Booking, paymentId: string) => {
    analytics.track('payment_completed', {
      booking_id: booking.id,
      payment_id: paymentId,
      amount: booking.total_amount,
      currency: booking.currency
    });
  },
  
  paymentFailed: (booking: Booking, error: string) => {
    analytics.track('payment_failed', {
      booking_id: booking.id,
      error_message: error,
      amount: booking.total_amount
    });
  }
};
```

### Revenue Reporting

```sql
-- Daily revenue report
SELECT 
  DATE(created_at) as date,
  COUNT(*) as bookings_count,
  SUM(total_amount) as total_revenue,
  AVG(total_amount) as avg_booking_value,
  COUNT(CASE WHEN payment_status = 'paid' THEN 1 END) as paid_bookings,
  COUNT(CASE WHEN payment_status = 'pending' THEN 1 END) as pending_bookings
FROM bookings 
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Payment method performance
SELECT 
  payment_method,
  COUNT(*) as attempts,
  COUNT(CASE WHEN payment_status = 'paid' THEN 1 END) as successful,
  ROUND(
    COUNT(CASE WHEN payment_status = 'paid' THEN 1 END) * 100.0 / COUNT(*), 
    2
  ) as success_rate
FROM bookings 
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY payment_method;
```

## Error Handling & Recovery

### Payment Failure Recovery

```typescript
// Handle payment failures gracefully
const handlePaymentFailure = async (booking: Booking, error: PaymentError) => {
  // Log the failure
  await supabase
    .from('payment_failures')
    .insert({
      booking_id: booking.id,
      error_code: error.code,
      error_message: error.message,
      retry_count: 0
    });
  
  // Send failure notification to customer
  await sendPaymentFailureEmail(booking, error);
  
  // Offer alternative payment methods
  return {
    alternative_methods: ['bank_transfer', 'paypal'],
    retry_url: `/booking/payment/${booking.id}`,
    support_contact: 'support@jungleresort.com'
  };
};
```

### Dispute Management

```typescript
// Handle payment disputes
const handlePaymentDispute = async (paymentId: string, disputeData: any) => {
  const { data: payment } = await supabase
    .from('payments')
    .select('*, booking:bookings(*)')
    .eq('provider_payment_id', paymentId)
    .single();
  
  // Create dispute record
  await supabase
    .from('payment_disputes')
    .insert({
      payment_id: payment.id,
      booking_id: payment.booking.id,
      dispute_id: disputeData.id,
      reason: disputeData.reason,
      amount: disputeData.amount,
      status: 'open'
    });
  
  // Notify admin team
  await notifyAdminTeam('payment_dispute', {
    booking_reference: payment.booking.booking_reference,
    customer_email: payment.booking.customer_email,
    dispute_reason: disputeData.reason
  });
};
```

## Security & Compliance

### PCI DSS Compliance
- **No card data storage**: All sensitive data handled by Stripe/PayPal
- **Secure transmission**: HTTPS enforced for all payment pages
- **Token-based**: Use payment tokens instead of raw card data

### GDPR Compliance
- **Data minimization**: Store only necessary payment metadata
- **Right to erasure**: Anonymize payment data upon request
- **Data retention**: Automatic cleanup of old payment logs

### Fraud Prevention
- **Stripe Radar**: Automatic fraud detection
- **Velocity checks**: Limit payment attempts per IP/email
- **Geographic restrictions**: Block payments from high-risk countries
- **Amount validation**: Verify payment amounts match booking totals

---

**Last Updated**: Initial payment architecture design
**Next Review**: After payment provider integration testing