import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentMethodScreen = (props) => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/placeorder");
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      props.history.push("/shipping");
    }
  }, [props.history, shippingAddress]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Payment Method</h1>
        </div>
        <div>
          <div>
            <input
              type="radio"
              value="PayPal"
              id="paypal"
              onChange={(e) => setPaymentMethod(e.target.value)}
              checked
              required
              name="paymentMethod"
            />
            <label htmlFor="paypal">PayPal</label>
          </div>
          <br />
          <div>
            <input
              type="radio"
              value="Stripe"
              id="stripe"
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
              name="paymentMethod"
            />
            <label htmlFor="stripe">Stripe</label>
          </div>
        </div>
        <div>
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentMethodScreen;
