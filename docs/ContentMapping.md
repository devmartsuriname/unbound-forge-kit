# Jungle Resort PingPe - Content Mapping

## Overview

This document maps the content structure for each page, showing how existing Tourex components will be populated with new jungle resort content in both Dutch (NL) and English (EN).

## Content Strategy

### Brand Positioning
- **Primary USP**: Authentic jungle experience in Upper Suriname
- **Secondary USPs**: All-inclusive packages, local community partnership, eco-tourism
- **Target Audience**: European adventure travelers (couples, small groups)
- **Tone**: Authentic, adventurous, responsible, welcoming

### Content Principles
- **Bilingual Parity**: All content available in NL/EN with equal quality
- **SEO-Optimized**: Each page targets specific keywords
- **Conversion-Focused**: Clear CTAs and booking incentives
- **Trust-Building**: Emphasize safety, certifications, local expertise

## Page-by-Page Content Mapping

### 1. Home Page (/) - Home Three Template - ✅ PHASE 1A COMPLETE

#### Hero Section - ✅ COMPLETE
**Component**: `Banner.tsx`
**Content Source**: Updated with PingPe content
**Status**: ✅ Implemented

**English Content**:
```typescript
hero: {
  title: "Authentic Jungle Adventures in Upper Suriname",
  subtitle: "Discover pristine rainforest, traditional villages, and unforgettable wildlife encounters with our expert local guides",
  description: "Experience the untouched beauty of Upper Suriname with our all-inclusive multi-day jungle tours. From river expeditions to village homestays, every detail is carefully crafted for your safety and comfort.",
  primaryCTA: "Explore Our Tours",
  secondaryCTA: "Watch Our Story",
  backgroundImage: "/images/hero-jungle-canopy.jpg",
  features: [
    "All-inclusive packages (meals, guide, transport)",
    "Small groups (max 12 participants)",
    "Expert local guides & community partnerships",
    "Safe & responsible eco-tourism"
  ]
}
```

**Dutch Content**:
```typescript
hero: {
  title: "Authentieke Jungle Avonturen in Boven-Suriname",
  subtitle: "Ontdek ongerepte regenwoud, traditionele dorpen en onvergetelijke wildlife ontmoetingen met onze lokale gidsen",
  description: "Ervaar de ongerepte schoonheid van Boven-Suriname met onze all-inclusive meerdaagse jungle tours. Van rivier expedities tot dorps homestays, elk detail is zorgvuldig uitgewerkt voor uw veiligheid en comfort.",
  primaryCTA: "Ontdek Onze Tours",
  secondaryCTA: "Bekijk Ons Verhaal",
  backgroundImage: "/images/hero-jungle-canopy.jpg",
  features: [
    "All-inclusive pakketten (maaltijden, gids, transport)",
    "Kleine groepen (max 12 deelnemers)",
    "Expert lokale gidsen & gemeenschap partnerships",
    "Veilig & verantwoord eco-toerisme"
  ]
}
```

#### Tour Highlights Section
**Component**: `TourCards.tsx`
**Content Source**: `tours` table

**Featured Tours**:
1. **Upper Suriname Discovery** (4 days) - €450
2. **Rainforest Immersion** (6 days) - €680
3. **Village & Wildlife Explorer** (3 days) - €350

#### About Section - ✅ COMPLETE
**Component**: `About.tsx`
**Content Source**: Updated with PingPe eco-tourism content
**Status**: ✅ Implemented

#### Why Choose Us Section
**Component**: `Features.tsx` (Future Phase)

**English**:
```typescript
features: [
  {
    icon: "shield-check",
    title: "Safety First",
    description: "Certified guides, comprehensive insurance, and 24/7 emergency support"
  },
  {
    icon: "users",
    title: "Local Community",
    description: "Direct partnerships with indigenous communities ensuring authentic experiences"
  },
  {
    icon: "leaf",
    title: "Eco-Responsible",
    description: "Sustainable tourism practices that protect the rainforest for future generations"
  },
  {
    icon: "calendar-check",
    title: "Easy Booking",
    description: "Instant online booking with secure payment and immediate confirmation"
  }
]
```

#### Testimonials Section
**Component**: `Testimonials.tsx`

**Content**: Guest reviews from actual or realistic experiences
```typescript
testimonials: [
  {
    name: "Emma & Lars",
    location: "Netherlands",
    rating: 5,
    text: "The most authentic jungle experience we've ever had. Our guide Marcus knew every bird call and plant. The village stay was incredibly moving.",
    tour: "Upper Suriname Discovery",
    image: "/images/testimonial-emma-lars.jpg"
  },
  // ... more testimonials
]
```

#### Call-to-Action Section
**Component**: `CTA.tsx`

**English**: "Ready for Your Jungle Adventure?"
**Dutch**: "Klaar voor Jouw Jungle Avontuur?"

### 2. Tours Catalog (/tours) - ✅ PHASE 1A DATA FOUNDATION COMPLETE

#### Page Header
**Component**: `PageHeader.tsx`

**English**:
```typescript
header: {
  title: "Jungle Tours & Expeditions",
  subtitle: "Multi-day adventures through pristine rainforest and traditional communities",
  description: "Choose from our carefully crafted jungle experiences, each designed to showcase the incredible biodiversity and rich culture of Upper Suriname.",
  breadcrumb: ["Home", "Tours"]
}
```

#### Filter Sidebar
**Component**: `TourFilters.tsx`

**Filters**:
- Duration: 2-3 days, 4-5 days, 6+ days
- Difficulty: Easy, Moderate, Challenging
- Focus: Wildlife, Culture, Adventure, Photography
- Price Range: €0-400, €400-600, €600+

#### Tour Grid
**Component**: `TourGrid.tsx`
**Content Source**: `tours` table with active status

**Card Content Structure**:
```typescript
tourCard: {
  title: "tour.title_[locale]",
  summary: "tour.summary_[locale]",
  duration: "tour.duration_days",
  difficulty: "tour.difficulty_level",
  priceFrom: "tour.price_eur",
  featuredImage: "tour.featured_image",
  highlights: "tour.includes_[locale]", // First 3 items
  availableDates: "calculated from departures",
  ctaText: "View Details & Book"
}
```

### 3. Tour Detail (/tours/:slug)

#### Hero Section
**Component**: `TourDetailHero.tsx`

**Content Structure**:
```typescript
tourHero: {
  title: "tour.title_[locale]",
  subtitle: "tour.summary_[locale]",
  gallery: "tour.gallery_images",
  price: "tour.price_eur",
  duration: "tour.duration_days",
  difficulty: "tour.difficulty_level",
  maxParticipants: "tour.max_participants",
  nextDeparture: "calculated from departures",
  bookingCTA: "Check Availability & Book"
}
```

#### Itinerary Section
**Component**: `TourItinerary.tsx`
**Content Source**: `tour.itinerary_[locale]` (JSONB)

**Structure**:
```typescript
itinerary: [
  {
    day: 1,
    title: "Arrival & River Journey",
    description: "Meet your guide in Paramaribo and begin the scenic drive to the Suriname River. Board traditional dugout canoes for the journey upstream to our first camp.",
    activities: ["Airport pickup", "Scenic drive", "Canoe journey", "Camp setup"],
    meals: ["Lunch", "Dinner"],
    accommodation: "Riverside camp"
  },
  // ... more days
]
```

#### Inclusions/Exclusions
**Component**: `InclusionsExclusions.tsx`

**Content Source**: `tour.includes_[locale]` and `tour.excludes_[locale]`

#### Practical Information
**Component**: `PracticalInfo.tsx`

**Content Source**: `tour.practical_info_[locale]`

**Topics**:
- What to bring/pack
- Physical requirements
- Health & vaccination requirements
- Weather considerations
- Safety measures

#### Booking Widget
**Component**: `BookingWidget.tsx`

**Features**:
- Departure date calendar
- Passenger count selector
- Real-time availability
- Price calculation
- Booking form

### 4. About Page (/about)

#### Our Story Section
**Component**: `AboutStory.tsx`

