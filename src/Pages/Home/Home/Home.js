import React from "react";
import { useLoaderData } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";
import CTA from "../CTA/CTA";
import ProductCategory from "../ProductCategory/ProductCategory";
import Banner from "./Banner/Banner";

const Home = () => {
  useTitle("Home");
  const products = useLoaderData();
  return (
    <div>
      <Banner />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {products.map((product) => (
          <ProductCategory key={product._id} product={product} />
        ))}
      </div>
      <CTA />
    </div>
  );
};

export default Home;
