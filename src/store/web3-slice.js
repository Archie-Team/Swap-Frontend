import { createSlice } from "@reduxjs/toolkit";

const web3Slice = createSlice({
  name: "web3",
  initialState: {  },
  reducers: {
    handleChainChanged(state, action) {
        
    },

    networkChanged(state, action) {
    
    },
    handleAccountsChanged(state, action) {
   
    },
    //  handleChainChanged(state, action) {
   
    // },

  },
});

export const web3Actions = web3Slice.actions;

export default web3Slice;
