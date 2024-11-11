import { RouteObject } from "react-router-dom";
import Layout from "../layout/Layout";
import HomePage from "../Pages/buyer/HomePage/HomePage";
import ProductInfo from "../Pages/buyer/ProductInfo/ProductInfo";
import BookByCategory from "../Pages/buyer/BookByCategory/BookByCategory";

const AuthRoute: RouteObject = {
  path: "/",
  element: <Layout />,
  children: [
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: "product-info/:id",
      element: <ProductInfo />,
    },
    {
      path: "books/:genre/:id",
      element: <BookByCategory />,
    },
  ],
};

export default AuthRoute;
