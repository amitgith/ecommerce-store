import { configureStore } from "@reduxjs/toolkit";
import appRoutes from "../features/auth/state/authSlice";
export const store = configureStore({
  reducer: {
    auth: appRoutes,
  },
});
