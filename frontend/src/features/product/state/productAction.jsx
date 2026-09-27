import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../config/axiosInstance";

export const getAllProducts = createAsyncThunk(
  "/products/allProducts",
  async (credentials, thunkApi) => {
    try {
      const res = await axiosInstance.get("/products/allProducts", credentials);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
export const deleteProducts = createAsyncThunk(
  "/products/delete",
  async (id, thunkApi) => {
    try {
      console.log("DELETE ID:", id);

      const token = thunkApi.getState().auth.accessToken;
      console.log("TOKEN:", token);

      const res = await axiosInstance.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("DELETE RESPONSE:", res.data);

      return res.data;
    } catch (error) {
      console.log("DELETE ERROR:", error.response?.data);

      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Delete failed",
      );
    }
  },
);
