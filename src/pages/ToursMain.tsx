import FeatureThree from "../components/features/feature-three"
import SEO from "../components/SEO"
import Wrapper from "../layouts/Wrapper"

const ToursMain = () => {
   return (
      <Wrapper>
         <SEO pageTitle={'Tours'} />
         <FeatureThree />
      </Wrapper>
   )
}

export default ToursMain