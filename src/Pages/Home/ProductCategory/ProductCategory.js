import React from "react";
import { Link } from "react-router-dom";

const ProductCategory = ({ product }) => {
  const { _id, category, img, allproducts } = product;

  // const handleCategoryProducts = (id) => {
  //   console.log(id, category)
  // }
  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <figure>
        <img src={img} className="h-72 w-full object-cover" alt="Shoes" />
      </figure>
      <div className="card-body">
        <div className="flex justify-between items-center">
          <h2 className="card-title">{category}</h2>
          <h4 className="font-bold text-primary text-lg">
            Total Bikes: {allproducts.length}
          </h4>
        </div>
        <div className="card-actions">
          <button className="btn btn-primary">
            <Link to={`/category/${_id}`}>View All Bikes</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
