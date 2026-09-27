import { createSlice } from "@reduxjs/toolkit";
import { deleteProducts, getAllProducts } from "./productAction";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    isLoading: false,
  },
  reducers: {
    addProducts: (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    },
    removeProducts: (state) => {
      state.products = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
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

const { addProducts, removeProducts } = productSlice.actions;
export default productSlice.reducer;
