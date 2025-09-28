import { type JSX, useState } from "react";
import BannerFormTwo from "./BannerFormTwo";

interface TabData {
   title: string;
   icon: JSX.Element;
}

const tab_title: TabData[] = [
   {
      icon: (<> <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M16.5 2.5L8.8 10.2M16.5 2.5L11.6 16.5L8.8 10.2M16.5 2.5L2.5 7.4L8.8 10.2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
      </svg></>),
      title: "Tour",
   },
   {
      icon: (<><svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M16.5 1.5L10.0227 8.625L6.61364 4.875L1.5 10.5M16.5 1.5H12.4091M16.5 1.5L16.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg></>),
      title: "Activity",
   },
];

const form_data: number[] = [1, 2];

const BannerFormThree = () => {

   const [activeTab, setActiveTab] = useState(0);

   // Handle tab click event
   const handleTabClick = (index: number) => {
      setActiveTab(index);
   };

   return (
      <div className="tg-booking-form-area tg-booking-form-space pb-105">
         <div className="container">
            <div className="row">
               <div className="col-lg-12">
                  <div className="tg-booking-form-wrap">
                     <div className="tg-booking-form-tabs">
                        <div className="nav nav-tab justify-content-center" id="nav-tab" role="tablist">
                           {tab_title.map((tab, index) => (
                              <button key={index} className={`nav-link ${activeTab === index ? "active" : ""}`} onClick={() => handleTabClick(index)} id="nav-platform-tab">
                                 <span className="borders"></span>
                                 <span className="icon">{tab.icon}</span>
                                 <span>{tab.title}</span>
                              </button>
                           ))}
                        </div>
                     </div>
                     <div className="tab-content" id="nav-tabContent">
                        {form_data.map((item, index) => (
                           <div key={item} className={`tab-pane fade ${activeTab === index ? 'show active' : ''}`} id="nav-platform">
                              <div className="tg-booking-form-item">
                                 <BannerFormTwo />
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default BannerFormThree
