import { RouteObject } from "react-router-dom";
import Layout from "../layout/Layout";
import HomePage from "../Pages/buyer/HomePage/HomePage";
import ProductInfo from "../Pages/buyer/ProductInfo/ProductInfo";

const AuthRoute: RouteObject = {
  path: "/",
  element: <Layout />,
  children: [
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: "product-info",
      element: <ProductInfo />,
    },
  ],
};

export default AuthRoute;
