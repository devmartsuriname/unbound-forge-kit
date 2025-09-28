import SEO from "../components/SEO"
import Wrapper from "../layouts/Wrapper"

const GalleryMain = () => {
   return (
      <Wrapper>
         <SEO pageTitle={'Gallery'} />
         <div className="gallery-area pt-120 pb-120">
            <div className="container">
               <div className="row">
                  <div className="col-12">
                     <div className="text-center">
                        <h2>Gallery</h2>
                        <p>Coming soon - Jungle wildlife, resort facilities, and tour experiences</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Wrapper>
   )
}

export default GalleryMain