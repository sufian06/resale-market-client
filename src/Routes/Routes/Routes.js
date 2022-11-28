import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers";
import MyOrders from "../../Pages/Dashboard/MyOrders/MyOrders";
import MyProducts from "../../Pages/Dashboard/MyProducts/MyProducts";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/SignUp/SignUp";
import ViewAll from "../../Pages/ViewAll";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch('http://localhost:5000/category')
      },
      {
        path: '/category/:id',
        element: <PrivateRoute><ViewAll /></PrivateRoute>,
        loader: ({params}) => fetch(`http://localhost:5000/category/${params.id}`)
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
        element: <MyOrders></MyOrders>
      },  
      {
        path: '/dashboard/allusers',
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
      },  
      {
        path: '/dashboard/seller',
        element: <AdminRoute><MyProducts/></AdminRoute>
      },  
    ]
  }
])

export default router;