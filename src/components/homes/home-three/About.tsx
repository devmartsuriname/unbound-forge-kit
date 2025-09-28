import { Link } from "react-router-dom"
import Button from "../../common/Button"

const About = () => {
   return (
      <div className="tg-about-area pb-100">
         <div className="container">
            <div className="row">
               <div className="col-lg-3">
                  <div className="tg-about-thumb-wrap mb-30">
                     <img className="w-100 tg-round-15 mb-85 wow fadeInLeft" data-wow-delay=".3s" data-wow-duration=".7s" src="/assets/img/about/jungle-resort-1.jpg" alt="Jungle Resort PingPe rainforest view" />
                     <img className="tg-about-thumb-2 tg-round-15 wow fadeInLeft" data-wow-delay=".4s" data-wow-duration=".9s" src="/assets/img/about/jungle-guide-2.jpg" alt="Local guide with traditional canoe" />
                  </div>
               </div>
               <div className="col-lg-6 mb-30">
                  <div className="tg-about-content text-center">
                     <div className="tg-about-logo mb-30 wow fadeInUp" data-wow-delay=".3s" data-wow-duration=".5s">
                        <img src="/assets/img/about/pingpe-logo.png" alt="Jungle Resort PingPe logo" />
                     </div>
                     <div className="tg-about-section-title mb-25">
                        <h5 className="tg-section-subtitle wow fadeInUp" data-wow-delay=".4s" data-wow-duration=".6s">Authentic Jungle Experience</h5>
                        <h2 className="mb-15 wow fadeInUp" data-wow-delay=".5s" data-wow-duration=".7s">Why Choose Jungle Resort PingPe</h2>
                        <p className="wow fadeInUp" data-wow-delay=".6s" data-wow-duration=".8s">Experience authentic eco-tourism in the heart of Upper Suriname. 
                           Our expert local guides and community partnerships ensure safe, responsible adventures while 
                           directly supporting indigenous communities and rainforest conservation.</p>
                     </div>
                     <div className="tp-about-btn-wrap wow fadeInUp" data-wow-delay=".7s" data-wow-duration=".9s">
                         <Link to="/tours" className="tg-btn tg-btn-transparent tg-btn-switch-animation">
                            <Button text="Explore Our Tours" />
                        </Link>
                     </div>
                  </div>
               </div>
               <div className="col-lg-3">
                  <div className="tg-about-thumb-wrap  mb-30">
                     <img className="w-100 tg-round-15 mb-85 wow fadeInRight" data-wow-delay=".3s" data-wow-duration=".7s" src="/assets/img/about/village-visit-3.jpg" alt="Traditional village cultural experience" />
                     <img className="tg-about-thumb-4 tg-round-15 wow fadeInRight" data-wow-delay=".4s" data-wow-duration=".9s" src="/assets/img/about/wildlife-4.jpg" alt="Upper Suriname wildlife encounter" />
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default About