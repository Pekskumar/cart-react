import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { AddToCartSlice } from "../ReactToolkit/ProductSlice";
import { useDispatch } from "react-redux";

function PaymentComponent({ price, currency }) {
  let dispatch = useDispatch()
  const [convertedPrice, setConvertedPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchConversionRate()
      .then((conversionRate) => {
        const convertedPrice = price * conversionRate;
        setConvertedPrice(convertedPrice);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [price, currency]);

  const fetchConversionRate = async () => {
    // Fetch the conversion rate from USD to the specified currency from an API
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${currency}`
    );
    const data = await response.json();
    return data.rates[currency]; // Return the conversion rate
  };

  const handleToken = (token) => {
    debugger
    console.log("token ::",token);
    if (token) {
      dispatch(AddToCartSlice([]));
    }
    // Send the token and converted price to your backend to process the payment
    // console.log(token);
    // console.log(convertedPrice);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <StripeCheckout
      stripeKey="pk_test_51P69w5SFbiLnc0CEseUT0ferwLaPLHCDZyNwLHSwevRu2NKJJmonLWhCq7B4H1MsV52NuMn8E7Jvt7ESHrWsD5D400H5JG5PFy"
      token={handleToken}
      amount={convertedPrice * 100} // Convert price to cents
      currency={currency}
      shippingAddress={true}
      label='Check Out'
    />
  );
}

export default PaymentComponent;
