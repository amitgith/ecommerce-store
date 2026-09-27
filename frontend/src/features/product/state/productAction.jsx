import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../config/axiosInstance";

export const getAllProducts = createAsyncThunk(
  "/products/allProducts",
  async (credentials, thunkApi) => {
    try {
      const res = await axiosInstance.get("/products/allProducts", credentials);
      console.log(res.data.data.products);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const deleteProducts = createAsyncThunk(
  "/products/:id",
  async (id, thunkApi) => {
    try {
      const res = await axiosInstance.delete(`/products/${id}`);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
