interface FaqData {
   id: number;
   title: string;
   desc: string;
   showAnswer: boolean;
   category: 'preparation' | 'booking' | 'experience' | 'logistics';
};

const faq_data: FaqData[] = [
   // Preparation & Planning
   {
      id: 1,
      title: "What should I pack for a jungle tour in Suriname?",
      desc: "Essential items include lightweight, long-sleeved clothing, waterproof gear, insect repellent, sturdy hiking boots, hat, sunscreen, and a good flashlight. We provide detailed packing lists upon booking and can advise on specific items based on your chosen tour.",
      showAnswer: false,
      category: 'preparation'
   },
   {
      id: 2,
      title: "Do I need vaccinations or special health preparations?",
      desc: "Yellow fever vaccination is required for entry to Suriname. We recommend consulting your travel medicine clinic 4-6 weeks before departure for malaria prophylaxis and other recommended vaccinations. Our team can provide health preparation guidelines specific to your tour.",
      showAnswer: false,
      category: 'preparation'
   },
   
   // Booking & Pricing
   {
      id: 3,
      title: "How much does a private jungle tour cost?",
      desc: "Private tour prices vary based on duration, group size, and activities included. Our 3-day private tours start from $450 per person (group of 4+), while 7-day expeditions range from $1,200-1,800 per person. Contact us for custom pricing based on your specific requirements.",
      showAnswer: false,
      category: 'booking'
   },
   {
      id: 4,
      title: "Can we customize our jungle tour package?",
      desc: "Absolutely! We specialize in tailor-made experiences. Whether you want to focus on wildlife photography, cultural immersion, medicinal plants, or adventure activities, we can create a personalized itinerary that matches your interests, fitness level, and time constraints.",
      showAnswer: false,
      category: 'booking'
   },
   {
      id: 5,
      title: "What is your cancellation and refund policy?",
      desc: "Full refund for cancellations 30+ days before departure. 50% refund for 15-29 days notice. No refund for cancellations within 14 days, except for medical emergencies with documentation. We strongly recommend travel insurance for unexpected circumstances.",
      showAnswer: false,
      category: 'booking'
   },
   
   // Tour Experience
   {
      id: 6,
      title: "What wildlife can we expect to see during the tours?",
      desc: "Suriname's rainforest hosts incredible biodiversity including jaguars, giant river otters, howler monkeys, colorful birds like toucans and parrots, caimans, and countless butterfly species. While wildlife sightings can never be guaranteed, our expert guides know the best locations and times for optimal viewing opportunities.",
      showAnswer: false,
      category: 'experience'
   },
   {
      id: 7,
      title: "How physically demanding are the jungle tours?",
      desc: "We offer tours for all fitness levels. Easy tours involve mostly boat travel and short walks. Moderate tours include 2-4 hours of hiking daily. Challenging expeditions may involve 6+ hours of trekking through dense jungle. We'll match the tour difficulty to your group's capabilities.",
      showAnswer: false,
      category: 'experience'
   },
   {
      id: 8,
      title: "Will we visit local indigenous communities?",
      desc: "Many of our tours include respectful visits to Saramaccan, Aucan, or Wayana communities. These cultural exchanges are arranged with community consent and provide insight into traditional lifestyles while directly benefiting local families through tourism revenue and cultural exchange.",
      showAnswer: false,
      category: 'experience'
   },
   
   // Logistics
   {
      id: 9,
      title: "Where do tours typically start and end?",
      desc: "Most tours begin in Paramaribo with transport to various jungle locations. Popular starting points include Atjoni (for Upper Suriname River), Kajana (for Central Suriname Nature Reserve), or Albina (for Marowijne River). All transportation from Paramaribo is included in tour packages.",
      showAnswer: false,
      category: 'logistics'
   },
   {
      id: 10,
      title: "What type of accommodation is provided during tours?",
      desc: "Accommodation varies by tour: traditional Maroon village guesthouses, jungle lodges with basic amenities, or camping in waterproof tents. All options include mosquito nets and are safe and clean. We can arrange more comfortable accommodations for those preferring upgraded options.",
      showAnswer: false,
      category: 'logistics'
   },
   {
      id: 11,
      title: "Are meals included and do you accommodate dietary restrictions?",
      desc: "All meals are included featuring local cuisine, fresh fish, tropical fruits, and traditional dishes. We can accommodate vegetarian, vegan, and most dietary restrictions with advance notice. Drinking water and basic beverages are provided throughout the tour.",
      showAnswer: false,
      category: 'logistics'
   },
   {
      id: 12,
      title: "Is there mobile phone coverage and WiFi in the jungle?",
      desc: "Mobile coverage is very limited or non-existent in most jungle areas. Some lodges may have satellite internet, but connectivity should not be expected. We recommend informing family/friends of your tour dates and using this as an opportunity to truly disconnect and immerse in nature.",
      showAnswer: false,
      category: 'logistics'
   }
];

export default faq_data;