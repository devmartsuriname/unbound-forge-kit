import { Link } from "react-router-dom";
import Choose4 from "../../../svg/home-one/Choose4";
import Choose5 from "../../../svg/home-one/Choose5";
import Button from "../../common/Button";

const Choose = () => {
   return (
      <div className="tg-chose-area p-relative pt-135 pb-100">
         <img className="tg-chose-shape p-absolute" src="/assets/img/chose/chose-shape-2.png" alt="shape" />
         <div className="container">
            <div className="row">
               <div className="col-lg-5">
                  <div className="tg-chose-content mb-25">
                      <div className="tg-chose-section-title mb-30">
                         <h5 className="tg-section-subtitle mb-15 wow fadeInUp" data-wow-delay=".3s" data-wow-duration=".1s">Discover What Makes Us Different</h5>
                         <h2 className="mb-15 text-capitalize wow fadeInUp" data-wow-delay=".4s" data-wow-duration=".9s">authentic jungle experiences<br /> with local expertise</h2>
                         <p className="text-capitalize wow fadeInUp" data-wow-delay=".5s" data-wow-duration=".9s">Experience the pristine rainforest of Upper Suriname with expert local guides. 
                            Our community partnerships ensure authentic adventures while supporting 
                            indigenous conservation efforts and responsible eco-tourism.</p>
                      </div>
                     <div className="tg-chose-list-wrap">
                        <div className="tg-chose-list d-flex mb-15 wow fadeInUp" data-wow-delay=".6s" data-wow-duration=".9s">
                           <span className="tg-chose-list-icon mr-20">
                              <Choose4 />
                           </span>
                            <div className="tg-chose-list-content">
                               <h4 className="tg-chose-list-title mb-5">Expert Local Guides</h4>
                               <p>Our certified indigenous guides provide authentic cultural 
                                  insights and ensure safe rainforest navigation.</p>
                            </div>
                        </div>
                        <div className="tg-chose-list d-flex mb-40 wow fadeInUp" data-wow-delay=".7s" data-wow-duration=".9s">
                           <span className="tg-chose-list-icon mr-20">
                              <Choose5 />
                           </span>
                            <div className="tg-chose-list-content">
                               <h4 className="tg-chose-list-title mb-5">Safe & Sustainable Tourism</h4>
                               <p>Comprehensive safety protocols and eco-friendly practices
                                  that protect both visitors and pristine environments.</p>
                            </div>
                        </div>
                         <div className="tg-chose-btn wow fadeInUp" data-wow-delay=".8s" data-wow-duration=".9s">
                            <Link to="/tours" className="tg-btn tg-btn-switch-animation">
                               <Button text="Explore Our Tours" />
                            </Link>
                         </div>
                     </div>
                  </div>
               </div>

               <div className="col-lg-7">
                  <div className="tg-chose-right mb-25">
                     <div className="row">
                        <div className="col-lg-3 col-md-6">
                           <div className="tg-chose-thumb">
                              <img className="tg-chose-shape-2 mb-30 ml-15 d-none d-lg-block" src="/assets/img/chose/chose-shape.png" alt="shape" />
                              <img className="w-100 wow fadeInRight" data-wow-delay=".4s" data-wow-duration=".9s" src="/assets/img/chose/chose.png" alt="chose" />
                           </div>
                        </div>
                        <div className="col-lg-9 col-md-6">
                           <div className="tg-chose-thumb-inner p-relative">
                              <div className="tg-chose-thumb-2 wow fadeInRight" data-wow-delay=".5s" data-wow-duration=".9s">
                                 <img className="w-100 tg-round-15" src="/assets/img/chose/jungle-resort-pingpe-experience.jpg" alt="PingPe Jungle Experience" />
                              </div>
                              <div className="tg-chose-big-text d-none d-xl-block">
                                 <h2 data-text="TRAVEL">TRAVEL</h2>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Choose
