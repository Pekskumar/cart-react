import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SingleCard from "../Components/SingleCard";
import CategaoryCard from "../Components/CategaoryCard";

const Category = () => {
  let navigate = useNavigate();
  // const ProductShowData = useSelector((state) => state.GlobalShowProduct.Wishlist);
  const ProductShowData = useSelector(
    (state) => state.GlobalShowProduct.GlobalShowProducts
  );
  const [CategoryList, setCategoryList] = useState({});
  function fnClickCardData(data) {
    navigate(`/product-detail/${data.id}`);
  }

  useEffect(() => {
    if (ProductShowData?.length > 0) {
      let catObj = {};
      ProductShowData.forEach((element) => {
        if (catObj[element?.category]) {
          catObj[element?.category].data = [
            ...catObj[element?.category].data,
            element,
          ];
        } else {
          catObj[element?.category] = {
            ...catObj[element?.category],
            data: [element],
          };
        }
      });
      setCategoryList(catObj);
    }
  }, [ProductShowData]);
    
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <>
      <div className="container">
        <div className="product-heading">
          <h4>Category</h4>
          {/* <p>{ProductShowData?.length} products</p> */}
        </div>
        {Object.keys(CategoryList).length > 0 ? (
          <div className="container trending you-might-like-section wishlist-content">
            <div className="trending-content">
              {Object.keys(CategoryList)?.map((item,index) => (
                <>
                  <CategaoryCard title={item} data={CategoryList[item].data} />
                </>
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

export default Category;
