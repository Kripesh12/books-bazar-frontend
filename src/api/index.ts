import axios from "axios";
import useSellerAuthStore from "../providers/useSellerAuthStore";
import useBuyerAuthStore from "../providers/useBuyerAuthStore";

const baseURL = "http://192.168.1.65:3000/api/v1";

//For Buyer
export const axiosBuyerPrivateInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

//For Seller
export const axiosPrivateInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

//Open
export const axiosPublicInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

//Buyer
axiosBuyerPrivateInstance.interceptors.request.use(
  (request) => {
    const accessToken = useBuyerAuthStore.getState().accessToken;
    if (accessToken) {
      request.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosBuyerPrivateInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
      try {
        const refreshToken = localStorage.getItem("rTokenCustomer");
        const response = await axios.post(
          `${baseURL}/auth/refresh-token`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );
        const accessToken = response.data;
        const setAcessToken = useBuyerAuthStore.getState().setAccessToken;
        setAcessToken(accessToken);
        const setIsAuth = useBuyerAuthStore.getState().setIsAuth;
        setIsAuth(true);
        axiosPrivateInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        return axiosPrivateInstance(originalRequest); // Retry the original request with the new access token.
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        localStorage.removeItem("rToken");
        // window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

//Seller
axiosPrivateInstance.interceptors.request.use(
  (request) => {
    const accessToken = useSellerAuthStore.getState().accessToken;
    if (accessToken) {
      request.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosPrivateInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
      try {
        const refreshToken =
          localStorage.getItem("rToken") || sessionStorage.getItem("rToken");
        const response = await axios.post(
          `${baseURL}/auth/refresh-token`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );
        console.log("Console From R token: ", response);
        const accessToken = response.data;
        const setAcessToken = useSellerAuthStore.getState().setAccessToken;
        setAcessToken(accessToken);
        const setIsAuth = useSellerAuthStore.getState().setIsAuth;
        setIsAuth(true);
        axiosPrivateInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        return axiosPrivateInstance(originalRequest); // Retry the original request with the new access token.
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        localStorage.removeItem("rToken");
        // window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
