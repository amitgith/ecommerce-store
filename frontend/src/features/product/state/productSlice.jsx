import { createSlice } from "@reduxjs/toolkit";

import {
  createProducts,
  deleteProducts,
  getAllProducts,
  getProductById,
} from "./productAction";

const productSlice = createSlice({
  name: "products",

  initialState: {
    products: [],
    selectedProduct: null,
    isLoading: false,
  },

  reducers: {
    addProducts: (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    },

    removeProducts: (state) => {
      state.products = [];
      state.selectedProduct = null;
      state.isLoading = false;
    },
  },

  extraReducers: (builder) => {
    builder

      // Create Product
      .addCase(createProducts.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(createProducts.fulfilled, (state, action) => {
        state.products.push(action.payload.data.product);
        state.isLoading = false;
      })

      .addCase(createProducts.rejected, (state) => {
        state.isLoading = false;
      })

      // Get All Products
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.products = action.payload.data.products;
        state.isLoading = false;
      })

      .addCase(getAllProducts.rejected, (state) => {
        state.isLoading = false;
      })

      // Get Product By ID
      .addCase(getProductById.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload.data;
        state.isLoading = false;
      })

      .addCase(getProductById.rejected, (state) => {
        state.isLoading = false;
      })

      // Delete Product
      .addCase(deleteProducts.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(deleteProducts.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product._id !== action.meta.arg,
        );

        state.isLoading = false;
      })

      .addCase(deleteProducts.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { addProducts, removeProducts } = productSlice.actions;

export default productSlice.reducer;
