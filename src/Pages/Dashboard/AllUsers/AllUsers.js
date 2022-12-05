import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import useTitle from "../../../hooks/useTitle";

const AllUsers = () => {
  useTitle('All Users');
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("https://resale-market-server-zeta.vercel.app/users");
      const data = await res.json();
      return data;
    },
  });

  const handleMakeAdmin = (id) => {
    fetch(`https://resale-market-server-zeta.vercel.app/users/admin/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Make admin successful");
          refetch();
        }
      });
  };

  const handleDeleteUser = (user) => {
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
      <h2 className="text-xl font-semibold text-primary mb-5">All Users</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Role</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user._id}>
                <th>{i + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user?.role !== "admin" && (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="btn btn-xs btn-primary"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
                <td>
                  <button onClick={() => handleDeleteUser(user)} className="btn btn-xs btn-error text-white">
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

export default AllUsers;
