import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useTitle from '../../../hooks/useTitle';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const MyProducts = () => {
  useTitle('MyProducts');
  const [deletingProduct, setDeletingProduct] = useState(null);

  const closeModal = () => {
    setDeletingProduct(null);
  }

  const { data: addedProducts, isLoading, refetch } = useQuery({
    queryKey: ["addedProducts"],
    queryFn: async () => {
      try {
        const res = await fetch("https://resale-market-server-zeta.vercel.app/addedproducts", {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        const data = await res.json();
        return data;
      } catch (error) {}
    },
  });

  const handleDeleteProduct = (product) => {
    fetch(`https://resale-market-server-zeta.vercel.app/addedproducts/${product._id}`, {
      method: 'DELETE',
      headers: {
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data.deletedCount > 0){
        refetch();
        toast.success(`${product.name} deleted successfully!`)
      }
    })
  }

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-8">My Products: {addedProducts?.length}</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Condition</th>
              <th>Location</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {addedProducts.map((product, i) => (
              <tr key={product._id}>
                <th>{i + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="w-24 rounded-full">
                      <img src={product.image} alt="" />
                    </div>
                  </div>
                </td>
                <td>{product.name}</td>
                <td>{product.condition}</td>
                <td>{product.location}</td>
                <td>$ {product.price}</td>
                <td>
                  <label onClick={() => setDeletingProduct(product)} htmlFor="confirmation-modal" className="btn btn-outline btn-sm btn-error">
                  Delete
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {
        deletingProduct && <ConfirmationModal
          title={`Are you sure you want to delete?`}
          message={`If you delete ${deletingProduct.name}. It cannot be undone.`}
          successAction = {handleDeleteProduct}
          successButtonName = "Delete"
          modalData = {deletingProduct}
          closeModal={closeModal}
        ></ConfirmationModal>
      }
    </div>
  );
};

export default MyProducts;