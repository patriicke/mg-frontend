import axios from "axios";
import { toast } from "react-toastify";

const baseURL = process.env.REACT_APP_API_BASE_URI;

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: `${baseURL}`,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;
    const responseData = error.response?.data?.errors?.detail;
    const responseStatus = error.response?.status;
    // check for token expired error
    if (responseStatus === 403 && responseData === 'tokenExpired') {
      if (!originalConfig._retry) {
        originalConfig._retry = true;
        try {
          await axiosInstance.post("/auth/refresh-token", {}, { withCredentials: true });
          return axiosInstance(originalConfig);
        } catch (error) {
          await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
          toast.error(`Your session has expired!`);
          window.localStorage.removeItem("isLoggedIn");
          setTimeout(() => {
            if (window.location.pathname !== "/") {
              window.location.href = "/";
            }
          }, 2000);
          return;
          // return Promise.reject(error);
        }
      }
      return {
        ...originalConfig,
        cancelToken: new axios.CancelToken((cancel) =>
          cancel("Cancel repeated request")
        ),
      };
    } else if (responseStatus === 401 && responseData.code === 1005) {
      // send to login page
      window.localStorage.removeItem("sessionmessage");
      window.localStorage.removeItem("isLoggedIn");
      window.localStorage.removeItem("profile");
      window.location.href = "/login";
    } else if (responseStatus === 403 && window.location.pathname !== "/403") {
      window.location.href = "/403";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
