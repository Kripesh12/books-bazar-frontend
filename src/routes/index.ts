import { createBrowserRouter } from "react-router-dom";
import AuthRoute from "./AuthRoute";
import SellerRoute from "./SellerRoute";
const router = createBrowserRouter([AuthRoute, SellerRoute]);
export default router;
