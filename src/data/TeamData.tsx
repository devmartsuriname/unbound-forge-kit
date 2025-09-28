interface DataType {
   id: number;
   thum: string;
   title: string;
   designation: string;
   specialty?: string;
   languages?: string[];
   experience?: string;
}

const team_data: DataType[] = [
   {
      id: 1,
      thum: "/assets/img/team/member.png",
      title: "Marcus Amafo",
      designation: "Head Guide",
      specialty: "Jungle & Wildlife Specialist",
      languages: ["English", "Dutch", "Sranan Tongo"],
      experience: "15+ years rainforest guiding"
   },
   {
      id: 2,
      thum: "/assets/img/team/member-2.png",
      title: "Sarina Kajaman",
      designation: "Cultural Guide",
      specialty: "Community Liaison & Indigenous Culture",
      languages: ["English", "Dutch", "Saramaccan", "Aucan"],
      experience: "10+ years cultural tourism"
   },
   {
      id: 3,
      thum: "/assets/img/team/member-3.png",
      title: "Robert Tjoe",
      designation: "Operations Manager",
      specialty: "Safety & Logistics Coordinator",
      languages: ["English", "Dutch", "Chinese"],
      experience: "12+ years expedition management"
   },
   {
      id: 4,
      thum: "/assets/img/team/member-4.png",
      title: "Melanie Pawiroredjo",
      designation: "Community Coordinator",
      specialty: "Village Partnerships & Sustainability",
      languages: ["English", "Dutch", "Javanese"],
      experience: "8+ years community development"
   },
   {
      id: 5,
      thum: "/assets/img/team/member-5.png",
      title: "Devon Kasanpawiro",
      designation: "Nature Guide",
      specialty: "Medicinal Plants & Botany",
      languages: ["English", "Dutch", "Sranan Tongo"],
      experience: "6+ years botanical expertise"
   },
   {
      id: 6,
      thum: "/assets/img/team/member-6.png",
      title: "Theresa Waigaman",
      designation: "River Guide",
      specialty: "Canoe Navigation & River Ecology",
      languages: ["English", "Dutch", "Wayana"],
      experience: "9+ years river expeditions"
   },
   {
      id: 7,
      thum: "/assets/img/team/member-7.png",
      title: "Wade Aromana",
      designation: "Wildlife Specialist",
      specialty: "Bird Watching & Animal Tracking",
      languages: ["English", "Dutch", "Portuguese"],
      experience: "11+ years wildlife research"
   },
   {
      id: 8,
      thum: "/assets/img/team/member.png",
      title: "Ronald Karta",
      designation: "Adventure Guide",
      specialty: "Trekking & Survival Skills",
      languages: ["English", "Dutch", "Spanish"],
      experience: "7+ years adventure tourism"
   },
]

export default team_data;