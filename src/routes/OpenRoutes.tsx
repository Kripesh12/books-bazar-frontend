import { RouteObject } from "react-router-dom";
import Login from "../Pages/buyer/Login";
import Signup from "../Pages/buyer/Signup";
import SellerLogin from "../Pages/seller/auth/SellerLogin";
import SellerSignup from "../Pages/seller/auth/SellerSignup";
import SellerVerifiedSignup from "../Pages/seller/auth/SellerVerifiedSignup";

const OpenRoutes: RouteObject = {
  path: "/",
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
  ],
};

export default OpenRoutes;
