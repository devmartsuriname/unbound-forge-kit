import SEO from "../components/SEO"
import Wrapper from "../layouts/Wrapper"

const ScheduleMain = () => {
   return (
      <Wrapper>
         <SEO pageTitle={'Schedule'} />
         <div className="schedule-area pt-120 pb-120">
            <div className="container">
               <div className="row">
                  <div className="col-12">
                     <div className="text-center">
                        <h2>Tour Schedule</h2>
                        <p>Coming soon - Monthly departure calendar and seasonal availability</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Wrapper>
   )
}

export default ScheduleMain