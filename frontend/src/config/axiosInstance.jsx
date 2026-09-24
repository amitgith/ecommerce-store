import axios from "axios";
// import { store } from "../app/store";
export const axiosInstance = axios.create({
  baseURL: "/api/auth",
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = store.getState().auth.accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    console.log("Interceptor error:", error.response?.status);

    const originalReq = error.config;

    if (error.response?.status === 401 && !originalReq._retry) {
      originalReq._retry = true;

      try {
        await axios.post("/api/auth/refresh-token", null, {
          withCredentials: true,
        });

        return axiosInstance(originalReq);
      } catch (refreshError) {
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
