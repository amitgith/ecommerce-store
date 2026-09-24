import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./authAction";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: null,
    isLoading: false,
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    addUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    removeUser: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.accessToken = action.payload.accessToken;
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.accessToken = action.payload.accessToken;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export const { addUser, removeUser, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
