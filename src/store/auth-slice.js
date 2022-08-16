import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    account: "",
  },
  reducers: {
    login(state, action) {
      state.account = action.payload;
    },
    logout(state, action) {
      state.account = "";
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
