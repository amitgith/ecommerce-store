import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../config/axiosInstance";
export const registerUser = createAsyncThunk(
  "/auth/register",
  async (credentials, thunkApi) => {
    try {
      const res = await axiosInstance.post("/auth/register", credentials);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Registration failed",
      );
    }
  },
);
export const loginUser = createAsyncThunk(
  "/auth/login",
  async (credentials, thunkApi) => {
    try {
      const res = await axiosInstance.post("/auth/login", credentials);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);
export const currentLoggedUser = createAsyncThunk(
  "/auth/me",
  async (_, thunkApi) => {
    try {
      const res = await axiosInstance.get("/auth/me");
      return res.data.data.user;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);
export const refreshAccessToken = createAsyncThunk(
  "/auth/refresh-token",
  async (_, thunkApi) => {
    try {
      const res = await axiosInstance.post("/auth/refresh-token");
      return res.data.accessToken;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Session expired",
      );
    }
  },
);
export const logoutUser = createAsyncThunk(
  "/auth/logout",
  async (credentials, thunkApi) => {
    try {
      const res = await axiosInstance.post("/auth/logout", credentials);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Logout failed",
      );
    }
  },
);
