import { useState } from "react";
import tours_data from "../data/ToursData";

const UseTours = () => {
   const [tours, setTours] = useState(tours_data);
   
   return {
      tours,
      setTours
   }
}

export default UseTours;