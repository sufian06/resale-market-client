import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const AllBuyers = () => {
  const {data: buyers = [], refetch} = useQuery({
    queryKey: ['buyer'],
    queryFn: async() => {
      const res = await fetch('https://resale-market-server-zeta.vercel.app/allbuyers')
      const data = await res.json();
      return data;
    }
  })

  const handleDeleteBuyer = (user) => {
    fetch(`https://resale-market-server-zeta.vercel.app/users/${user._id}`, {
      method: 'DELETE',
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then(res => res.json())
    .then(data => {
      if(data.deletedCount > 0){
        refetch();
        toast.success(`${user.name} role: ${user.role} deleted successfully`)
      }
    })
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-primary mb-5">All Buyers</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {buyers.map((buyer, i) => (
              <tr key={buyer._id}>
                <th>{i + 1}</th>
                <td>{buyer.name}</td>
                <td>{buyer.email}</td>
                <td>{buyer.role}</td>
                <td>
                  <button onClick={() => handleDeleteBuyer(buyer)} className="btn btn-xs btn-error text-white">
                    Delete
                  </button>
                </td>            
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBuyers;