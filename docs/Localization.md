# Jungle Resort PingPe - Localization Strategy

## Overview

This document outlines the internationalization (i18n) strategy for the Jungle Resort PingPe platform, focusing on Dutch and English language support with proper cultural adaptation for European markets.

## Internationalization Architecture

### Technical Implementation

#### i18next Configuration
```typescript
// i18n/config.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    
    interpolation: {
      escapeValue: false,
    },
    
    resources: {
      en: {
        common: require('./locales/en/common.json'),
        tours: require('./locales/en/tours.json'),
        booking: require('./locales/en/booking.json'),
        navigation: require('./locales/en/navigation.json'),
      },
      nl: {
        common: require('./locales/nl/common.json'),
        tours: require('./locales/nl/tours.json'),
        booking: require('./locales/nl/booking.json'),
        navigation: require('./locales/nl/navigation.json'),
      }
    }
  });

export default i18n;
```

#### Language Detection & Switching
```typescript
// components/LanguageSwitcher.tsx
const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    // Update URL for SEO
    const newPath = window.location.pathname.replace(/^\/(en|nl)/, `/${language}`);
    window.history.pushState({}, '', newPath);
  };
  
  return (
    <div className="language-switcher">
      <button 
        onClick={() => changeLanguage('en')}
        className={i18n.language === 'en' ? 'active' : ''}
      >
        English
      </button>
      <button 
        onClick={() => changeLanguage('nl')}
        className={i18n.language === 'nl' ? 'active' : ''}
      >
        Nederlands
      </button>
    </div>
  );
};
```

## Translation Resource Structure

### File Organization
```
src/i18n/
├── locales/
│   ├── en/
│   │   ├── common.json          # Shared translations
│   │   ├── navigation.json      # Menu and navigation
│   │   ├── tours.json          # Tour-related content
│   │   ├── booking.json        # Booking process
│   │   ├── forms.json          # Form labels and validation
│   │   ├── legal.json          # Legal pages
│   │   └── seo.json            # SEO meta content
│   └── nl/
│       ├── common.json
│       ├── navigation.json
│       ├── tours.json
│       ├── booking.json
│       ├── forms.json
│       ├── legal.json
│       └── seo.json
├── config.ts
└── index.ts
```

### Translation Keys Structure

#### Common Translations
```json
// locales/en/common.json
{
  "brand": {
    "name": "Jungle Resort PingPe",
    "tagline": "Authentic Suriname Adventures"
  },
  "actions": {
    "book_now": "Book Now",
    "learn_more": "Learn More",
    "view_details": "View Details",
    "get_in_touch": "Get in Touch",
    "download": "Download",
    "share": "Share"
  },
  "status": {
    "available": "Available",
    "sold_out": "Sold Out",
    "confirmed": "Confirmed",
    "pending": "Pending",
    "cancelled": "Cancelled"
  },
  "time": {
    "days": "{{count}} day",
    "days_plural": "{{count}} days",
    "duration": "Duration",
    "departure": "Departure",
    "return": "Return"
  }
}
```

```json
// locales/nl/common.json
{
  "brand": {
    "name": "Jungle Resort PingPe",
    "tagline": "Authentieke Suriname Avonturen"
  },
  "actions": {
    "book_now": "Nu Boeken",
    "learn_more": "Meer Weten",
    "view_details": "Bekijk Details",
    "get_in_touch": "Neem Contact Op",
    "download": "Downloaden",
    "share": "Delen"
  },
  "status": {
    "available": "Beschikbaar",
    "sold_out": "Uitverkocht",
    "confirmed": "Bevestigd",
    "pending": "In Behandeling",
    "cancelled": "Geannuleerd"
  },
  "time": {
    "days": "{{count}} dag",
    "days_plural": "{{count}} dagen",
    "duration": "Duur",
    "departure": "Vertrek",
    "return": "Terugkomst"
  }
}
```

#### Navigation Translations
```json
// locales/en/navigation.json
{
  "menu": {
    "home": "Home",
    "tours": "Tours",
    "about": "About",
    "gallery": "Gallery",
    "contact": "Contact",
    "pricing": "Pricing",
    "schedule": "Schedule",
    "team": "Our Team",
    "faq": "FAQ",
    "shop": "Shop"
  },
  "footer": {
    "quick_links": "Quick Links",
    "contact_info": "Contact Information",
    "follow_us": "Follow Us",
    "newsletter": "Newsletter",
    "legal": "Legal"
  },
  "breadcrumb": {
    "home": "Home",
    "tours": "Tours",
    "tour_detail": "Tour Details",
    "booking": "Booking",
    "confirmation": "Confirmation"
  }
}
```

