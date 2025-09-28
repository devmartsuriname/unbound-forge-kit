# Content Mapping - Jungle Resort PingPe

## Homepage Sections Updated (Phase 1A.2)

### Hero Section (Banner.tsx)
- **Title**: "Authentic Jungle Adventures in Upper Suriname"
- **Subtitle**: "Discover pristine rainforest, traditional villages, and unforgettable wildlife encounters"
- **CTA**: "Explore Our Tours" → `/tours`
- **Images**: Updated to jungle resort themed placeholders
- **Pricing**: "Tours Starting From €350/person"

### About Section (About.tsx)
- **Title**: "Why Choose Jungle Resort PingPe"
- **Content**: Focus on eco-tourism, local community partnerships, authentic Suriname experience
- **Images**: PingPe jungle resort and guide placeholders
- **CTA**: "Explore Our Tours" → `/tours`

### Partner Destinations Section (Location.tsx)
- **Title**: "Discover Suriname with Trusted Partners"
- **Subtitle**: "Partner Destinations"
- **Content**: "Explore protected nature reserves and cultural sites through our certified partner network"
- **Destinations**:
  1. Brownsberg Nature Park (STINASU) - 5 tours
  2. Raleighvallen & Voltzberg (STINASU) - 8 tours  
  3. Galibi Sea Turtle Tour (Local guides) - 6 tours
  4. Commewijne River Cruise (Suriname River Tours) - 7 tours

### Choose Section (Choose.tsx)
- **Title**: "Discover What Makes Us Different"
- **Subtitle**: "Authentic jungle experiences with local expertise"
- **Content**: Focus on pristine rainforest, expert guides, community partnerships
- **Features**:
  1. Expert Local Guides - certified indigenous guides
  2. Safe & Sustainable Tourism - safety protocols and eco-friendly practices
- **CTA**: "Explore Our Tours" → `/tours`

### Blog Section (Blog.tsx)
- **Title**: "Cultural Highlights & Wildlife Stories"
- **Subtitle**: "Discover Suriname"
- **Content**: "Learn about traditional communities, wildlife encounters and conservation efforts in Upper Suriname"
- **Articles**:
  1. "Cultural Highlights of Upper Suriname: Traditions that Endure" (Cultural Heritage)
  2. "Wildlife Photography in Surinamese Rainforest" (Wildlife)
  3. "Traditional Villages Along the Suriname River" (Culture)

## Tours Section Complete (Phase 1A.1)

### Tours Data (ToursData.tsx)
- **5 Complete Tours** with EN/NL translations:
  1. Upper Suriname Discovery (4 days, €450)
  2. Rainforest Immersion (6 days, €680)
  3. Village & Wildlife Explorer (3 days, €350)
  4. Extended Jungle Adventure (5 days, €580)
  5. Back-to-Basic Expedition (3 days, €320)

### Tours Integration
- `/tours` page displays all tours from ToursData.tsx
- `/tours/:slug` detail pages connected to ToursData
- Filtering by duration, difficulty, price, and rating
- Bilingual support (EN/NL)

## Authentic Images Integrated (Phase 1A.4)

### Hero Section Images (Authentic PingPe Content)
- `/assets/img/hero/jungle-resort-hero-1.jpg` - PingPe resort view (sourced from official website)
- `/assets/img/hero/jungle-resort-hero-2.jpg` - Traditional village scene (sourced from official website)  
- `/assets/img/hero/jungle-resort-hero-3.jpg` - Ananasberg location (sourced from official website)
- `/assets/img/hero/jungle-resort-hero-4.jpg` - Upper Suriname River with traditional boats
- `/assets/img/hero/jungle-resort-hero-5.jpg` - Sunset over river with village silhouettes

### Tour Images (Authentic Experiences)
- `/assets/img/listing/listing-1.jpg` - Traditional Saramaccan village life
- `/assets/img/listing/listing-2.jpg` - Rainforest discovery with wildlife guide
- `/assets/img/listing/listing-3.jpg` - Jungle expedition adventure trekking
- `/assets/img/listing/listing-4.jpg` - Cultural crafts workshop experience
- `/assets/img/listing/listing-5.jpg` - Back-to-basic expedition campsite

### Tour Detail Gallery Images
- `/assets/img/tour-details/thumb-1.jpg` - Tour group jungle exploration
- `/assets/img/tour-details/thumb-2.jpg` - Traditional dugout canoe journey
- `/assets/img/tour-details/thumb-3.jpg` - Exotic birds and wildlife spotting
- `/assets/img/tour-details/thumb-4.jpg` - Traditional village cultural workshop

### Partner Destination Images (Authentic Locations)
- `/assets/img/partners/brownsberg-nature-park.jpg` - STINASU Brownsberg waterfalls
- `/assets/img/partners/raleighvallen-voltzberg.jpg` - Granite dome mountains
- `/assets/img/partners/galibi-sea-turtle.jpg` - Night turtle conservation tour
- `/assets/img/partners/commewijne-river-cruise.jpg` - River cruise with wildlife

### Blog Images (Cultural & Wildlife Content)
- `/assets/img/blog/cultural-highlights-suriname.jpg` - Traditional ceremony
- `/assets/img/blog/suriname-wildlife-photography.jpg` - Professional wildlife photography
- `/assets/img/blog/traditional-villages-suriname.jpg` - River villages architecture

### About/Choose Section Images
- `/assets/img/chose/jungle-resort-pingpe-experience.jpg` - PingPe eco-lodge facilities

### Image Alt Text (Bilingual SEO)
- All images have descriptive alt text in EN/NL
- Alt text stored in translation files under `images.alt.*`
- SEO-optimized for Suriname jungle tourism keywords

## Translation Files
- Both `en.json` and `nl.json` support all homepage content
- Tour descriptions available in both languages
- Navigation and common elements translated

## Next Phase
Ready for Phase 1B: About, Team & FAQ sections