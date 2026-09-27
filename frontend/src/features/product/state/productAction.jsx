import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../config/axiosInstance";

export const createProducts = createAsyncThunk(
  "/products/create",
  async (credentials, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.accessToken;

      const res = await axiosInstance.post("/products/create", credentials, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Product creation failed",
      );
    }
  },
);
export const updateProducts = createAsyncThunk(
  "/products/update",
  async ({ id, data }, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.accessToken;

      const res = await axiosInstance.put(`/products/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Update failed",
      );
    }
  },
);
export const getProductById = createAsyncThunk(
  "/products/getById",
  async (id, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.accessToken;

      const res = await axiosInstance.get(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Product not found",
      );
    }
  },
);
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
      const token = thunkApi.getState().auth.accessToken;
      const res = await axiosInstance.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      console.log("DELETE ERROR:", error.response?.data);

      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Delete failed",
      );
    }
  },
);
