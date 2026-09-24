import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "/api/auth",
  withCredentials: true,
});
