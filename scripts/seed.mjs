#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// Load environment variables
config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing required environment variables: VITE_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const seedData = {
  tours: [
    {
      slug: 'amazon-wildlife-expedition',
      title: 'Amazon Wildlife Expedition',
      title_nl: 'Amazone Wildlife Expeditie',
      description: 'Discover the incredible biodiversity of the Amazon rainforest on this 5-day expedition through pristine wilderness areas.',
      description_nl: 'Ontdek de ongelooflijke biodiversiteit van het Amazone regenwoud tijdens deze 5-daagse expeditie door ongerepte wildernis.',
      duration: '5 days / 4 nights',
      duration_nl: '5 dagen / 4 nachten',
      price: 1250.00,
      max_participants: 8,
      difficulty: 'moderate',
      featured_image: '/images/tours/amazon-expedition.jpg',
      includes: ['Professional guide', 'All meals', 'Accommodation', 'Transportation', 'Equipment'],
      includes_nl: ['Professionele gids', 'Alle maaltijden', 'Accommodatie', 'Transport', 'Uitrusting'],
      itinerary: [
        'Day 1: Arrival and jungle introduction',
        'Day 2: Wildlife tracking expedition',
        'Day 3: River exploration and fishing',
        'Day 4: Canopy walk and bird watching',
        'Day 5: Cultural visit and departure'
      ],
      itinerary_nl: [
        'Dag 1: Aankomst en jungle introductie',
        'Dag 2: Wildlife tracking expeditie',
        'Dag 3: Rivier verkenning en vissen',
        'Dag 4: Canopy walk en vogelkijken',
        'Dag 5: Cultureel bezoek en vertrek'
      ],
      sort_order: 1
    },
    {
      slug: 'jungle-survival-course',
      title: 'Jungle Survival Course',
      title_nl: 'Jungle Overlevingscursus',
      description: 'Learn essential jungle survival skills in this intensive 3-day course taught by experienced guides.',
      description_nl: 'Leer essentiële jungle overlevingsvaardigheden in deze intensieve 3-daagse cursus gegeven door ervaren gidsen.',
      duration: '3 days / 2 nights',
      duration_nl: '3 dagen / 2 nachten',
      price: 850.00,
      max_participants: 6,
      difficulty: 'challenging',
      featured_image: '/images/tours/survival-course.jpg',
      includes: ['Expert instructor', 'Survival gear', 'Basic meals', 'Shelter materials'],
      includes_nl: ['Expert instructeur', 'Overlevingsuitrusting', 'Basis maaltijden', 'Onderdak materialen'],
      itinerary: [
        'Day 1: Basic survival skills and shelter building',
        'Day 2: Water sourcing and fire making',
        'Day 3: Food finding and emergency signaling'
      ],
      itinerary_nl: [
        'Dag 1: Basis overlevingsvaardigheden en onderdak bouwen',
        'Dag 2: Water bronnen en vuur maken',
        'Dag 3: Voedsel vinden en noodsignalering'
      ],
      sort_order: 2
    },
    {
      slug: 'bird-watching-paradise',
      title: 'Bird Watching Paradise',
      title_nl: 'Vogelkijk Paradijs',
      description: 'Spot over 200 bird species in this peaceful 4-day bird watching tour through diverse habitats.',
      description_nl: 'Spot meer dan 200 vogelsoorten tijdens deze rustige 4-daagse vogelkijktour door diverse habitats.',
      duration: '4 days / 3 nights',
      duration_nl: '4 dagen / 3 nachten',
      price: 950.00,
      max_participants: 10,
      difficulty: 'easy',
      featured_image: '/images/tours/bird-watching.jpg',
      includes: ['Birding guide', 'Binoculars', 'Field guide', 'All meals', 'Accommodation'],
      includes_nl: ['Vogelgids', 'Verrekijker', 'Veldgids', 'Alle maaltijden', 'Accommodatie'],
      itinerary: [
        'Day 1: Forest birding and species identification',
        'Day 2: Wetland exploration',
        'Day 3: Canopy and understory birds',
        'Day 4: Final count and departure'
      ],
      itinerary_nl: [
        'Dag 1: Bos vogelkijken en soorten identificatie',
        'Dag 2: Wetland verkenning',
        'Dag 3: Canopy en ondergroei vogels',
        'Dag 4: Finale telling en vertrek'
      ],
      sort_order: 3
    }
  ],

  team_members: [
    {
      name: 'Carlos Rodriguez',
      role: 'Head Guide & Wildlife Expert',
      role_nl: 'Hoofdgids & Wildlife Expert',
      bio: 'With over 15 years of experience in the Amazon, Carlos leads our wildlife expeditions with unmatched expertise and passion for conservation.',
      bio_nl: 'Met meer dan 15 jaar ervaring in de Amazone leidt Carlos onze wildlife expedities met ongeëvenaarde expertise en passie voor natuurbehoud.',
      languages: ['English', 'Spanish', 'Portuguese', 'Dutch'],
      specialties: ['Wildlife Tracking', 'Jungle Navigation', 'Emergency First Aid', 'Photography'],
      specialties_nl: ['Wildlife Volgen', 'Jungle Navigatie', 'Eerste Hulp', 'Fotografie'],
      certifications: ['Wilderness First Aid', 'Professional Guide License', 'Wildlife Photography Certificate'],
      certifications_nl: ['Eerste Hulp in de Natuur', 'Professionele Gids Licentie', 'Wildlife Fotografie Certificaat'],
      sort_order: 1,
      photo_url: '/images/team/carlos.jpg'
    },
    {
      name: 'Maria Santos',
      role: 'Cultural Heritage Specialist',
      role_nl: 'Cultureel Erfgoed Specialist',
      bio: 'Maria bridges the gap between visitors and local indigenous communities with her deep cultural knowledge and respectful approach.',
      bio_nl: 'Maria overbrugt de kloof tussen bezoekers en lokale inheemse gemeenschappen met haar diepe culturele kennis en respectvolle benadering.',
      languages: ['English', 'Spanish', 'Sranan Tongo', 'Dutch'],
      specialties: ['Cultural Interpretation', 'Traditional Medicine', 'Handicrafts', 'Storytelling'],
      specialties_nl: ['Culturele Interpretatie', 'Traditionele Geneeskunde', 'Handwerk', 'Verhalen vertellen'],
      certifications: ['Cultural Guide Certification', 'Indigenous Studies Degree', 'Medicinal Plants Certificate'],
      certifications_nl: ['Culturele Gids Certificering', 'Inheemse Studies Diploma', 'Geneeskrachtige Planten Certificaat'],
      sort_order: 2,
      photo_url: '/images/team/maria.jpg'
    },
    {
      name: 'Johan van Berg',
      role: 'Adventure Coordinator',
      role_nl: 'Avontuur Coördinator',
      bio: 'Johan ensures every adventure is perfectly planned and executed with safety as the top priority and guest satisfaction as the goal.',
      bio_nl: 'Johan zorgt ervoor dat elk avontuur perfect gepland en uitgevoerd wordt met veiligheid als topprioriteit en gasttevredenheid als doel.',
      languages: ['Dutch', 'English', 'German'],
      specialties: ['Risk Management', 'Group Coordination', 'Equipment Specialist', 'Route Planning'],
      specialties_nl: ['Risicomanagement', 'Groep Coördinatie', 'Uitrusting Specialist', 'Route Planning'],
      certifications: ['Outdoor Recreation Leadership', 'Safety Management Certificate', 'Rescue Operations'],
      certifications_nl: ['Outdoor Recreatie Leiderschap', 'Veiligheidsmanagement Certificaat', 'Reddingsoperaties'],
      sort_order: 3,
      photo_url: '/images/team/johan.jpg'
    },
    {
      name: 'Ana Morales',
      role: 'Naturalist & Photographer',
      role_nl: 'Natuuronderzoeker & Fotograaf',
      bio: 'Ana captures the beauty of nature while educating guests about rainforest ecosystems and conservation efforts.',
      bio_nl: 'Ana legt de schoonheid van de natuur vast terwijl ze gasten onderwijst over regenwoud ecosystemen en natuurbehoud inspanningen.',
      languages: ['Spanish', 'English', 'Dutch'],
      specialties: ['Nature Photography', 'Botany', 'Environmental Education', 'Research'],
      specialties_nl: ['Natuurfotografie', 'Plantkunde', 'Milieu Educatie', 'Onderzoek'],
      certifications: ['Professional Photography Certificate', 'Biology Degree', 'Environmental Educator License'],
      certifications_nl: ['Professionele Fotografie Certificaat', 'Biologie Diploma', 'Milieu Educator Licentie'],
      sort_order: 4,
      photo_url: '/images/team/ana.jpg'
    }
  ],

  faqs: [
    {
      category: 'booking',
      question: 'How far in advance should I book my tour?',
      question_nl: 'Hoe ver van tevoren moet ik mijn tour boeken?',
      answer: 'We recommend booking at least 2-3 months in advance, especially for peak season (June-August) and holidays.',
      answer_nl: 'We raden aan om minstens 2-3 maanden van tevoren te boeken, vooral voor het hoogseizoen (juni-augustus) en feestdagen.',
      sort_order: 1
    },
    {
      category: 'booking',
      question: 'What is your cancellation policy?',
      question_nl: 'Wat is jullie annuleringsbeleid?',
      answer: 'Free cancellation up to 30 days before departure. 50% refund between 30-14 days, no refund within 14 days of departure.',
      answer_nl: 'Gratis annulering tot 30 dagen voor vertrek. 50% terugbetaling tussen 30-14 dagen, geen terugbetaling binnen 14 dagen voor vertrek.',
      sort_order: 2
    },
    {
      category: 'preparation',
      question: 'What should I pack for my jungle expedition?',
      question_nl: 'Wat moet ik inpakken voor mijn jungle expeditie?',
      answer: 'Essential items include insect repellent, long-sleeved clothing, waterproof gear, sturdy hiking boots, and a good camera.',
      answer_nl: 'Essentiële items zijn insectenspray, kleding met lange mouwen, waterdichte uitrusting, stevige wandelschoenen en een goede camera.',
      sort_order: 1
    },
    {
      category: 'preparation',
      question: 'Do I need any vaccinations?',
      question_nl: 'Heb ik vaccinaties nodig?',
      answer: 'Yellow fever vaccination is recommended. Consult your doctor about malaria prophylaxis and other travel vaccines 4-6 weeks before travel.',
      answer_nl: 'Gele koorts vaccinatie wordt aanbevolen. Raadpleeg uw arts over malaria profylaxe en andere reisvaccinaties 4-6 weken voor vertrek.',
      sort_order: 2
    },
    {
      category: 'experience',
      question: 'What wildlife can I expect to see?',
      question_nl: 'Welke wilde dieren kan ik verwachten te zien?',
      answer: 'You may spot howler monkeys, sloths, exotic birds, colorful butterflies, and if lucky, jaguars or river dolphins.',
      answer_nl: 'Je kunt brulapen, luiaards, exotische vogels, kleurrijke vlinders en met geluk jaguars of rivierdolfijnen spotten.',
      sort_order: 1
    },
    {
      category: 'health',
      question: 'Is the drinking water safe?',
      question_nl: 'Is het drinkwater veilig?',
      answer: 'We provide filtered and purified water throughout your stay. Avoid drinking from natural sources without proper treatment.',
      answer_nl: 'We bieden gefilterd en gezuiverd water tijdens uw verblijf. Vermijd drinken uit natuurlijke bronnen zonder juiste behandeling.',
      sort_order: 1
    }
  ]
};

async function seedDatabase() {
  console.log('🌱 Starting database seeding...');

  try {
    // Seed tours
    console.log('📚 Inserting tours...');
    const { error: toursError } = await supabase
      .from('tours')
      .upsert(seedData.tours, { onConflict: 'slug' });
    
    if (toursError) {
      console.error('Error inserting tours:', toursError);
    } else {
      console.log(`✅ Inserted ${seedData.tours.length} tours`);
    }

    // Seed team members
    console.log('👥 Inserting team members...');
    const { error: teamError } = await supabase
      .from('team_members')
      .upsert(seedData.team_members, { onConflict: 'name' });
    
    if (teamError) {
      console.error('Error inserting team members:', teamError);
    } else {
      console.log(`✅ Inserted ${seedData.team_members.length} team members`);
    }

    // Seed FAQs
    console.log('❓ Inserting FAQs...');
    const { error: faqsError } = await supabase
      .from('faqs')
      .upsert(seedData.faqs);
    
    if (faqsError) {
      console.error('Error inserting FAQs:', faqsError);
    } else {
      console.log(`✅ Inserted ${seedData.faqs.length} FAQs`);
    }

    console.log('🎉 Database seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  }
}

// Run the seeding
seedDatabase();