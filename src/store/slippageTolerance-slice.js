import { createSlice } from "@reduxjs/toolkit";

const slippageToleranceSlice = createSlice({
  name: "slippageTolerance",
  initialState: {
    slippageTolerance: 2,
  },
  reducers: {
    setSlippageTolerance(state, action) {
      state.slippageTolerance = action.payload;
    },
  },
});

export const sTolActions = slippageToleranceSlice.actions;

export default slippageToleranceSlice;