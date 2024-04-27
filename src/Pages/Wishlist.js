import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import SingleCard from "../Components/SingleCard";
import { Link, useNavigate } from "react-router-dom";

const Wishlist = () => {
  let navigate = useNavigate();
  const WishlistData = useSelector((state) => state.GlobalShowProduct.Wishlist);
  function fnClickCardData(data) {
    navigate(`/product-detail/${data.id}`);
  }
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <>
      <div className="container">
        <div className="product-heading">
          <h4>WISHLIST</h4>
          {/* <p>{WishlistData?.length} products</p> */}
        </div>
        {WishlistData?.length > 0 ? (
          <div className="container trending you-might-like-section wishlist-content">
            <div className="trending-content">
              {WishlistData?.map((item) => (
                <SingleCard data={item} fnClickCardData={fnClickCardData} />
              ))}
            </div>
          </div>
        ) : (
          <div className="products empty-cart">
            <div>
              <h5>Your Wishlist is currently empty.</h5>
              <Link className="primary-btn " to={"/product"}>
                Continue Browsing
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Wishlist;
