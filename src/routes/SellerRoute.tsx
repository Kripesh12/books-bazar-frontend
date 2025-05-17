import { RouteObject } from "react-router-dom";
import SellerLayout from "../layout/SellerLayout";
import SellerHomePage from "../Pages/seller/SellerHomePage";
import ListBook from "../Pages/seller/ListBook/ListBook";
import ListNewBook from "../Pages/seller/ListBook/ListNewBook";
import EditBook from "../Pages/seller/ListBook/EditBook";

import ListCategories from "../Pages/seller/ListCategory/ListCategory";
import AddCategory from "../Pages/seller/ListCategory/AddCategory";
import EditCategory from "../Pages/seller/ListCategory/EditCategory";
import ListSoldBook from "../Pages/seller/ListSoldBook/ListSoldBook";

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
      path: "sold-books",
      element: <ListSoldBook />,
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
    {
      path: "list-category",
      element: <ListCategories />,
    },
    {
      path: "add-category",
      element: <AddCategory />,
    },
    {
      path: "edit-category",
      element: <EditCategory />,
    },
  ],
};

export default SellerRoute;
