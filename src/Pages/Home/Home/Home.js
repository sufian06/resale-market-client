import React from 'react';
import { useLoaderData } from 'react-router-dom';
import ProductCategory from '../ProductCategory/ProductCategory';

const Home = () => {
  const products = useLoaderData();
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10'>
      {
        products.map(product => <ProductCategory key={product._id} product={product} />)
      }
    </div>
  );
};

export default Home;