#### Tours Translations
```json
// locales/en/tours.json
{
  "catalog": {
    "title": "Jungle Tours & Expeditions",
    "subtitle": "Multi-day adventures through pristine rainforest",
    "filters": {
      "duration": "Duration",
      "difficulty": "Difficulty",
      "price": "Price Range",
      "focus": "Tour Focus"
    },
    "difficulty_levels": {
      "easy": "Easy",
      "moderate": "Moderate", 
      "challenging": "Challenging"
    },
    "focus_areas": {
      "wildlife": "Wildlife",
      "culture": "Culture",
      "adventure": "Adventure",
      "photography": "Photography"
    }
  },
  "detail": {
    "overview": "Tour Overview",
    "itinerary": "Day-by-Day Itinerary",
    "included": "What's Included",
    "excluded": "What's Excluded",
    "practical": "Practical Information",
    "gallery": "Photo Gallery",
    "reviews": "Guest Reviews",
    "book_now": "Book This Tour"
  },
  "booking": {
    "select_date": "Select Departure Date",
    "participants": "Number of Participants",
    "available_spots": "{{count}} spot available",
    "available_spots_plural": "{{count}} spots available",
    "price_per_person": "Price per person",
    "total_price": "Total Price"
  }
}
```

#### Booking Translations
```json
// locales/en/booking.json
{
  "steps": {
    "tour_selection": "Tour Selection",
    "date_participants": "Date & Participants", 
    "personal_details": "Personal Details",
    "payment": "Payment",
    "confirmation": "Confirmation"
  },
  "forms": {
    "customer_info": {
      "title": "Customer Information",
      "full_name": "Full Name",
      "email": "Email Address",
      "phone": "Phone Number",
      "country": "Country",
      "emergency_contact": "Emergency Contact"
    },
    "participants": {
      "title": "Participant Details",
      "add_participant": "Add Participant",
      "participant_name": "Participant Name",
      "age": "Age",
      "dietary_requirements": "Dietary Requirements",
      "medical_conditions": "Medical Conditions"
    },
    "special_requests": {
      "title": "Special Requests",
      "requests": "Any special requests or requirements?",
      "dietary": "Dietary restrictions",
      "accessibility": "Accessibility needs",
      "other": "Other requests"
    }
  },
  "payment": {
    "methods": {
      "title": "Payment Method",
      "credit_card": "Credit Card",
      "paypal": "PayPal",
      "bank_transfer": "Bank Transfer"
    },
    "summary": {
      "tour": "Tour",
      "departure": "Departure Date",
      "participants": "Participants",
      "subtotal": "Subtotal",
      "total": "Total Amount"
    }
  }
}
```

## Cultural Adaptation

### Dutch Market Adaptations

#### Cultural Considerations
- **Direct Communication**: Dutch customers appreciate straightforward, honest communication
- **Detailed Information**: Provide comprehensive details about tours, safety, and logistics
- **Practical Focus**: Emphasize practical aspects like what to bring, physical requirements
- **Value Awareness**: Dutch travelers are value-conscious, highlight included services
- **Environmental Consciousness**: Emphasize eco-friendly and sustainable practices

#### Localized Content Examples
```json
// Dutch-specific content adaptations
{
  "hero": {
    "title": "Ontdek de Ongerepte Regenwouden van Suriname",
    "description": "Ervaar authentieke jungle avonturen in ons voormalige buurland. Van rivier expedities tot dorpenbezoeken - elk detail zorgvuldig uitgewerkt voor uw veiligheid en comfort."
  },
  "practical": {
    "from_netherlands": "Directe vluchten vanuit Amsterdam (9 uur)",
    "no_visa_required": "Geen visum vereist voor Nederlandse burgers",
    "currency": "Betaling in Euro's - geen wisselkoers zorgen"
  }
}
```

#### Dutch Travel Terminology
- **"Avontuurlijke reis"** instead of generic "adventure"
- **"Kleinschalig toerisme"** for small-group emphasis
- **"Duurzaam reizen"** for sustainable tourism
- **"All-inclusive arrangement"** for package deals
- **"Lokale gidsen"** for local guides

### Date & Time Localization

#### Date Formatting
```typescript
// utils/dateFormat.ts
export const formatDate = (date: Date, locale: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  return new Intl.DateTimeFormat(locale, options).format(date);
};

// Usage examples:
// EN: "March 15, 2024"
// NL: "15 maart 2024"
```

#### Currency Formatting
```typescript
// utils/currency.ts
export const formatCurrency = (amount: number, locale: string): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR'
  }).format(amount);
};

// Usage examples:
// EN: "€450.00"
// NL: "€ 450,00"
```

## SEO Localization

### URL Structure
```
English:
/en/
/en/tours/
/en/tours/upper-suriname-discovery/
/en/about/

Dutch:
/nl/
/nl/tours/ (or /nl/reizen/)
/nl/tours/boven-suriname-ontdekking/
/nl/over-ons/
```

