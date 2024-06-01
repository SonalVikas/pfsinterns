// import React, { Fragment, useEffect, useRef, useState } from "react";
// import CheckoutSteps from "../Cart/CheckoutSteps";
// import { useSelector, useDispatch } from "react-redux";
// import MetaData from "../layout/MetaData";
// import { Typography } from "@material-ui/core";
// import { useAlert } from "react-alert";
// import axios from "axios";
// import "./Payment.css";
// import { createOrder, clearErrors } from "../../actions/orderAction";
// import { useNavigate } from "react-router-dom";

// const Payment = () => {
//   const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const alert = useAlert();
//   const payBtn = useRef(null);

//   const { shippingInfo, cartItems } = useSelector((state) => state.cart);
//   const { user } = useSelector((state) => state.user);
//   const { error } = useSelector((state) => state.newOrder);

//   const [cardDetails, setCardDetails] = useState({
//     number: "",
//     expiry: "",
//     cvc: "",
//   });

//   const [paymentMethod, setPaymentMethod] = useState("razorpay");

//   const [razorpayApiKey, setRazorpayApiKey] = useState(null);

//   const order = {
//     shippingInfo,
//     orderItems: cartItems,
//     itemsPrice: orderInfo.subtotal,
//     taxPrice: orderInfo.tax,
//     shippingPrice: orderInfo.shippingCharges,
//     totalPrice: orderInfo.totalPrice,
//   };

//   const handleChange = (e) => {
//     setCardDetails({
//       ...cardDetails,
//       [e.target.name]: e.target.value,
//     });
//   };

//   useEffect(() => {
//     // Fetch Razorpay API key
//     const fetchRazorpayApiKey = async () => {
//       try {
//         const response = await axios.get("/api/v1/razorpayapikey");
//         const { data } = response;
//         if (data && data.razorpayApiKey) {
//           setRazorpayApiKey(data.razorpayApiKey);
//         } else {
//           alert.error("Razorpay API key is not available");
//         }
//       } catch (error) {
//         alert.error("Failed to fetch Razorpay API key");
//       }
//     };

//     fetchRazorpayApiKey();
//   }, [alert]);

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     try {
//       if (paymentMethod === "razorpay") {
//         if (!razorpayApiKey) {
//           alert.error("Razorpay API key is not available");
//           return;
//         }

//         const options = {
//           key: razorpayApiKey,
//           amount: order.totalPrice * 100,
//           currency: "INR",
//           name: "Your Company Name",
//           description: "Payment for your order",
//           image: "https://example.com/logo.png",
//           handler: async function (response) {
//             try {
//               // Handle successful payment here
//               dispatch(createOrder(order));
//               navigate("/success");
//             } catch (error) {
//               alert.error("Payment verification failed");
//             }
//           },
//           prefill: {
//             name: user.name,
//             email: user.email,
//           },
//           notes: {
//             address: shippingInfo.address,
//             city: shippingInfo.city,
//             state: shippingInfo.state,
//             postal_code: shippingInfo.pinCode,
//             country: shippingInfo.country,
//           },
//         };

//         const razorpay = new window.Razorpay(options);
//         razorpay.open();
//       } else if (paymentMethod === "cod") {
//         // Handle Cash on Delivery logic here
//         dispatch(createOrder(order));
//         navigate("/success");
//       }
//     } catch (error) {
//       alert.error("An error occurred while processing the payment.");
//     }
//   };

//   useEffect(() => {
//     if (error) {
//       alert.error(error);
//       dispatch(clearErrors());
//     }
//   }, [dispatch, error, alert]);

//   return (
//     <Fragment>
//       <MetaData title="Payment" />
//       <CheckoutSteps activeStep={2} />
//       <div className="paymentContainer">
//         <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
//           <Typography>Payment Details</Typography>
//           <div>
//             <input
//               type="radio"
//               id="razorpay"
//               name="paymentMethod"
//               value="razorpay"
//               checked={paymentMethod === "razorpay"}
//               onChange={(e) => setPaymentMethod(e.target.value)}
//             />
//             <label htmlFor="razorpay">Razorpay</label>
//           </div>
//           <div>
//             <input
//               type="radio"
//               id="cod"
//               name="paymentMethod"
//               value="cod"
//               checked={paymentMethod === "cod"}
//               onChange={(e) => setPaymentMethod(e.target.value)}
//             />
//             <label htmlFor="cod">Cash on Delivery</label>
//           </div>
//           {paymentMethod === "razorpay" && (
//             <>
//               <div>
//                 <label>Card Number:</label>
//                 <input
//                   type="text"
//                   name="number"
//                   value={cardDetails.number}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
//                 <label>Expiry Date:</label>
//                 <input
//                   type="text"
//                   name="expiry"
//                   value={cardDetails.expiry}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
//                 <label>CVC:</label>
//                 <input
//                   type="text"
//                   name="cvc"
//                   value={cardDetails.cvc}
//                   onChange={handleChange}
//                 />
//               </div>
//             </>
//           )}
//           <input
//             type="submit"
//             value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
//             ref={payBtn}
//             className="paymentFormBtn"
//           />
//         </form>
//       </div>
//     </Fragment>
//   );
// };

// export default Payment;
import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import "./Payment.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { createOrder, clearErrors } from "../../actions/orderAction";
import {useNavigate} from "react-router-dom";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
const navigate=useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          navigate("/success");
        } else {
          alert.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
