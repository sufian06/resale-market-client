import React from "react";

const ProductCategory = ({ product }) => {
  const { category, img } = product;
  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <figure>
        <img src={img} className="h-72 w-full object-cover" alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{category}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
