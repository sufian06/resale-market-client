import React from 'react';
import { useLoaderData } from 'react-router-dom';
import ProductCard from '../components/ProductCard/ProductCard';

const ViewAll = () => {
  const bikes = useLoaderData()
  const {allproducts} = bikes[0];
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
      {
        allproducts.map((singleProduct, i) => <ProductCard key={i} singleProduct={singleProduct} />)
      }
    </div>
  );
};

export default ViewAll;