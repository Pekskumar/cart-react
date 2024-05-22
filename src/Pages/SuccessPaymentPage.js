import React, { useEffect } from "react";
import SuccessIcon from "../Assets/Images/SuccessIcon";
import { AddToCartSlice } from "../ReactToolkit/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SuccessPaymentPage = () => {
  const ProductShowData = useSelector(
    (state) => state.GlobalShowProduct.GlobalShowProducts
  );
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(AddToCartSlice([]));
  }, [ProductShowData]);

  return (
    <div>
      <div className="container">
        <div className="paper">
          <div className="main-contents">
            <div className="success-icon">
              <SuccessIcon />
            </div>
            <h className="success-title">Payment Done!</h>
            <div className="success-description">
              We received your purchase request. we'll be in touch shortly!
            </div>
          </div>
          <Link to={"/"} className="primary-btn ">
            Go back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPaymentPage;