### Meta Tags Localization
```typescript
// utils/seoMeta.ts
const seoMeta = {
  en: {
    home: {
      title: "Authentic Suriname Jungle Tours | Jungle Resort PingPe",
      description: "Experience authentic jungle adventures in Upper Suriname. Multi-day eco-tours with local guides, village visits, and wildlife encounters.",
      keywords: "suriname tours, jungle adventure, rainforest tours, eco tourism"
    }
  },
  nl: {
    home: {
      title: "Authentieke Suriname Jungle Tours | Jungle Resort PingPe", 
      description: "Beleef authentieke jungle avonturen in Boven-Suriname. Meerdaagse eco-tours met lokale gidsen, dorpenbezoeken en wildlife ontmoetingen.",
      keywords: "suriname reizen, jungle avontuur, regenwoud tours, eco toerisme"
    }
  }
};
```

## Translation Workflow

### Content Creation Process

#### Phase 1: Source Content Creation
1. **English First**: Create all content in English
2. **Content Review**: Review for clarity and completeness
3. **Cultural Neutrality**: Ensure content is culturally adaptable
4. **Key Extraction**: Extract translatable strings to JSON files

#### Phase 2: Professional Translation
1. **Professional Translator**: Native Dutch speaker with travel industry experience
2. **Cultural Adaptation**: Adapt content for Dutch market preferences
3. **SEO Translation**: Translate with Dutch keyword optimization
4. **Review Process**: Native speaker review for accuracy and tone

#### Phase 3: Implementation & Testing
1. **Technical Integration**: Implement translations in i18next
2. **Layout Testing**: Ensure text fits in all UI components
3. **Functionality Testing**: Test language switching functionality
4. **SEO Testing**: Verify meta tags and structured data

### Translation Tools & Resources

#### Translation Management
```typescript
// Translation helper for developers
const useTranslationHelper = () => {
  const { t, i18n } = useTranslation();
  
  const getLocalizedContent = (content: any, fallback: string = '') => {
    const currentLang = i18n.language;
    return content?.[currentLang] || content?.en || fallback;
  };
  
  return { t, getLocalizedContent };
};
```

#### Quality Assurance
- **Translation Memory**: Maintain consistency across content
- **Terminology Database**: Standardize travel and tourism terms
- **Cultural Review**: Regular review by Dutch market expert
- **User Testing**: Test with Dutch-speaking users

## Database Localization

### Multilingual Content Storage
```sql
-- Tours table with localized fields
CREATE TABLE tours (
  id UUID PRIMARY KEY,
  slug TEXT UNIQUE,
  title_en TEXT NOT NULL,
  title_nl TEXT NOT NULL,
  summary_en TEXT NOT NULL,
  summary_nl TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_nl TEXT NOT NULL,
  includes_en TEXT[] NOT NULL,
  includes_nl TEXT[] NOT NULL,
  practical_info_en TEXT,
  practical_info_nl TEXT,
  -- ... other fields
);
```

### Dynamic Content Retrieval
```typescript
// API helper for localized content
const getLocalizedTour = async (slug: string, locale: string) => {
  const { data } = await supabase
    .from('tours')
    .select(`
      id,
      slug,
      title_${locale},
      summary_${locale},
      description_${locale},
      includes_${locale},
      practical_info_${locale},
      price_eur,
      duration_days
    `)
    .eq('slug', slug)
    .single();
  
  return data;
};
```

## Performance Considerations

### Bundle Optimization
```typescript
// Lazy load translations to reduce initial bundle size
const loadTranslations = async (language: string) => {
  const translations = await import(`./locales/${language}/index.js`);
  return translations.default;
};
```

### Caching Strategy
- **Browser Cache**: Cache translation files with versioning
- **CDN Cache**: Serve translation files from CDN
- **Local Storage**: Cache user language preference
- **Service Worker**: Offline translation support

## Accessibility & Localization

### Language-Specific Accessibility
- **Text Direction**: Proper LTR support for both languages
- **Font Support**: Ensure fonts support Dutch characters (ë, ï, ü, etc.)
- **Screen Readers**: Proper lang attributes for screen reader pronunciation
- **Keyboard Navigation**: Language-aware keyboard shortcuts

### Form Validation
```typescript
// Localized form validation messages
const validationMessages = {
  en: {
    required: 'This field is required',
    email: 'Please enter a valid email address',
    phone: 'Please enter a valid phone number'
  },
  nl: {
    required: 'Dit veld is verplicht',
    email: 'Voer een geldig e-mailadres in',
    phone: 'Voer een geldig telefoonnummer in'
  }
};
```

## Maintenance & Updates

### Content Update Process
1. **Source Updates**: Update English content first
2. **Translation Updates**: Professional translation of changes
3. **Version Control**: Track translation versions
4. **Deployment**: Coordinate multilingual content deployment

### Quality Monitoring
- **Translation Analytics**: Track user engagement by language
- **Error Monitoring**: Monitor translation-related errors
- **User Feedback**: Collect feedback on translation quality
- **Regular Reviews**: Quarterly translation quality reviews

---

**Last Updated**: Initial localization strategy design
**Next Review**: After i18n implementation and first translation cycle completion