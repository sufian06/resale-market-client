import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import BookingModal from "../components/BookingModal/BookingModal";
import ProductCard from "../components/ProductCard/ProductCard";
import useTitle from "../hooks/useTitle";

const ViewAll = () => {
  useTitle("Product by Category")
  const bikes = useLoaderData();
  const { allproducts } = bikes[0];

  const [bookingProduct, setBookingProduct] = useState(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {allproducts.map((singleProduct, i) => (
        <ProductCard
          key={i}
          singleProduct={singleProduct}
          setBookingProduct={setBookingProduct}
        />
      ))}
      {bookingProduct && (
        <BookingModal
          bookingProduct={bookingProduct}
          setBookingProduct={setBookingProduct}
        />
      )}
    </div>
  );
};

export default ViewAll;
