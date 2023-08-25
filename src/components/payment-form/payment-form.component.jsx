import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import "./payment-form.styles.scss";

import Button from "../button/button.component";
import { useSelector } from "react-redux";
import Spinner from "../spinner/spinner.component";
import { useState } from "react";

function PaymentForm() {
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const stripe = useStripe();
  const elements = useElements();
  const paymentHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    try {
      setIsProcessingPayment(true);
      const response = await fetch(
        "/.netlify/functions/create-payment-intent",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: amount * 100,
          }),
        }
      ).then((res) => res.json());
      if (!response.paymentIntent) {
        throw new Error("The payment is not completed");
      }
      const { client_secret } = response.paymentIntent;

      const paymentresult = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: currentUser ? currentUser.displayName : "Guest",
          },
        },
      });
      if (paymentresult.error) {
        setIsProcessingPayment(false);
        alert(paymentresult.error.message);
      } else {
        if (paymentresult.paymentIntent.status === "succeeded") {
          setIsProcessingPayment(false);
          alert("payment successfull");
        }
      }
    } catch (err) {
      setIsProcessingPayment(false);
      alert(err.message);
    }
  };
  return (
    <div className="payment-form-container">
      <form className="form-container" onSubmit={paymentHandler}>
        <h2>Credit Card Payment: </h2>
        <CardElement />
        <Button disabled={isProcessingPayment} buttonType="inverted">
          {isProcessingPayment ? <Spinner /> : "Pay Now"}
        </Button>
      </form>
    </div>
  );
}

export default PaymentForm;
