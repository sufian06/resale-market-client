// import { useQuery } from '@tanstack/react-query';
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AllSellers = () => {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    axios.get("https://resale-market-server-zeta.vercel.app/users").then((data) => {
      setSellers(data.data);
    });
  }, []);

  // const { data: sellers = [], refetch } = useQuery({
  //   queryKey: ["users"],
  //   queryFn: async () => {
  //     const res = await fetch("https://resale-market-server-zeta.vercel.app/users");
  //     const data = await res.json();
  //     return data;
  //   },
  // });

  const handleDeleteSeller = (seller) => {
    fetch(`https://resale-market-server-zeta.vercel.app/users/${seller._id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success(
            `${seller.name} role: ${seller.role} deleted successfully`
          );
        }
      });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-primary mb-5">All Sellers</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              {/* <th></th> */}
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map(
              (seller, i) =>
                seller.role === "seller" && (
                  <tr key={seller._id}>
                    {/* <th>{i + 1}</th> */}
                    <td>{seller.name}</td>
                    <td>{seller.email}</td>
                    <td>{seller.role}</td>
                    <td>
                      <button
                        onClick={() => handleDeleteSeller(seller)}
                        className="btn btn-xs btn-error text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllSellers;