**English Content**:
```typescript
story: {
  title: "Our Story",
  subtitle: "Born from a passion for Suriname's incredible wilderness",
  content: [
    "Founded in 2018 by local conservationist Marcus Fernandes and Dutch ecologist Anna de Vries, Jungle Resort PingPe began as a dream to share Suriname's pristine rainforest with the world while directly benefiting local communities.",
    "Our name 'PingPe' comes from the Sranan Tongo word meaning 'small bird' - representing the delicate balance we maintain between tourism and conservation.",
    "Today, we work exclusively with certified local guides from the Saramaccan and Paramaccan communities, ensuring every tour provides authentic cultural exchange and direct economic benefit to the villages we visit."
  ],
  image: "/images/about-founders.jpg"
}
```

#### Our Mission Section
**Component**: `Mission.tsx`

**Content**:
- Conservation through sustainable tourism
- Community empowerment and partnership
- Authentic cultural exchange
- Environmental education

#### Certifications Section
**Component**: `Certifications.tsx`

**Content**:
- Eco-tourism certification
- Safety certifications
- Community partnership agreements
- Insurance coverage details

### 5. Team Page (/team)

#### Page Header
**English**: "Meet Our Guides & Local Partners"
**Dutch**: "Ontmoet Onze Gidsen & Lokale Partners"

#### Team Grid
**Component**: `TeamGrid.tsx`

**Sample Team Members**:
```typescript
teamMembers: [
  {
    name: "Marcus Fernandes",
    role: "Head Guide & Co-Founder",
    bio: "Born in Brownsweg, Marcus has 15+ years guiding experience and intimate knowledge of Upper Suriname's flora and fauna.",
    languages: ["English", "Dutch", "Sranan Tongo", "Saramaccan"],
    specialties: ["Bird watching", "Traditional crafts", "Medicinal plants"],
    certifications: ["Wilderness First Aid", "Eco-guide Certification"],
    image: "/images/team-marcus.jpg"
  },
  // ... more team members
]
```

### 6. Pricing Page (/pricing)

#### Pricing Table
**Component**: `PricingTable.tsx`

**Package Structure**:
```typescript
packages: [
  {
    name: "Essential Explorer",
    duration: "3 days",
    price: 350,
    description: "Perfect introduction to jungle life",
    includes: [
      "2 nights accommodation",
      "All meals & drinks",
      "Certified guide",
      "River transport",
      "Village visit"
    ],
    popular: false
  },
  {
    name: "Discovery Adventure",
    duration: "4 days", 
    price: 450,
    description: "Our most popular experience",
    includes: [
      "3 nights accommodation",
      "All meals & drinks", 
      "Certified guide",
      "River & hiking transport",
      "2 village visits",
      "Traditional craft workshop"
    ],
    popular: true
  },
  // ... more packages
]
```

#### Group Discounts
**Component**: `GroupDiscounts.tsx`

**Discount Structure**:
- 6-8 people: 5% discount
- 9-12 people: 10% discount
- Private groups: Custom pricing

### 7. Schedule Page (/schedule)

#### Departure Calendar
**Component**: `DepartureCalendar.tsx`
**Content Source**: `tour_departures` table

**Monthly View**:
- Available departure dates
- Available spots per departure
- Price variations (if any)
- Weather indicators

#### Seasonal Information
**Component**: `SeasonalInfo.tsx`

**Content**:
- Dry season (Aug-Nov): Best for hiking
- Wet season (Dec-July): Lush vegetation, river access
- Wildlife viewing calendar
- Weather patterns

### 8. Gallery Page (/gallery)

#### Photo Categories
**Component**: `GalleryGrid.tsx`

**Categories**:
- Wildlife & Nature
- Cultural Encounters
- River Adventures
- Camp Life
- Landscapes
- Guest Experiences

**Image Structure**:
```typescript
galleryImages: [
  {
    src: "/images/gallery/wildlife-toucan.jpg",
    alt: "Colorful toucan in primary rainforest",
    category: "Wildlife & Nature",
    tour: "Upper Suriname Discovery",
    caption: "Keel-billed toucan spotted during morning bird walk"
  },
  // ... more images
]
```

### 9. FAQ Page (/faq)

#### FAQ Categories
**Component**: `FAQAccordion.tsx`

