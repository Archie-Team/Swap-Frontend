import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  stakeContract: null,
};

// export const loadConfig = () => {
//   return async (dispatch) => {
//     fetch("/api/config")
//       .then((response) => response.json())
//       .then((json) => {
//         dispatch(received(json));
//       });
//   };
// };

export const contractSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    // received: (state, { payload }) => {
    //   state.name = payload.name;
    //   state.infuraId = payload.infura_id;
    //   state.chainId = payload.chain_id;
    //   state.networkName = payload.network_name;
    //   state.usdtContractAddress = payload.usdt_contract_address;
    // },
  },
});

export const {} = contractSlice.actions;

export default contractSlice.reducer;
