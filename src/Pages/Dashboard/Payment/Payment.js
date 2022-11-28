import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from "react";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from '../CheckoutForm/CheckoutForm';

const stripePromise = loadStripe('pk_test_51M6Y7fDvHgWhVXmBH3m6DGuyAbyCRpXgPlBGVu9LHMXILGrt4xuY0AVP9WzMcAPnCZawtV2V6UAGnluKfdi6ZG7I009imJxB6T');

const Payment = () => {
  const booking = useLoaderData();
  // const navigation = useNavigation();
  const { product, price } = booking;
  // if (navigation.state === "loading") {
  //   return <Loading></Loading>;
  // }
  return (
    <div>
      <h3 className="text-2xl font-bold text-primary">Payment for {product}</h3>
      <p className="text-xl">
        Please pay <strong className="text-primary font-bold">${price}</strong>
      </p>
      <div className="w-96 my-12">
        <Elements stripe={stripePromise}>
          <CheckoutForm booking={booking} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
