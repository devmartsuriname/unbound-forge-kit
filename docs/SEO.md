# SEO Metadata - Jungle Resort PingPe

## Homepage SEO (Updated Phase 1A.2)

### Meta Title (60 chars max)
**EN**: "Jungle Resort PingPe | Authentic Tours in Upper Suriname"
**NL**: "Jungle Resort PingPe | Authentieke Tours Boven-Suriname"

### Meta Description (160 chars max)  
**EN**: "Experience authentic jungle adventures in Upper Suriname with expert local guides. Eco-tourism, traditional villages & wildlife encounters. Book now!"
**NL**: "Beleef authentieke jungle avonturen in Boven-Suriname met lokale expert gidsen. Eco-toerisme, traditionele dorpen & wildlife ontmoetingen. Boek nu!"

### Primary Keywords
- Jungle tours Suriname
- Upper Suriname adventures
- Eco-tourism Suriname
- Rainforest expeditions
- Traditional village tours
- Wildlife encounters Suriname

### H1 Tag (Homepage)
"Authentic Jungle Adventures in Upper Suriname"

### Structured Data (JSON-LD)
```json
{
  "@context": "https://schema.org",
  "@type": "TourOperator",
  "name": "Jungle Resort PingPe",
  "description": "Authentic jungle adventures and eco-tourism in Upper Suriname",
  "url": "https://jungleresortpingpe.com",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "SR",
    "addressRegion": "Upper Suriname"
  },
  "offers": [
    {
      "@type": "TourPackage",
      "name": "Upper Suriname Discovery",
      "duration": "P4D",
      "price": "450",
      "priceCurrency": "EUR"
    }
  ]
}
```

## Tours SEO

### Tours List Page `/tours`
**Title**: "Jungle Tours Suriname | Upper Suriname Expeditions | PingPe"
**Description**: "Choose from 5 authentic jungle tours in Upper Suriname. Expert guides, wildlife encounters, traditional villages. Difficulty levels from easy to challenging."

### Individual Tour Pages `/tours/:slug`
**Title Pattern**: "[Tour Name] | [Duration] Days | Jungle Resort PingPe"
**Description Pattern**: "[Tour summary] in Upper Suriname. Includes [key highlights]. From €[price] per person. Expert local guides."

### Tour Schema Markup
```json
{
  "@context": "https://schema.org",
  "@type": "TourPackage",
  "name": "[Tour Name]",
  "description": "[Tour Description]",
  "provider": {
    "@type": "Organization",
    "name": "Jungle Resort PingPe"
  },
  "duration": "P[X]D",
  "offers": {
    "@type": "Offer",
    "price": "[price]",
    "priceCurrency": "EUR"
  }
}
```

## Partner Destinations SEO

### Brownsberg Nature Park
**Keywords**: STINASU, Brownsberg, nature reserve Suriname, waterfalls

### Raleighvallen & Voltzberg  
**Keywords**: Voltzberg dome, Raleighvallen, pristine rainforest

### Galibi Sea Turtle Tour
**Keywords**: sea turtle nesting, Galibi, marine conservation

### Commewijne River Cruise
**Keywords**: river cruise, plantation tours, historical Suriname

## Blog SEO

### Cultural Highlights Article
**Title**: "Cultural Highlights of Upper Suriname: Traditional Communities"
**Keywords**: Suriname culture, indigenous traditions, traditional villages

### Wildlife Photography Article  
**Title**: "Wildlife Photography in Surinamese Rainforest | Expert Tips"
**Keywords**: Suriname wildlife, rainforest photography, jungle animals

### Traditional Villages Article
**Title**: "Traditional Villages Along Suriname River | Cultural Tours"
**Keywords**: Suriname River, traditional villages, cultural heritage

## Technical SEO

### Canonical URLs
- Homepage: `https://jungleresortpingpe.com/`
- Tours: `https://jungleresortpingpe.com/tours/`
- Individual tours: `https://jungleresortpingpe.com/tours/[slug]/`

### Hreflang Tags
```html
<link rel="alternate" hreflang="en" href="https://jungleresortpingpe.com/en/" />
<link rel="alternate" hreflang="nl" href="https://jungleresortpingpe.com/nl/" />
```

### Image Alt Text Standards
- Hero images: "Jungle Resort PingPe [specific scene description]"
- Tour images: "[Tour name] - [activity description] in Upper Suriname"
- Partner images: "[Partner name] - [location/activity] in Suriname"

## Performance Targets
- Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- Mobile PageSpeed Score: 90+
- Image optimization: WebP format, lazy loading
- Critical CSS inline for above-the-fold content

## Local SEO (Future)
- Google My Business listing
- Local directory submissions  
- Tourism Suriname partnership listings