import tours_data, { type TourData } from './ToursData';

// Convert tour data to listing format for compatibility with existing components
interface ListingDataType {
   id: number;
   page: string;
   thumb: string;
   tag?: string;
   featured?: string;
   time: string;
   guest?: string;
   title: string;
   location: string;
   delete_price?: number;
   price: number;
   review: number;
   total_review?: string;
   country?: string;
   recommended?: string;
   category?: string;
}

// Transform tours_data to listing format for home page display
const ping_pe_listing_data: ListingDataType[] = tours_data.map((tour: TourData) => ({
   id: tour.id,
   page: "home_3",
   thumb: tour.featured_image,
   tag: tour.tag,
   featured: tour.featured ? "Featured" : undefined,
   time: `${tour.duration_days} Days`,
   title: tour.title_en, // Use English by default, can be swapped based on language
   location: tour.location,
   price: tour.price_eur,
   review: tour.review,
   category: tour.category
}));

export default ping_pe_listing_data;
export type { ListingDataType };