import { createBrowserRouter } from "react-router-dom";
import AuthRoute from "./AuthRoute";
import SellerRoute from "./SellerRoute";
import OpenRoutes from "./OpenRoutes";
const router = createBrowserRouter([OpenRoutes, AuthRoute, SellerRoute]);
export default router;