**Categories & Questions**:

**Booking & Payment**:
- How do I book a tour?
- What payment methods do you accept?
- When is payment due?
- What is your cancellation policy?

**Tour Preparation**:
- What should I bring?
- What is the physical difficulty level?
- Do I need vaccinations?
- What if I have dietary restrictions?

**During Your Tour**:
- What type of accommodation is provided?
- How many people per group?
- What happens in bad weather?
- Is Wi-Fi available?

### 10. Contact Page (/contact)

#### Contact Information
**Component**: `ContactInfo.tsx`

**Details**:
```typescript
contact: {
  address: "Jungle Resort PingPe\nBrownsweg, Upper Suriname River\nSuriname, South America",
  phone: "+597 123-4567",
  whatsapp: "+597 123-4567",
  email: "info@jungleresortpingpe.com",
  emergencyPhone: "+597 987-6543",
  coordinates: { lat: 4.7570, lng: -55.1630 }
}
```

#### Contact Form
**Component**: `ContactForm.tsx`

**Fields**:
- Name (required)
- Email (required) 
- Phone
- Tour Interest
- Message (required)
- Preferred Contact Method

#### Map Section
**Component**: `LocationMap.tsx`

**Features**:
- Interactive map showing resort location
- Nearby airports and transportation
- Points of interest

### 11. Shop Pages (/shop, /shop/:slug)

#### Product Categories
**Component**: `ShopCategories.tsx`

**Categories**:
- Traditional Crafts
- Artwork & Textiles
- Natural Products
- Souvenirs & Gifts

#### Product Detail Structure
**Component**: `ProductDetail.tsx`
**Content Source**: `products` table

```typescript
product: {
  name: "product.name_[locale]",
  description: "product.description_[locale]",
  price: "product.price",
  images: "product.images",
  inStock: "product.stock_quantity > 0",
  weight: "product.weight_grams",
  artisan: "product.artisan_info",
  origin: "product.origin_village"
}
```

### 12. Legal Pages (/legal/*)

#### Terms & Conditions
**Component**: `LegalContent.tsx`

**Sections**:
- Booking terms
- Payment conditions
- Cancellation policy
- Liability limitations
- Force majeure
- Governing law

#### Privacy Policy
**Content**: GDPR-compliant privacy policy covering data collection, usage, and rights

#### Cookie Policy
**Content**: Cookie usage disclosure and consent management

## SEO Content Strategy

### Meta Tags Template
```typescript
seoMeta: {
  title: {
    en: "[Page Title] | Jungle Resort PingPe - Authentic Suriname Adventures",
    nl: "[Page Title] | Jungle Resort PingPe - Authentieke Suriname Avonturen"
  },
  description: {
    en: "[Page description optimized for target keywords, max 160 chars]",
    nl: "[Nederlandse pagina beschrijving geoptimaliseerd voor zoekwoorden, max 160 chars]"
  },
  keywords: {
    en: ["suriname tours", "jungle adventure", "rainforest expedition", "eco tourism"],
    nl: ["suriname tours", "jungle avontuur", "regenwoud expeditie", "eco toerisme"]
  }
}
```

### Structured Data
**JSON-LD Schema**:
- Organization markup
- LocalBusiness markup
- Product markup (tours)
- Review markup (testimonials)
- Event markup (departures)

## Content Management Workflow

### Translation Process
1. **English First**: All content created in English
2. **Professional Translation**: Dutch translation by native speaker
3. **Cultural Adaptation**: Adapt content for Dutch/European market
4. **SEO Optimization**: Keyword research for both languages
5. **Quality Review**: Final review by bilingual team member

### Content Updates
1. **Database Updates**: Content changes via Supabase
2. **Version Control**: Track content versions
3. **Preview Mode**: Test content before publishing
4. **Cache Invalidation**: Clear CDN cache after updates

### Asset Management
1. **Image Optimization**: WebP format with fallbacks
2. **Alt Text**: Descriptive alt text in both languages
3. **File Naming**: Consistent naming convention
4. **CDN Integration**: Fast global delivery

---

**Last Updated**: Initial content mapping design
**Next Review**: After content creation and translation completion