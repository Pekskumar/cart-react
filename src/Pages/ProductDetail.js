import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import { AddToCartSlice } from "../ReactToolkit/ProductSlice";
import StarRating from "../Components/StarRating";
import { CommonService } from "../Common/CommonService";
import { toast } from "react-toastify";

const ProductDetail = () => {
  let param = useParams();
  let navigate = useNavigate();
  const ProductShowData = useSelector(
    (state) => state.GlobalShowProduct.GlobalShowProducts
  );
  const AllCartData = useSelector((state) => state.GlobalShowProduct.AddToCart);
  let ProductData = ProductShowData?.find((f) => f.id === parseInt(param.id));
  let dispatch = useDispatch();
  const isInCartData = AllCartData?.find((item) => item.id === ProductData.id);
  
  const [QuantityValue, setQuantityValue] = useState(1);
  const [ProductImage, setProductImage] = useState(ProductData?.thumbnail);

  function fnAddToCart(Productinfo) {
    if (AllCartData?.length > 0) {
      const productWithQty = { ...Productinfo, qty: QuantityValue };
      let updatedArray = [...AllCartData, productWithQty];
      dispatch(AddToCartSlice(updatedArray));
      toast.success(`Successfully added ${Productinfo.title} in Cartlist.`);
    } else {
      const productWithQty = { ...Productinfo, qty: QuantityValue };
      dispatch(AddToCartSlice([productWithQty]));
      toast.success(`Successfully added ${Productinfo.title} in Cartlist.`);
    }
  }
  function fnplusCart(Productinfo) {
    if (AllCartData?.length > 0) {
      let CartFinddata = AllCartData?.find((f) => f.id === Productinfo.id);
      if (
        CartFinddata !== undefined &&
        CartFinddata?.stock > CartFinddata.qty
      ) {
        const updatedCart = AllCartData.map((item) =>
          item.id === Productinfo.id ? { ...item, qty: item.qty + 1 } : item
        );
        dispatch(AddToCartSlice(updatedCart));
      } else {
        if (Productinfo.stock > QuantityValue) {
          setQuantityValue(QuantityValue + 1);
        }
      }
    } else {
      if (Productinfo.stock > QuantityValue) {
        setQuantityValue(QuantityValue + 1);
      }
    }
  }
  function fnMinusCart(Productinfo) {
    if (AllCartData?.length > 0) {
      let CartFinddata = AllCartData?.find((f) => f.id === Productinfo.id);
      if (CartFinddata !== undefined && CartFinddata?.qty > 1) {
        const updatedCart = AllCartData.map((item) =>
          item.id === Productinfo.id ? { ...item, qty: item.qty - 1 } : item
        );
        dispatch(AddToCartSlice(updatedCart));
      } else {
        if (QuantityValue > 1) {
          setQuantityValue(QuantityValue - 1);
        }
      }
    } else {
      setQuantityValue(QuantityValue - 1);
    }
  }
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="container product-detail-content d-flex justify-space-between ">
        <div className="product-detail-content-left">
          <div className="parent-img">
            <img src={ProductImage} />
          </div>
          <div className="child-img">
            {ProductData?.images.map((itemp, indexp) => (
              <img onClick={()=>setProductImage(itemp)} key={indexp} src={itemp} alt={indexp} />
            ))}
          </div>
        </div>
        <div className="product-detail-content-right">
          <h3 className="product-detail-content-right-title">
            {ProductData?.title}
          </h3>
          <div className="d-flex align-item-center justify-space-between">
            <div>
              <h4 className="product-detail-title">
                ${ProductData?.price?.toFixed(2)}
              </h4>
              <strike>
                $
                {CommonService.DescountedPrice(
                  ProductData?.price,
                  ProductData?.discountPercentage
                )}
              </strike>
            </div>
            <div>
              <StarRating rating={ProductData?.rating?.toFixed(1)} />{" "}
            </div>
          </div>
          <div className="stoke">
            <p> Only {ProductData?.stock} items in stock!</p>
            <input disabled value={ProductData?.stock} type="range" />
          </div>
          <div className="catbrand ">
            <div className="d-flex title-child">
              <h5>Brand</h5>
              <p>{ProductData?.brand}</p>
            </div>
            <div className="d-flex title-child">
              <h5>Category</h5>
              <p>{ProductData?.category}</p>
            </div>
          </div>
          <div className="d-flex title-child description">
            <h5>Description</h5>
            <p>{ProductData?.description}</p>
          </div>
          <div className="Quantity">
            <h5> Quantity</h5>
            <div className="d-flex justify-space-between align-item-center">
              <div className="plus-minus-btn">
                <button onClick={() => fnMinusCart(ProductData)}>-</button>
                {isInCartData !== undefined ? isInCartData.qty : QuantityValue}
                <button onClick={() => fnplusCart(ProductData)}>+</button>
              </div>
              <div
                className="primary-btn "
                onClick={() =>
                  isInCartData !== undefined
                    ? navigate("/cart")
                    : fnAddToCart(ProductData)
                }
              >
                {isInCartData !== undefined ? "View Cart" : "Add to Cart"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="hot-categories product-detail-hot">
        <div className="heading">
          <h2>Hot Categories</h2>
        </div>
        <div className="container">
          <div className="hot-categories-slider">
            <Slider {...settings}>
              {ProductShowData?.map((item, index) => (
                <div className="hot-categories-content" key={index}>
                  <div className="hot-categories-content-img">
                    <img src={item.thumbnail} alt={item.thumbnail} />
                    <Link className="primary-btn" to={"/product"}>
                      Shop Now
                    </Link>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
