import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    account: "",
    owner: "0x359093423404DC7F9a64E05B6C64327aEbadDa45",
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
