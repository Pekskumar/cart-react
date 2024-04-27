import React from "react";
import { useNavigate } from "react-router-dom";

const CategaoryCard = (props) => {
  let navigate = useNavigate();  
  return (
    <div className="inner category-main" onClick={() => navigate("/product")}>
      <div className="trending-content-img">
        <img src={props?.data[0]?.thumbnail} alt={props?.data[0]?.thumbnail} />
      </div>
      <div className="trending-content-product_card">
        <h5 className="product_card-title" href="">
          {props?.title}
        </h5>
      </div>
    </div>
  );
};

export default CategaoryCard;
