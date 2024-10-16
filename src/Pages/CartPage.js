import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CommonService } from "../Common/CommonService";
import SingleCart from "../Components/SingleCart";
import YouMightLike from "../Components/YouMightLike";
import { AddToCartSlice } from "../ReactToolkit/ProductSlice";
import { Link, useNavigate } from "react-router-dom";
import LeftIcon from "../Assets/Images/LeftIcon";
import CheckoutForm from "../Components/CheckoutForm";
import PaymentComponent from "../Components/CheckoutForm";
import RemoveIcon from "../Assets/Images/RemoveIcon";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";

const CartPage = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const ProductShowData = useSelector(
    (state) => state.GlobalShowProduct.GlobalShowProducts
  );
  const AllCartData = useSelector((state) => state.GlobalShowProduct.AddToCart);
  const [EstimatedTotal, setEstimatedTotal] = useState(0);
  const [TotalDiscount, setTotalDiscount] = useState(0);
  const [PaymentLoader, setPaymentLoader] = useState(false);
  function fnRemoveAllCart() {
    dispatch(AddToCartSlice([]));
    toast.error(`Successfully removed all data from Cartlist.`);
  }
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const makePayment = async () => {
    setPaymentLoader(true);
    try {
      const stripe = await loadStripe(
        "pk_test_51PA68JSJPBTss550uos9FlbPHqq5Ev2joCKPMkLF3h7lxBHLOrGH3zq4tAzlKC2N1HCQCzTFNUpNl2kGixMu7po500dbZ4LlHv"
      );
      const body = {
        products: AllCartData,
      };
      const headers = {
        "Content-Type": "application/json",
        accept: "*/*",
      };
      const response = await fetch(
         `https://cart-server-ton3.onrender.com/create-checkout-session`,
        //  `http://localhost:3001/create-checkout-session`,
        // `https://complete-tasteful-november.glitch.me/create-checkout-session`,
        // `https://aquamarine-jungle-moth.glitch.me/create-checkout-session`, // working
        // `https://vivacious-furry-surgeon.glitch.me/create-checkout-session`,
        
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const session = await response.json();

      const result = stripe.redirectToCheckout({
        sessionId: session.id,
      });
      if (result.error) {
        setPaymentLoader(false);
        console.log(result.error);
      } else {
        setPaymentLoader(false);
      }
    } catch (error) {
      console.error("Error making payment:", error);
    }
  };

  return (
    <>
      <div className="container">
        {AllCartData?.length > 0 ? (
          <>
            <div className="d-flex justify-space-between">
              <div className="shoping-cart">
                <div className="product-heading">
                  <h4>Your Shopping Cart</h4>
                  <h6>{AllCartData?.length} items</h6>
                </div>
                <div className="cart-shoping-content">
                  {AllCartData?.length > 0 &&
                    AllCartData?.map((item, index) => (
                      <SingleCart
                        data={item}
                        key={index}
                        ValueEstimatedTotal={setEstimatedTotal}
                        ValueTotalDiscount={setTotalDiscount}
                      />
                    ))}
                </div>
                <div className="d-flex justify-space-between align-item-center">
                  <div
                    className="d-flex align-item-center return-shop"
                    onClick={() => navigate("/product")}
                  >
                    <LeftIcon />
                    <h5>return to shop</h5>
                  </div>
                  <div
                    className="d-flex align-item-center remove-cart"
                    onClick={() => fnRemoveAllCart()}
                  >
                    <RemoveIcon />
                    <p> Remove All</p>
                  </div>
                </div>
              </div>
              <div className="order-summary">
                <div className="product-heading">
                  <h4>Order Summary</h4>
                </div>
                <div className="cart-shoping-content-one">
                  <div className="d-flex justify-space-between">
                    <p>
                      <b>Sub Total</b>
                    </p>
                    <p>
                      $
                      {CommonService.DescountedPrice(
                        EstimatedTotal,
                        TotalDiscount
                      )}
                    </p>
                  </div>
                  <div className="d-flex justify-space-between">
                    <p>
                      <b>total Discount</b>
                    </p>
                    <p>{TotalDiscount?.toFixed(2)}%</p>
                  </div>
                  <div className="d-flex justify-space-between">
                    <p>
                      <b>Shipping costs</b>
                    </p>
                    <p>FREE!</p>
                  </div>
                </div>
                <div className="d-flex justify-space-between estimated-total">
                  <h5>Estimated total</h5>
                  <h5>${EstimatedTotal?.toFixed(2)}</h5>
                </div>
                <div
                  className={
                    PaymentLoader
                      ? "primary-btn makePayment disable"
                      : "primary-btn makePayment"
                  }
                  // className="primary-btn makePayment"
                  onClick={makePayment}
                >
                  {PaymentLoader ? "Loading..." : "Check Out"}
                </div>
                {/* <PaymentComponent
                  price={EstimatedTotal?.toFixed(2)}
                  currency={"USD"}
                /> */}
              </div>
            </div>
          </>
        ) : (
          <div className="products empty-cart">
            <div>
              <h5>Your cart is currently empty.</h5>
              <Link className="primary-btn" to={"/product"}>
                Return to Shop
              </Link>
            </div>
          </div>
        )}
       
      </div>
      <YouMightLike data={ProductShowData} />
    </>
  );
};

export default CartPage;
