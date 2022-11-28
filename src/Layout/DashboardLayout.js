import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const DashboardLayout = () => {
  const {user} = useContext(AuthContext)
  const [isAdmin] = useAdmin(user?.email);
  return (
    <div>
      <Navbar />
      <div className="max-w-[1440px] mx-auto">
        <div className="drawer drawer-mobile">
          <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <Outlet />
          </div>
          <div className="drawer-side">
            <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
            <ul className="menu p-4 pt-0 w-80 bg-base-100 text-base-content">
              {/* <!-- Sidebar content here --> */}
              {
                isAdmin?.role === 'buyer' && <>
                <li><Link to='/dashboard/buyer'>My Orders</Link></li>
                </>
              }
              {
                isAdmin?.role === 'seller' && <>
                <li><Link to='/dashboard/seller'>My Products</Link></li>
                </>
              }
              {
                isAdmin?.role === 'admin' && <>
                  <li><Link to='/dashboard/allusers'>All Users</Link></li>
                </>
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
