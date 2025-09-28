export interface DayItinerary {
  day: number;
  title_en: string;
  title_nl: string;
  description_en: string;
  description_nl: string;
  activities_en: string[];
  activities_nl: string[];
}

export interface TourData {
  id: number;
  slug: string;
  title_en: string;
  title_nl: string;
  summary_en: string;
  summary_nl: string;
  duration_days: number;
  difficulty_level: 'easy' | 'moderate' | 'challenging';
  price_eur: number;
  featured_image: string;
  gallery_images: string[];
  includes_en: string[];
  includes_nl: string[];
  excludes_en: string[];
  excludes_nl: string[];
  itinerary_en: DayItinerary[];
  itinerary_nl: DayItinerary[];
  practical_info_en: string;
  practical_info_nl: string;
  max_participants: number;
  category: string;
  featured?: boolean;
  tag?: string;
  location: string;
  review: number;
}

const tours_data: TourData[] = [
  {
    id: 1,
    slug: "village-wildlife-explorer",
    title_en: "Village & Wildlife Explorer",
    title_nl: "Dorp & Wildlife Verkenner",
    summary_en: "Perfect introduction to Suriname's jungle and indigenous culture",
    summary_nl: "Perfecte introductie tot Suriname's jungle en inheemse cultuur",
    duration_days: 3,
    difficulty_level: 'easy',
    price_eur: 350,
    featured_image: "/assets/img/listing/listing-1.jpg",
    gallery_images: [
      "/assets/img/tour-details/thumb-1.jpg",
      "/assets/img/tour-details/thumb-2.jpg",
      "/assets/img/tour-details/thumb-3.jpg",
      "/assets/img/tour-details/thumb-4.jpg"
    ],
    includes_en: [
      "All meals and accommodation",
      "Professional local guide",
      "River transportation",
      "Village visits with cultural activities",
      "Wildlife spotting tours"
    ],
    includes_nl: [
      "Alle maaltijden en accommodatie",
      "Professionele lokale gids",
      "Rivier transport",
      "Dorpsbezoeken met culturele activiteiten",
      "Wildlife spotting tours"
    ],
    excludes_en: [
      "International flights",
      "Personal expenses",
      "Travel insurance",
      "Alcoholic beverages"
    ],
    excludes_nl: [
      "Internationale vluchten",
      "Persoonlijke uitgaven",
      "Reisverzekering",
      "Alcoholische dranken"
    ],
    itinerary_en: [
      {
        day: 1,
        title_en: "Arrival & River Journey",
        title_nl: "Aankomst & Rivierreis",
        description_en: "Meet your guide and begin the adventure",
        description_nl: "Ontmoet je gids en begin het avontuur",
        activities_en: ["Transfer from Paramaribo", "Boat journey to PingPe", "Welcome dinner", "Evening wildlife sounds"],
        activities_nl: ["Transfer vanuit Paramaribo", "Bootreis naar PingPe", "Welkomstdiner", "Avondlijke wildlife geluiden"]
      },
      {
        day: 2,
        title_en: "Village Culture & Jungle Trek",
        title_nl: "Dorpscultuur & Jungle Tocht",
        description_en: "Immerse in local traditions and explore the rainforest",
        description_nl: "Dompel je onder in lokale tradities en verken het regenwoud",
        activities_en: ["Traditional village visit", "Handicraft workshop", "Jungle hiking", "Medicinal plant tour"],
        activities_nl: ["Traditioneel dorpsbezoek", "Handwerk workshop", "Jungle wandeling", "Medicinale planten tour"]
      },
      {
        day: 3,
        title_en: "Wildlife & Departure",
        title_nl: "Wildlife & Vertrek",
        description_en: "Final wildlife spotting and return journey",
        description_nl: "Laatste wildlife spotten en terugreis",
        activities_en: ["Early morning bird watching", "Final jungle walk", "Return to Paramaribo"],
        activities_nl: ["Vroege ochtend vogels kijken", "Laatste jungle wandeling", "Terug naar Paramaribo"]
      }
    ],
    itinerary_nl: [
      {
        day: 1,
        title_en: "Arrival & River Journey",
        title_nl: "Aankomst & Rivierreis",
        description_en: "Meet your guide and begin the adventure",
        description_nl: "Ontmoet je gids en begin het avontuur",
        activities_en: ["Transfer from Paramaribo", "Boat journey to PingPe", "Welcome dinner", "Evening wildlife sounds"],
        activities_nl: ["Transfer vanuit Paramaribo", "Bootreis naar PingPe", "Welkomstdiner", "Avondlijke wildlife geluiden"]
      },
      {
        day: 2,
        title_en: "Village Culture & Jungle Trek",
        title_nl: "Dorpscultuur & Jungle Tocht",
        description_en: "Immerse in local traditions and explore the rainforest",
        description_nl: "Dompel je onder in lokale tradities en verken het regenwoud",
        activities_en: ["Traditional village visit", "Handicraft workshop", "Jungle hiking", "Medicinal plant tour"],
        activities_nl: ["Traditioneel dorpsbezoek", "Handwerk workshop", "Jungle wandeling", "Medicinale planten tour"]
      },
      {
        day: 3,
        title_en: "Wildlife & Departure",
        title_nl: "Wildlife & Vertrek",
        description_en: "Final wildlife spotting and return journey",
        description_nl: "Laatste wildlife spotten en terugreis",
        activities_en: ["Early morning bird watching", "Final jungle walk", "Return to Paramaribo"],
        activities_nl: ["Vroege ochtend vogels kijken", "Laatste jungle wandeling", "Terug naar Paramaribo"]
      }
    ],
    practical_info_en: "Moderate fitness level required. Comfortable walking shoes essential. Bring insect repellent and sunscreen.",
    practical_info_nl: "Matige conditie vereist. Comfortabele wandelschoenen essentieel. Neem insectenspray en zonnebrandcrème mee.",
    max_participants: 8,
    category: "cat-three cat-one",
    tag: "New",
    location: "Upper Suriname River",
    review: 5
  },
  {
    id: 2,
    slug: "upper-suriname-discovery",
    title_en: "Upper Suriname Discovery",
    title_nl: "Boven-Suriname Ontdekking",
    summary_en: "Comprehensive 4-day exploration of pristine rainforest and traditional communities",
    summary_nl: "Uitgebreide 4-daagse verkenning van ongerept regenwoud en traditionele gemeenschappen",
    duration_days: 4,
    difficulty_level: 'moderate',
    price_eur: 450,
    featured_image: "/assets/img/listing/listing-2.jpg",
    gallery_images: [
      "/assets/img/tour-details/thumb-1.jpg",
      "/assets/img/tour-details/thumb-2.jpg",
      "/assets/img/tour-details/thumb-3.jpg"
    ],
    includes_en: [
      "All meals and eco-lodge accommodation",
      "Expert naturalist guide",
      "All transportation including dugout canoe",
      "Traditional village experiences",
      "Night walk and wildlife spotting"
    ],
    includes_nl: [
      "Alle maaltijden en eco-lodge accommodatie",
      "Expert natuurgids",
      "Al het transport inclusief dugout kano",
      "Traditionele dorpservaringen",
      "Nachtwandeling en wildlife spotten"
    ],
    excludes_en: [
      "International flights to Suriname",
      "Personal expenses and souvenirs",
      "Travel insurance (recommended)",
      "Tips for guides"
    ],
    excludes_nl: [
      "Internationale vluchten naar Suriname",
      "Persoonlijke uitgaven en souvenirs",
      "Reisverzekering (aanbevolen)",
      "Fooien voor gidsen"
    ],
    itinerary_en: [
      {
        day: 1,
        title_en: "Journey to the Heart of Suriname",
        title_nl: "Reis naar het Hart van Suriname",
        description_en: "Travel from the capital to pristine wilderness",
        description_nl: "Reis van de hoofdstad naar ongerepte wildernis",
        activities_en: ["Departure from Paramaribo", "Scenic drive through interior", "Boat transfer to PingPe Resort", "Orientation and welcome dinner"],
        activities_nl: ["Vertrek vanuit Paramaribo", "Schilderachtige rit door het binnenland", "Boottransfer naar PingPe Resort", "Oriëntatie en welkomstdiner"]
      },
      {
        day: 2,
        title_en: "Cultural Immersion Day",
        title_nl: "Culturele Onderdompeling Dag",
        description_en: "Deep dive into Saramaccan culture and traditions",
        description_nl: "Diepe duik in Saramaccan cultuur en tradities",
        activities_en: ["Traditional village visit", "Learn about medicinal plants", "Participate in daily village life", "Traditional cooking class"],
        activities_nl: ["Traditioneel dorpsbezoek", "Leren over medicinale planten", "Deelnemen aan dagelijks dorpsleven", "Traditionele kookles"]
      },
      {
        day: 3,
        title_en: "Rainforest Adventure",
        title_nl: "Regenwoud Avontuur",
        description_en: "Explore the pristine Amazon rainforest",
        description_nl: "Verken het ongerepte Amazone regenwoud",
        activities_en: ["Dawn chorus bird watching", "Canopy walk and wildlife spotting", "River expedition", "Night walk with guide"],
        activities_nl: ["Dageraad vogels kijken", "Boomkronen wandeling en wildlife spotten", "Rivier expeditie", "Nachtwandeling met gids"]
      },
      {
        day: 4,
        title_en: "Final Exploration & Return",
        title_nl: "Laatste Verkenning & Terugkeer",
        description_en: "Last adventures before heading back to civilization",
        description_nl: "Laatste avonturen voordat we teruggaan naar de beschaving",
        activities_en: ["Final jungle hike", "Traditional craft making", "Farewell ceremony", "Return to Paramaribo"],
        activities_nl: ["Laatste jungle wandeling", "Traditioneel handwerk maken", "Afscheidsceremonie", "Terug naar Paramaribo"]
      }
    ],
    itinerary_nl: [
      {
        day: 1,
        title_en: "Journey to the Heart of Suriname",
        title_nl: "Reis naar het Hart van Suriname",
        description_en: "Travel from the capital to pristine wilderness",
        description_nl: "Reis van de hoofdstad naar ongerepte wildernis",
        activities_en: ["Departure from Paramaribo", "Scenic drive through interior", "Boat transfer to PingPe Resort", "Orientation and welcome dinner"],
        activities_nl: ["Vertrek vanuit Paramaribo", "Schilderachtige rit door het binnenland", "Boottransfer naar PingPe Resort", "Oriëntatie en welkomstdiner"]
      },
      {
        day: 2,
        title_en: "Cultural Immersion Day",
        title_nl: "Culturele Onderdompeling Dag",
        description_en: "Deep dive into Saramaccan culture and traditions",
        description_nl: "Diepe duik in Saramaccan cultuur en tradities",
        activities_en: ["Traditional village visit", "Learn about medicinal plants", "Participate in daily village life", "Traditional cooking class"],
        activities_nl: ["Traditioneel dorpsbezoek", "Leren over medicinale planten", "Deelnemen aan dagelijks dorpsleven", "Traditionele kookles"]
      },
      {
        day: 3,
        title_en: "Rainforest Adventure",
        title_nl: "Regenwoud Avontuur",
        description_en: "Explore the pristine Amazon rainforest",
        description_nl: "Verken het ongerepte Amazone regenwoud",
        activities_en: ["Dawn chorus bird watching", "Canopy walk and wildlife spotting", "River expedition", "Night walk with guide"],
        activities_nl: ["Dageraad vogels kijken", "Boomkronen wandeling en wildlife spotten", "Rivier expeditie", "Nachtwandeling met gids"]
      },
      {
        day: 4,
        title_en: "Final Exploration & Return",
        title_nl: "Laatste Verkenning & Terugkeer",
        description_en: "Last adventures before heading back to civilization",
        description_nl: "Laatste avonturen voordat we teruggaan naar de beschaving",
        activities_en: ["Final jungle hike", "Traditional craft making", "Farewell ceremony", "Return to Paramaribo"],
        activities_nl: ["Laatste jungle wandeling", "Traditioneel handwerk maken", "Afscheidsceremonie", "Terug naar Paramaribo"]
      }
    ],
    practical_info_en: "Good fitness level recommended. Waterproof clothing essential. Camera with protective case advised.",
    practical_info_nl: "Goede conditie aanbevolen. Waterdichte kleding essentieel. Camera met beschermhoes geadviseerd.",
    max_participants: 6,
    category: "cat-two cat-one cat-five",
    tag: "% Offer",
    featured: true,
    location: "Upper Suriname River",
    review: 5
  },
  {
    id: 3,
    slug: "extended-jungle-adventure",
    title_en: "Extended Jungle Adventure",
    title_nl: "Uitgebreide Jungle Avontuur",
    summary_en: "Five days of deep rainforest immersion for the adventurous traveler",
    summary_nl: "Vijf dagen diepe regenwoud onderdompeling voor de avontuurlijke reiziger",
    duration_days: 5,
    difficulty_level: 'challenging',
    price_eur: 580,
    featured_image: "/assets/img/listing/listing-3.jpg",
    gallery_images: [
      "/assets/img/tour-details/thumb-1.jpg",
      "/assets/img/tour-details/thumb-2.jpg"
    ],
    includes_en: [
      "All meals and jungle lodge accommodation",
      "Expert guide with wilderness training",
      "All equipment including safety gear",
      "Multi-village cultural exchanges",
      "Advanced wildlife tracking"
    ],
    includes_nl: [
      "Alle maaltijden en jungle lodge accommodatie",
      "Expert gids met wilderness training",
      "Alle uitrusting inclusief veiligheidsuitrusting",
      "Multi-dorp culturele uitwisselingen",
      "Geavanceerde wildlife tracking"
    ],
    excludes_en: [
      "International flights",
      "Personal gear (provided list)",
      "Medical insurance",
      "Emergency evacuation insurance"
    ],
    excludes_nl: [
      "Internationale vluchten",
      "Persoonlijke uitrusting (lijst verstrekt)",
      "Medische verzekering",
      "Evacuatie verzekering voor noodgevallen"
    ],
    itinerary_en: [
      {
        day: 1,
        title_en: "Deep Forest Entry",
        title_nl: "Diep Bos Toegang",
        description_en: "Begin the journey into untouched wilderness",
        description_nl: "Begin de reis in ongerepte wildernis",
        activities_en: ["Departure and river journey", "First village visit", "Jungle skills introduction", "Night sounds identification"],
        activities_nl: ["Vertrek en rivierreis", "Eerste dorpsbezoek", "Jungle vaardigheden introductie", "Nachtgeluiden identificatie"]
      },
      {
        day: 2,
        title_en: "Advanced Tracking",
        title_nl: "Geavanceerde Tracking",
        description_en: "Learn professional wildlife tracking techniques",
        description_nl: "Leer professionele wildlife tracking technieken",
        activities_en: ["Animal tracking workshop", "Survival skills training", "Traditional hunting methods", "Medicinal plant collection"],
        activities_nl: ["Dierensporen workshop", "Survival vaardigheden training", "Traditionele jachtmethoden", "Medicinale planten verzameling"]
      },
      {
        day: 3,
        title_en: "Remote Village Experience",
        title_nl: "Afgelegen Dorp Ervaring",
        description_en: "Stay with a remote traditional community",
        description_nl: "Verblijf bij een afgelegen traditionele gemeenschap",
        activities_en: ["Multi-day village immersion", "Traditional ceremonies", "Local craft mastery", "Story telling sessions"],
        activities_nl: ["Meerdaagse dorps onderdompeling", "Traditionele ceremonies", "Lokale ambacht meesterschap", "Verhalen vertelling sessies"]
      },
      {
        day: 4,
        title_en: "Wilderness Survival",
        title_nl: "Wildernis Overleving",
        description_en: "Advanced jungle survival and navigation",
        description_nl: "Geavanceerde jungle overleving en navigatie",
        activities_en: ["Wilderness navigation", "Emergency shelter building", "Water purification techniques", "Advanced animal observation"],
        activities_nl: ["Wildernis navigatie", "Noodschuilplaats bouwen", "Water zuivering technieken", "Geavanceerde dieren observatie"]
      },
      {
        day: 5,
        title_en: "Integration & Return",
        title_nl: "Integratie & Terugkeer",
        description_en: "Reflect on experiences and return journey",
        description_nl: "Reflecteer op ervaringen en terugreis",
        activities_en: ["Final ceremony", "Experience sharing", "Last wildlife spotting", "Return to civilization"],
        activities_nl: ["Laatste ceremonie", "Ervaring delen", "Laatste wildlife spotten", "Terug naar de beschaving"]
      }
    ],
    itinerary_nl: [
      {
        day: 1,
        title_en: "Deep Forest Entry",
        title_nl: "Diep Bos Toegang",
        description_en: "Begin the journey into untouched wilderness",
        description_nl: "Begin de reis in ongerepte wildernis",
        activities_en: ["Departure and river journey", "First village visit", "Jungle skills introduction", "Night sounds identification"],
        activities_nl: ["Vertrek en rivierreis", "Eerste dorpsbezoek", "Jungle vaardigheden introductie", "Nachtgeluiden identificatie"]
      },
      {
        day: 2,
        title_en: "Advanced Tracking",
        title_nl: "Geavanceerde Tracking",
        description_en: "Learn professional wildlife tracking techniques",
        description_nl: "Leer professionele wildlife tracking technieken",
        activities_en: ["Animal tracking workshop", "Survival skills training", "Traditional hunting methods", "Medicinal plant collection"],
        activities_nl: ["Dierensporen workshop", "Survival vaardigheden training", "Traditionele jachtmethoden", "Medicinale planten verzameling"]
      },
      {
        day: 3,
        title_en: "Remote Village Experience",
        title_nl: "Afgelegen Dorp Ervaring",
        description_en: "Stay with a remote traditional community",
        description_nl: "Verblijf bij een afgelegen traditionele gemeenschap",
        activities_en: ["Multi-day village immersion", "Traditional ceremonies", "Local craft mastery", "Story telling sessions"],
        activities_nl: ["Meerdaagse dorps onderdompeling", "Traditionele ceremonies", "Lokale ambacht meesterschap", "Verhalen vertelling sessies"]
      },
      {
        day: 4,
        title_en: "Wilderness Survival",
        title_nl: "Wildernis Overleving",
        description_en: "Advanced jungle survival and navigation",
        description_nl: "Geavanceerde jungle overleving en navigatie",
        activities_en: ["Wilderness navigation", "Emergency shelter building", "Water purification techniques", "Advanced animal observation"],
        activities_nl: ["Wildernis navigatie", "Noodschuilplaats bouwen", "Water zuivering technieken", "Geavanceerde dieren observatie"]
      },
      {
        day: 5,
        title_en: "Integration & Return",
        title_nl: "Integratie & Terugkeer",
        description_en: "Reflect on experiences and return journey",
        description_nl: "Reflecteer op ervaringen en terugreis",
        activities_en: ["Final ceremony", "Experience sharing", "Last wildlife spotting", "Return to civilization"],
        activities_nl: ["Laatste ceremonie", "Ervaring delen", "Laatste wildlife spotten", "Terug naar de beschaving"]
      }
    ],
    practical_info_en: "Excellent fitness required. Previous jungle experience recommended. Medical clearance advised.",
    practical_info_nl: "Uitstekende conditie vereist. Eerdere jungle ervaring aanbevolen. Medische goedkeuring geadviseerd.",
    max_participants: 4,
    category: "cat-four cat-three",
    tag: "New",
    location: "Remote Upper Suriname",
    review: 4
  },
  {
    id: 4,
    slug: "rainforest-immersion",
    title_en: "Rainforest Immersion",
    title_nl: "Regenwoud Onderdompeling",
    summary_en: "Ultimate 6-day expedition for nature enthusiasts and photographers",
    summary_nl: "Ultieme 6-daagse expeditie voor natuurliefhebbers en fotografen",
    duration_days: 6,
    difficulty_level: 'challenging',
    price_eur: 680,
    featured_image: "/assets/img/listing/listing-4.jpg",
    gallery_images: [
      "/assets/img/tour-details/thumb-1.jpg"
    ],
    includes_en: [
      "Premium eco-lodge accommodation",
      "Professional nature photographer guide",
      "All specialized equipment and gear",
      "Multiple village cultural programs",
      "Bird watching with expert ornithologist"
    ],
    includes_nl: [
      "Premium eco-lodge accommodatie",
      "Professionele natuurfotograaf gids",
      "Alle gespecialiseerde uitrusting en gear",
      "Meerdere dorp culturele programma's",
      "Vogels kijken met expert ornitholoog"
    ],
    excludes_en: [
      "International and domestic flights",
      "Photography equipment (can be rented)",
      "Comprehensive travel insurance",
      "Personal items and medications"
    ],
    excludes_nl: [
      "Internationale en binnenlandse vluchten",
      "Fotografie uitrusting (kan gehuurd worden)",
      "Uitgebreide reisverzekering",
      "Persoonlijke items en medicijnen"
    ],
    itinerary_en: [
      {
        day: 1,
        title_en: "Photography Expedition Begins",
        title_nl: "Fotografie Expeditie Begint",
        description_en: "Start your ultimate nature photography adventure",
        description_nl: "Begin je ultieme natuurfotografie avontuur",
        activities_en: ["Equipment check and orientation", "Golden hour photography session", "Night photography workshop"],
        activities_nl: ["Uitrusting check en oriëntatie", "Gouden uur fotografie sessie", "Nachtfotografie workshop"]
      },
      {
        day: 2,
        title_en: "Wildlife Photography Intensive",
        title_nl: "Wildlife Fotografie Intensief",
        description_en: "Master wildlife photography in natural habitat",
        description_nl: "Meester wildlife fotografie in natuurlijke habitat",
        activities_en: ["Dawn wildlife photography", "Macro photography techniques", "Behavioral photography training"],
        activities_nl: ["Dageraad wildlife fotografie", "Macro fotografie technieken", "Gedragsfotografie training"]
      },
      {
        day: 3,
        title_en: "Cultural Documentation",
        title_nl: "Culturele Documentatie",
        description_en: "Document traditional life and customs",
        description_nl: "Documenteer traditioneel leven en gebruiken",
        activities_en: ["Portrait photography ethics", "Daily life documentation", "Traditional ceremony photography"],
        activities_nl: ["Portretfotografie ethiek", "Dagelijks leven documentatie", "Traditionele ceremonie fotografie"]
      },
      {
        day: 4,
        title_en: "Advanced Birding",
        title_nl: "Geavanceerde Vogels Kijken",
        description_en: "Focus on rare and endemic bird species",
        description_nl: "Focus op zeldzame en endemische vogelsoorten",
        activities_en: ["Pre-dawn bird photography", "Nest behavior documentation", "Flight pattern capture"],
        activities_nl: ["Voor-dageraad vogelfotografie", "Nest gedrag documentatie", "Vliegpatroon vastleggen"]
      },
      {
        day: 5,
        title_en: "Landscape & Canopy",
        title_nl: "Landschap & Boomkronen",
        description_en: "Capture the majesty of pristine rainforest",
        description_nl: "Leg de majesteit van ongerept regenwoud vast",
        activities_en: ["Canopy photography expedition", "Waterfall and river systems", "Panoramic landscape work"],
        activities_nl: ["Boomkronen fotografie expeditie", "Waterval en rivier systemen", "Panoramische landschap werk"]
      },
      {
        day: 6,
        title_en: "Portfolio Review & Departure",
        title_nl: "Portfolio Review & Vertrek",
        description_en: "Review your work and plan future projects",
        description_nl: "Bekijk je werk en plan toekomstige projecten",
        activities_en: ["Portfolio critique session", "Image processing workshop", "Farewell presentations"],
        activities_nl: ["Portfolio kritiek sessie", "Beeldbewerking workshop", "Afscheid presentaties"]
      }
    ],
    itinerary_nl: [
      {
        day: 1,
        title_en: "Photography Expedition Begins",
        title_nl: "Fotografie Expeditie Begint",
        description_en: "Start your ultimate nature photography adventure",
        description_nl: "Begin je ultieme natuurfotografie avontuur",
        activities_en: ["Equipment check and orientation", "Golden hour photography session", "Night photography workshop"],
        activities_nl: ["Uitrusting check en oriëntatie", "Gouden uur fotografie sessie", "Nachtfotografie workshop"]
      },
      {
        day: 2,
        title_en: "Wildlife Photography Intensive",
        title_nl: "Wildlife Fotografie Intensief",
        description_en: "Master wildlife photography in natural habitat",
        description_nl: "Meester wildlife fotografie in natuurlijke habitat",
        activities_en: ["Dawn wildlife photography", "Macro photography techniques", "Behavioral photography training"],
        activities_nl: ["Dageraad wildlife fotografie", "Macro fotografie technieken", "Gedragsfotografie training"]
      },
      {
        day: 3,
        title_en: "Cultural Documentation",
        title_nl: "Culturele Documentatie",
        description_en: "Document traditional life and customs",
        description_nl: "Documenteer traditioneel leven en gebruiken",
        activities_en: ["Portrait photography ethics", "Daily life documentation", "Traditional ceremony photography"],
        activities_nl: ["Portretfotografie ethiek", "Dagelijks leven documentatie", "Traditionele ceremonie fotografie"]
      },
      {
        day: 4,
        title_en: "Advanced Birding",
        title_nl: "Geavanceerde Vogels Kijken",
        description_en: "Focus on rare and endemic bird species",
        description_nl: "Focus op zeldzame en endemische vogelsoorten",
        activities_en: ["Pre-dawn bird photography", "Nest behavior documentation", "Flight pattern capture"],
        activities_nl: ["Voor-dageraad vogelfotografie", "Nest gedrag documentatie", "Vliegpatroon vastleggen"]
      },
      {
        day: 5,
        title_en: "Landscape & Canopy",
        title_nl: "Landschap & Boomkronen",
        description_en: "Capture the majesty of pristine rainforest",
        description_nl: "Leg de majesteit van ongerept regenwoud vast",
        activities_en: ["Canopy photography expedition", "Waterfall and river systems", "Panoramic landscape work"],
        activities_nl: ["Boomkronen fotografie expeditie", "Waterval en rivier systemen", "Panoramische landschap werk"]
      },
      {
        day: 6,
        title_en: "Portfolio Review & Departure",
        title_nl: "Portfolio Review & Vertrek",
        description_en: "Review your work and plan future projects",
        description_nl: "Bekijk je werk en plan toekomstige projecten",
        activities_en: ["Portfolio critique session", "Image processing workshop", "Farewell presentations"],
        activities_nl: ["Portfolio kritiek sessie", "Beeldbewerking workshop", "Afscheid presentaties"]
      }
    ],
    practical_info_en: "Photography experience preferred. High fitness level required. Weather-dependent activities.",
    practical_info_nl: "Fotografie ervaring bij voorkeur. Hoge conditie vereist. Weer-afhankelijke activiteiten.",
    max_participants: 6,
    category: "cat-four",
    featured: true,
    location: "Pristine Rainforest",
    review: 5
  },
  {
    id: 5,
    slug: "back-to-basic-expedition",
    title_en: "Back-to-Basic Expedition",
    title_nl: "Terug-naar-de-Basis Expeditie",
    summary_en: "Authentic 3-day primitive camping experience with minimal modern amenities",
    summary_nl: "Authentieke 3-daagse primitieve kampeervaring met minimale moderne voorzieningen",
    duration_days: 3,
    difficulty_level: 'challenging',
    price_eur: 320,
    featured_image: "/assets/img/listing/listing-5.jpg",
    gallery_images: [
      "/assets/img/tour-details/thumb-1.jpg",
      "/assets/img/tour-details/thumb-2.jpg"
    ],
    includes_en: [
      "Basic camping equipment",
      "Experienced survival guide",
      "Traditional food preparation",
      "Survival skills training",
      "Emergency safety backup"
    ],
    includes_nl: [
      "Basis kampeerspullen",
      "Ervaren overlevingsgids",
      "Traditionele voedselbereiding",
      "Overlevingsvaardigheden training",
      "Noodgeval veiligheids backup"
    ],
    excludes_en: [
      "Luxury accommodations",
      "Modern conveniences",
      "Prepared meals",
      "Comfort items"
    ],
    excludes_nl: [
      "Luxe accommodaties",
      "Moderne gemakken",
      "Voorbereide maaltijden",
      "Comfort items"
    ],
    itinerary_en: [
      {
        day: 1,
        title_en: "Primitive Camp Setup",
        title_nl: "Primitieve Kamp Opzet",
        description_en: "Learn to create shelter using traditional methods",
        description_nl: "Leer onderdak maken met traditionele methoden",
        activities_en: ["Traditional shelter building", "Fire starting techniques", "Water source location", "Basic tool making"],
        activities_nl: ["Traditionele onderdak bouwen", "Vuur aanmaken technieken", "Waterbron locatie", "Basis gereedschap maken"]
      },
      {
        day: 2,
        title_en: "Survival Skills Intensive",
        title_nl: "Overlevingsvaardigheden Intensief",
        description_en: "Master essential jungle survival techniques",
        description_nl: "Meester essentiële jungle overlevingstechnieken",
        activities_en: ["Food foraging and identification", "Traditional hunting methods", "Natural medicine preparation", "Navigation without instruments"],
        activities_nl: ["Voedsel zoeken en identificatie", "Traditionele jachtmethoden", "Natuurlijke medicijn voorbereiding", "Navigatie zonder instrumenten"]
      },
      {
        day: 3,
        title_en: "Self-Reliance Challenge",
        title_nl: "Zelfvoorzienendheid Uitdaging",
        description_en: "Put your new skills to the test",
        description_nl: "Zet je nieuwe vaardigheden op de proef",
        activities_en: ["Solo survival challenge", "Group problem solving", "Reflection and integration", "Safe return to base"],
        activities_nl: ["Solo overlevingsuitdaging", "Groep probleem oplossen", "Reflectie en integratie", "Veilige terugkeer naar basis"]
      }
    ],
    itinerary_nl: [
      {
        day: 1,
        title_en: "Primitive Camp Setup",
        title_nl: "Primitieve Kamp Opzet",
        description_en: "Learn to create shelter using traditional methods",
        description_nl: "Leer onderdak maken met traditionele methoden",
        activities_en: ["Traditional shelter building", "Fire starting techniques", "Water source location", "Basic tool making"],
        activities_nl: ["Traditionele onderdak bouwen", "Vuur aanmaken technieken", "Waterbron locatie", "Basis gereedschap maken"]
      },
      {
        day: 2,
        title_en: "Survival Skills Intensive",
        title_nl: "Overlevingsvaardigheden Intensief",
        description_en: "Master essential jungle survival techniques",
        description_nl: "Meester essentiële jungle overlevingstechnieken",
        activities_en: ["Food foraging and identification", "Traditional hunting methods", "Natural medicine preparation", "Navigation without instruments"],
        activities_nl: ["Voedsel zoeken en identificatie", "Traditionele jachtmethoden", "Natuurlijke medicijn voorbereiding", "Navigatie zonder instrumenten"]
      },
      {
        day: 3,
        title_en: "Self-Reliance Challenge",
        title_nl: "Zelfvoorzienendheid Uitdaging",
        description_en: "Put your new skills to the test",
        description_nl: "Zet je nieuwe vaardigheden op de proef",
        activities_en: ["Solo survival challenge", "Group problem solving", "Reflection and integration", "Safe return to base"],
        activities_nl: ["Solo overlevingsuitdaging", "Groep probleem oplossen", "Reflectie en integratie", "Veilige terugkeer naar basis"]
      }
    ],
    practical_info_en: "Advanced fitness required. Previous outdoor experience essential. Medical clearance mandatory.",
    practical_info_nl: "Geavanceerde conditie vereist. Eerdere buiten ervaring essentieel. Medische goedkeuring verplicht.",
    max_participants: 6,
    category: "cat-one cat-five",
    location: "Remote Wilderness",
    review: 4
  }
];

export default tours_data;