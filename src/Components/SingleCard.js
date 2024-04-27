import React from "react";
import { CommonService } from "../Common/CommonService";
import { useDispatch, useSelector } from "react-redux";
import { WishListSlice } from "../ReactToolkit/ProductSlice";
import { ToastContainer, toast } from "react-toastify";

const SingleCard = (props) => {
  const Wishlist = useSelector((state) => state.GlobalShowProduct.Wishlist);
  let IsWishCard = Wishlist?.find((f) => f?.id === props?.data?.id);
  let dispatch = useDispatch();
  function fnWishlistAddRemove(item, type) {
    if (type === "add") {
      if (Wishlist?.length > 0) {
        let updatedArray = [...Wishlist, item];
        dispatch(WishListSlice(updatedArray));
        toast.success(`Successfully added ${item.title} in Wishlist.`);
      } else {
        toast.success(`Successfully added ${item.title} in Wishlist.`);
        dispatch(WishListSlice([item]));
      }
    }
    if (type === "remove") {
      let removeWishcart = Wishlist?.filter((f) => f?.id !== item?.id);
      dispatch(WishListSlice(removeWishcart));
      toast.warn(`Successfully remove ${item.title} from Wishlist.`);
    }
  }
  return (
    <div className="inner">
      <div className="trending-content-img">
        <img
          onClick={() => props.fnClickCardData(props?.data)}
          src={props?.data?.thumbnail}
          alt={props?.data?.thumbnail}
        />

        <div className="img-icon">
          <button
            onClick={() =>
              IsWishCard !== undefined
                ? fnWishlistAddRemove(props?.data, "remove")
                : fnWishlistAddRemove(props?.data, "add")
            }
            className="img-icon-btn"
          >
            {IsWishCard === undefined ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  fill="currentColor"
                  d="M462.3 62.7c-54.5-46.4-136-38.7-186.6 13.5L256 96.6l-19.7-20.3C195.5 34.1 113.2 8.7 49.7 62.7c-62.8 53.6-66.1 149.8-9.9 207.8l193.5 199.8c6.2 6.4 14.4 9.7 22.6 9.7 8.2 0 16.4-3.2 22.6-9.7L472 270.5c56.4-58 53.1-154.2-9.7-207.8zm-13.1 185.6L256.4 448.1 62.8 248.3c-38.4-39.6-46.4-115.1 7.7-161.2 54.8-46.8 119.2-12.9 142.8 11.5l42.7 44.1 42.7-44.1c23.2-24 88.2-58 142.8-11.5 54 46 46.1 121.5 7.7 161.2z"
                ></path>
              </svg>
            ) : (
              <svg width="800px" height="800px" viewBox="0 0 24 24">
                <g transform="translate(0 -1028.4)">
                  <path
                    d="m7 1031.4c-1.5355 0-3.0784 0.5-4.25 1.7-2.3431 2.4-2.2788 6.1 0 8.5l9.25 9.8 9.25-9.8c2.279-2.4 2.343-6.1 0-8.5-2.343-2.3-6.157-2.3-8.5 0l-0.75 0.8-0.75-0.8c-1.172-1.2-2.7145-1.7-4.25-1.7z"
                    fill="#e74c3c"
                  />
                </g>
              </svg>
            )}
          </button>

          {/* <button className="img-icon-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-switch"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.7"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <polyline points="15 4 19 4 19 8"></polyline>
              <line x1="14.75" y1="9.25" x2="19" y2="4"></line>
              <line x1="5" y1="19" x2="9" y2="15"></line>
              <polyline points="15 19 19 19 19 15"></polyline>
              <line x1="5" y1="5" x2="19" y2="19"></line>
            </svg>
          </button>
          <button className="img-icon-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-eye"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button> */}
        </div>

        <button
          onClick={() => props.fnClickCardData(props?.data)}
          className="card-btn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ionicon"
            viewBox="0 0 512 512"
          >
            <title>Cart</title>
            <circle
              cx="176"
              cy="416"
              r="16"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="32"
            ></circle>
            <circle
              cx="400"
              cy="416"
              r="16"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="32"
            ></circle>
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="32"
              d="M48 80h64l48 272h256"
            ></path>
            <path
              d="M160 288h249.44a8 8 0 007.85-6.43l28.8-144a8 8 0 00-7.85-9.57H128"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="32"
            ></path>
          </svg>

          <span>+ Add to cart</span>
        </button>
      </div>
      <div
        onClick={() => props.fnClickCardData(props?.data)}
        className="trending-content-product_card"
      >
        <h3>
          <a className="product_card-title" href="">
            {props?.data?.title}
          </a>
        </h3>
        <div className="price-item">
          <p>
            <span>
              <s>
                $
                {CommonService.DescountedPrice(
                  props?.data?.price,
                  props?.data?.discountPercentage
                )}
              </s>
            </span>
          </p>
          <p>${props?.data?.price?.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleCard;
