import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import Blog from "../../Pages/Blog/Blog";
import AddProduct from "../../Pages/Dashboard/AddProduct/AddProduct";
import AllBuyers from "../../Pages/Dashboard/AllUsers/AllBuyers";
import AllSellers from "../../Pages/Dashboard/AllUsers/AllSellers";
import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers";
import MyOrders from "../../Pages/Dashboard/MyOrders/MyOrders";
import MyProducts from "../../Pages/Dashboard/MyProducts/MyProducts";
import Payment from "../../Pages/Dashboard/Payment/Payment";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import ErrorPage from "../../Pages/Shared/ErrorPage/ErrorPage";
import SignUp from "../../Pages/SignUp/SignUp";
import ViewAll from "../../Pages/ViewAll";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch('https://resale-market-server-zeta.vercel.app/category')
      },
      {
        path: "/blog",
        element: <Blog />
      },
      {
        path: '/category/:id',
        element: <PrivateRoute><ViewAll /></PrivateRoute>,
        loader: ({params}) => fetch(`https://resale-market-server-zeta.vercel.app/category/${params.id}`)
      },
      {
        path: "/signup",
        element: <SignUp />
      },
      {
        path: "/login",
        element: <Login />
      },
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      {
        path: '/dashboard/buyer',
        element: <AdminRoute><MyOrders></MyOrders></AdminRoute>
      },  
      {
        path: '/dashboard/allusers',
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
      },  
      {
        path: '/dashboard/allbuyers',
        element: <AdminRoute><AllBuyers></AllBuyers></AdminRoute>
      },  
      {
        path: '/dashboard/allsellers',
        element: <AdminRoute><AllSellers></AllSellers></AdminRoute>
      },  
      {
        path: '/dashboard/seller',
        element: <AdminRoute><MyProducts/></AdminRoute>
      },  
      {
        path: '/dashboard/addproduct',
        element: <AdminRoute><AddProduct/></AdminRoute>
      },  
      {
        path: '/dashboard/payment/:id',
        element: <AdminRoute><Payment/></AdminRoute>,
        loader: ({params}) => fetch(`https://resale-market-server-zeta.vercel.app/bookings/${params.id}`)
      },  
    ]
  }
])

export default router;