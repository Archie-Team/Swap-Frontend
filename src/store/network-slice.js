import { createSlice } from "@reduxjs/toolkit";

const networkSlice = createSlice({
  name: "ui",
  initialState: { networkId: 0 },
  reducers: {
    setCurrentNetworkId(state, action) {
      state.networkId = action.payload;
    },
  },
});

export const networkActions = networkSlice.actions;

export default networkSlice;
