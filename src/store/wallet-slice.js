import { createSlice } from "@reduxjs/toolkit";

const walletSlice = createSlice({
  name: "ui",
  initialState: { networkId: 0 },
  reducers: {
    setCurrentNetworkId(state, action) {
      state.networkId = action.payload;
    },
  },
});

export const walletActions = walletSlice.actions;

export default walletSlice;
