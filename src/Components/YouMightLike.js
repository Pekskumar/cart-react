import React, { useEffect } from "react";
import SingleCard from "./SingleCard";
import { useNavigate } from "react-router-dom";

const YouMightLike = (props) => {
  let navigate = useNavigate();
  function fnClickCardData(data) {
    navigate(`/product-detail/${data.id}`);
  }

  return (
    <section className="trending you-might-like-section">
      <div className="heading">
        <h2>You Might Like</h2>
      </div>
      <div className="container">
        <div className="trending-content">
          {props?.data
            ?.filter((f) => f.category === "skincare")
            .map(
              (item, index) =>
                index < 4 && (
                  <SingleCard key={index} data={item} fnClickCardData={fnClickCardData} />
                )
            )}
        </div>
      </div>
    </section>
  );
};

export default YouMightLike;
