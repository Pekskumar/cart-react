import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import temp from "../Assets/Images/imagePlaceholder1.png";
import { CommonService } from "../Common/CommonService";
import { useDispatch, useSelector } from "react-redux";
import { AddToCartSlice } from "../ReactToolkit/ProductSlice";
import RemoveIcon from "../Assets/Images/RemoveIcon";
import HeartIcon from "../Assets/Images/HeartIcon";
import { toast } from "react-toastify";

const SingleCart = (props) => {
  const AllCartData = useSelector((state) => state.GlobalShowProduct.AddToCart);
  let dispatch = useDispatch();
  const [QuantityValue, setQuantityValue] = useState(1);
  const isInCartData = AllCartData?.find((item) => item.id === props?.data?.id);
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
      }
    } else {
      setQuantityValue(QuantityValue - 1);
    }
  }

  useEffect(() => {
    if (AllCartData?.length > 0) {
      let tempEstimatedTotal = 0;
      let tempTotalDiscount = 0;
      AllCartData.forEach((element) => {
        tempEstimatedTotal = tempEstimatedTotal + element?.price * element?.qty;
        tempTotalDiscount =
          tempTotalDiscount + element?.discountPercentage * element?.qty;
      });
      props?.ValueEstimatedTotal(tempEstimatedTotal);
      props?.ValueTotalDiscount(tempTotalDiscount);
    }
  }, [AllCartData]);

  function fnSingleRemoveCart(data) {
    let tempsinfleremove = AllCartData?.filter((f) => f.id !== data?.id);
    dispatch(AddToCartSlice(tempsinfleremove));
    toast.error(`Successfully removed ${data?.title} from Cartlist.`);
  }
  return (
    <div className="cart-shoping-content-one d-flex justify-space-between">
      <div className="cart-start">
        <img src={props?.data?.thumbnail} />
      </div>
      <div className="cart-center">
        <h5>{props?.data?.title}</h5>
        {/* <div className="d-flex ">
          <p>
            <b>Stock</b>
          </p>
          <p>{props?.data?.stock}</p>
        </div> */}
        <div className="d-flex ">
          <p>
            <b>Category</b>
          </p>
          <p>{props?.data?.category}</p>
        </div>
        <div className="d-flex ">
          <p>
            <b>Brand</b>
          </p>
          <p>{props?.data?.brand}</p>
        </div>
        <div className="d-flex ">
          <StarRating rating={props?.data?.rating?.toFixed(1)} />
        </div>
        <div className="d-flex cart-wish">
          <div
            className="d-flex align-item-center remove-cart"
            onClick={() => fnSingleRemoveCart(props?.data)}
          >
            <RemoveIcon />
            <p> Remove</p>
          </div>
          {/* <div
            className="d-flex align-item-center remove-cart move-wishlist"
            onClick={() => fnSingleRemoveCart(props?.data?.id)}
          >
            <HeartIcon />
            <p> Move to Wish list</p>
          </div> */}
        </div>
      </div>
      <div className="cart-end">
        {/* <div>
          <button onClick={() => fnMinusCart(props?.data)}>-</button>
          {isInCartData !== undefined ? isInCartData.qty : QuantityValue}
          <button onClick={() => fnplusCart(props?.data)}>+</button>
        </div> */}
        <div className="plus-minus-btn">
          <button onClick={() => fnMinusCart(props?.data)}>-</button>
          <p>
            {" "}
            {isInCartData !== undefined ? isInCartData.qty : QuantityValue}
          </p>
          <button onClick={() => fnplusCart(props?.data)}>+</button>
        </div>

        <p className="main-cart-price">
          <b>${(props?.data?.price * props?.data?.qty).toFixed(2)}</b>
        </p>
        <p className="main-cart-desc-price">
          <strike>
            $
            {(
              CommonService.DescountedPrice(
                props?.data?.price,
                props?.data?.discountPercentage
              ) * props?.data?.qty
            ).toFixed(2)}
          </strike>
        </p>

        <p className="main-cart-desc-percent">
          You save{' '}
          {(props?.data?.discountPercentage * props?.data?.qty).toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

export default SingleCart;
