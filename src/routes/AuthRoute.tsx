import { RouteObject } from "react-router-dom";
import Layout from "../layout/Layout";
import HomePage from "../Pages/buyer/HomePage/HomePage";
import ProductInfo from "../Pages/buyer/ProductInfo/ProductInfo";
import BookByCategory from "../Pages/buyer/BookByCategory/BookByCategory";
import Cart from "../Pages/buyer/cart/cart";
import Checkout from "../Pages/buyer/checkout/Checkout";
import Success from "../Pages/buyer/Message/Success";
import PaymentError from "../Pages/buyer/Message/Error";

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
    {
      path: "cart",
      element: <Cart />,
    },
    {
      path: "checkout/:id",
      element: <Checkout />,
    },
    {
      path: "payment-success",
      element: <Success />,
    },
    {
      path: "payment-error",
      element: <PaymentError />,
    },
  ],
};

export default AuthRoute;
