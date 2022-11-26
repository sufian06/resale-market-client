import React from "react";

const ProductCard = ({ singleProduct }) => {
  const { name, image, location, originalPrice, resalePrice, used } =
    singleProduct;
  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <figure>
        <img src={image} className="h-72 w-full object-cover" alt="Shoes" />
      </figure>
      <div className="card-body mt-4">
        <div className="flex justify-between items-center">
          <h2 className="card-title">{name}</h2>
          <h4 className="font-bold text-primary text-lg">
            Original Price: ${originalPrice}
          </h4>
        </div>
        <div className="flex justify-between items-center">
          <h2 className="card-title">{location}</h2>
          <h4 className="font-bold text-primary text-lg">
            Resale Price: ${resalePrice}
          </h4>
        </div>
        <h4 className="text-lg font-semibold">Used: {used} months</h4>
        <div className="card-actions mt-4">
          <label htmlFor="booking-modal" className="btn btn-primary w-full text-white">
            Book Now
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
