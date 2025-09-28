import FeatureDetailsOne from "../components/features/feature-details-one"
import SEO from "../components/SEO"
import Wrapper from "../layouts/Wrapper"

const TourDetailMain = () => {
   return (
      <Wrapper>
         <SEO pageTitle={'Tour Details'} />
         <FeatureDetailsOne />
      </Wrapper>
   )
}

export default TourDetailMain