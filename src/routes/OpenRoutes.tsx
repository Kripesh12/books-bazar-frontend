import { RouteObject } from "react-router-dom";
import Login from "../Pages/buyer/auth/Login";
import Signup from "../Pages/buyer/auth/Signup";
import SellerLogin from "../Pages/seller/auth/SellerLogin";
import SellerSignup from "../Pages/seller/auth/SellerSignup";
import SellerVerifiedSignup from "../Pages/seller/auth/SellerVerifiedSignup";
import Layout from "../layout/Layout";
import Verified from "../Pages/buyer/auth/Verified";

const OpenRoutes: RouteObject = {
  path: "/",
  element: <Layout />,
  children: [
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "signup",
      element: <Signup />,
    },
    {
      path: "seller-login",
      element: <SellerLogin />,
    },
    {
      path: "seller-signup",
      element: <SellerSignup />,
    },
    {
      path: "seller-verified/:token",
      element: <SellerVerifiedSignup />,
    },
    {
      path: "customer-verified/:token",
      element: <Verified />,
    },
  ],
};

export default OpenRoutes;
