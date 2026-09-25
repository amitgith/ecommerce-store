import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../config/axiosInstance";
export const registerUser = createAsyncThunk(
  "/register",
  async (credentials, thunkApi) => {
    try {
      const res = await axiosInstance.post("/register", credentials);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Registration failed",
      );
    }
  },
);
export const loginUser = createAsyncThunk(
  "/login",
  async (credentials, thunkApi) => {
    try {
      const res = await axiosInstance.post("/login", credentials);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);
export const currentLoggedUser = createAsyncThunk(
  "/me",
  async (_, thunkApi) => {
    try {
      const accessToken = thunkApi.getState().auth.accessToken;
      const res = await axiosInstance.get("/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return res.data.data.user;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);
export const refreshAccessToken = createAsyncThunk(
  "/refresh-token",
  async (_, thunkApi) => {
    try {
      const res = await axiosInstance.post("/refresh-token");
      return res.data.accessToken;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Session expired",
      );
    }
  },
);
export const logoutUser = createAsyncThunk(
  "/logout",
  async (credentials, thunkApi) => {
    try {
      const res = await axiosInstance.post("/logout", credentials);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Logout failed",
      );
    }
  },
);
