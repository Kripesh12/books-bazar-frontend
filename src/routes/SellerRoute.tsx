import { RouteObject } from "react-router-dom";
import SellerLayout from "../layout/SellerLayout";
import SellerHomePage from "../Pages/seller/SellerHomePage";
import ListBook from "../Pages/seller/ListBook/ListBook";
import ListNewBook from "../Pages/seller/ListBook/ListNewBook";
import EditBook from "../Pages/seller/ListBook/EditBook";

const SellerRoute: RouteObject = {
  path: "/seller",
  element: <SellerLayout />,
  children: [
    {
      index: true,
      path: "dashboard",
      element: <SellerHomePage />,
    },
    {
      path: "list-book",
      element: <ListBook />,
    },
    {
      path: "list-new-book",
      element: <ListNewBook />,
    },
    {
      path: "edit-book",
      element: <EditBook />,
    },
  ],
};

export default SellerRoute;
