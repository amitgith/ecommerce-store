import { configureStore } from "@reduxjs/toolkit";
import appRoutes from "../features/auth/state/authSlice";
import productRoutes from "../features/product/state/productSlice";

export const store = configureStore({
  reducer: {
    auth: appRoutes,
    products: productRoutes,
  },
});
