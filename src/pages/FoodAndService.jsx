import FSheader_Content from "../components/Foodandservice/FSheader";
import FContent from "../components/Foodandservice/FContent";
import SContent from "../components/Foodandservice/SContent";
import { useState } from 'react';
const FoodAndService = () => {
  const [getPage, setPage] = useState("1")
  return (
    <div>
      <FSheader_Content setPage={setPage} />
      {getPage === "1" && <FContent />}
      {getPage === "2" && <SContent />}
    </div>
  );
};
export default FoodAndService;
