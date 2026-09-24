import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../config/axiosInstance";
export const registerUser = createAsyncThunk(
  "/register",
  async (credentials, thunkApi) => {
    try {
      const res = await axiosInstance.post("/register", credentials);
      console.log(res.data);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  },
);
export const loginUser = createAsyncThunk(
  "/login",
  async (credentials, thunkApi) => {
    try {
      const res = await axiosInstance.post("/login", credentials);
      console.log(res);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  },
);
export const currentLoggedUser = createAsyncThunk(
  "/me",
  async (_, thunkApi) => {
    try {
      const res = await axiosInstance.get("/me");
      console.log(res.data);
      return res.data.data.user;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  },
);
