import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "/api/auth",
  withCredentials: true,
});

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     console.log("Interceptors error->", error.response.status);
//     let originalReq = error.config;
//     if (error.response.status === 401 && !originalReq.retry) {
//       originalReq._retry = true;
//       try {
//         await axiosInstance.post("/refresh-token");
//         return axiosInstance(originalReq);
//       } catch (error) {
//         window.location.href = "/";
//         return Promise.reject(error);
//       }
//     }
//   },
// );
