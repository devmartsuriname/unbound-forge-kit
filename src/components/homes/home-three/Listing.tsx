/* eslint-disable @typescript-eslint/no-explicit-any */;
import { type JSX, useEffect, useRef, useState } from "react";
import Isotope from "isotope-layout";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux"
import { addToWishlist } from "../../../redux/features/wishlistSlice";
import ping_pe_listing_data from "../../../data/PingPeListingData";

interface TabData {
   title: string;
   icon: JSX.Element;
   category: string;
}

const tab_title: TabData[] = [
   {
      icon: (<><svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M16.5 1.5L10.0227 8.625L6.61364 4.875L1.5 10.5M16.5 1.5H12.4091M16.5 1.5L16.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg></>),
      title: "Activity",
      category: "cat-activity",
   },
];

const Listing = () => {

   const isotope = useRef<Isotope | null>(null);
   const [filterKey, setFilterKey] = useState("*");

   useEffect(() => {
      if (typeof window !== "undefined") {
         isotope.current = new Isotope(".isotope-wrapper", {
            itemSelector: ".isotope-filter-item",
            layoutMode: "fitRows",
         });

         // Cleanup
         return () => {
            isotope.current?.destroy();
         };
      }
   }, []);

   // Handling filter key change
   useEffect(() => {
      if (filterKey === "*") isotope.current?.arrange?.({ filter: "*" });
      else isotope.current?.arrange?.({ filter: `.${filterKey}` });
   }, [filterKey]);

   const [selectedFilter, setSelectedFilter] = useState("*");

   const handleFilterKeyChange = (key: string) => () => {
      setFilterKey(key);
      setSelectedFilter(key);
   };

   const dispatch = useDispatch();
   // add to wishlist
   const handleAddToWishlist = (item: any) => {
      dispatch(addToWishlist(item));
   };

   return (
      <div className="tg-listing-area tg-grey-bg pt-140 pb-110 p-relative z-index-9">
         <img className="tg-listing-shape d-none d-lg-block" src="/assets/img/listing/about-shape.png" alt="" />
         <img className="tg-listing-shape-2 d-none d-xl-block" src="/assets/img/listing/about-shape-2.png" alt="" />
         <img className="tg-listing-shape-3 d-none d-lg-block" src="/assets/img/listing/about-shape-3.png" alt="" />
         <div className="container">
            <div className="row">
               <div className="col-12">
                   <div className="tg-listing-section-title text-center mb-35">
                      <h5 className="tg-section-subtitle wow fadeInUp" data-wow-delay=".3s" data-wow-duration=".5s">Adventure Awaits in the Rainforest</h5>
                      <h2 className="mb-15 wow fadeInUp" data-wow-delay=".4s" data-wow-duration=".6s">Our Jungle Expeditions</h2>
                   </div>
               </div>
               <div className="col-lg-12">
                  <div className="tg-listing-menu-nav project__menu-nav mb-40 wow fadeInUp" data-wow-delay=".5s" data-wow-duration=".9s">
                     <button className={selectedFilter === "*" ? "active" : ""} onClick={handleFilterKeyChange("*")} data-filter="*">
                        <span className="borders"></span>
                        <span className="icon">
                           <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M16.5 2.5L8.8 10.2M16.5 2.5L11.6 16.5L8.8 10.2M16.5 2.5L2.5 7.4L8.8 10.2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                           </svg>
                        </span>
                        <span>Tour</span>
                     </button>
                     {tab_title.map((item, i) => (
                        <button key={i} className={selectedFilter === item.category ? "active" : ""} onClick={handleFilterKeyChange(item.category)}>
                           <span className="borders"></span>
                           <span className="icon">{item.icon}</span>
                           <span>{item.title}</span>
                        </button>
                     ))}
                  </div>
               </div>
            </div>
            <div className="row isotope-wrapper project-active-two">
               {ping_pe_listing_data.map((item) => (
                  <div key={item.id} className={`col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12 grid-item grid-sizer ${item.category} isotope-filter-item`}>
                     <div className="tg-listing-card-item mb-30">
                         <div className="tg-listing-card-thumb fix mb-15 p-relative">
                            <Link to="/tours">
                              <img className="tg-card-border w-100" src={item.thumb} alt="listing" />
                              {item.tag && <span className="tg-listing-item-price-discount shape">{item.tag}</span>}
                              {item.featured &&
                                 <span className="tg-listing-item-price-discount shape-3">
                                    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M6.60156 1L0.601562 8.2H6.00156L5.40156 13L11.4016 5.8H6.00156L6.60156 1Z" stroke="white" strokeWidth="0.857143" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    {item.featured}
                                 </span>}
                           </Link>
                           <div className="tg-listing-item-wishlist">
                              <a onClick={() => handleAddToWishlist(item)} style={{ cursor: "pointer" }}>
                                 <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.5167 16.3416C10.2334 16.4416 9.76675 16.4416 9.48341 16.3416C7.06675 15.5166 1.66675 12.075 1.66675 6.24165C1.66675 3.66665 3.74175 1.58331 6.30008 1.58331C7.81675 1.58331 9.15841 2.31665 10.0001 3.44998C10.8417 2.31665 12.1917 1.58331 13.7001 1.58331C16.2584 1.58331 18.3334 3.66665 18.3334 6.24165C18.3334 12.075 12.9334 15.5166 10.5167 16.3416Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                 </svg>
                              </a>
                           </div>
                        </div>
                        <div className="tg-listing-card-content">
                           <h4 className="tg-listing-card-title"><Link to="/tours">{item.title}</Link></h4>
                           <div className="tg-listing-card-duration-tour">
                              <span className="tg-listing-card-duration-map mb-5">
                                 <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.3329 6.7071C12.3329 11.2324 6.55512 15.1111 6.55512 15.1111C6.55512 15.1111 0.777344 11.2324 0.777344 6.7071C0.777344 5.16402 1.38607 3.68414 2.46962 2.59302C3.55316 1.5019 5.02276 0.888916 6.55512 0.888916C8.08748 0.888916 9.55708 1.5019 10.6406 2.59302C11.7242 3.68414 12.3329 5.16402 12.3329 6.7071Z" stroke="currentColor" strokeWidth="1.15556" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M6.55512 8.64649C7.61878 8.64649 8.48105 7.7782 8.48105 6.7071C8.48105 5.636 7.61878 4.7677 6.55512 4.7677C5.49146 4.7677 4.6292 5.636 4.6292 6.7071C4.6292 7.7782 5.49146 8.64649 6.55512 8.64649Z" stroke="currentColor" strokeWidth="1.15556" strokeLinecap="round" strokeLinejoin="round" />
                                 </svg>
                                 {item.location}
                              </span>
                              <span className="tg-listing-card-duration-time">
                                 <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.00175 3.73329V7.99996L10.8462 9.42218M15.1128 8.00003C15.1128 11.9274 11.9291 15.1111 8.00174 15.1111C4.07438 15.1111 0.890625 11.9274 0.890625 8.00003C0.890625 4.07267 4.07438 0.888916 8.00174 0.888916C11.9291 0.888916 15.1128 4.07267 15.1128 8.00003Z" stroke="currentColor" strokeWidth="1.06667" strokeLinecap="round" strokeLinejoin="round" />
                                 </svg>
                                 {item.time}
                              </span>
                           </div>
                        </div>
                        <div className="tg-listing-card-price d-flex align-items-end justify-content-between">
                           <div className="tg-listing-card-price-wrap price-bg d-flex align-items-center">
                               <span className="tg-listing-card-currency-amount mr-5">
                                  {item.delete_price && <del className="tg-listing-card-currency-old">€{item.delete_price}</del>}
                                  <span className="currency-symbol">€</span>{item.price}
                               </span>
                               <span className="tg-listing-card-activity-person">/Person</span>
                           </div>
                           <div className="tg-listing-card-review space">
                              <span className="tg-listing-rating-icon"><i className="fa-sharp fa-solid fa-star"></i></span>
                              <span className="tg-listing-rating-percent">({item.review} Reviews)</span>
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}

export default Listing
