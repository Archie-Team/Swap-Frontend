import { configureStore } from "@reduxjs/toolkit";

import wallet from "./wallet-slice";
import auth from "./auth-slice";
import slippageTolerance from "./slippageTolerance-slice";

const store = configureStore({
  reducer: {
    wallet: wallet.reducer,
    auth: auth.reducer,
    sTol: slippageTolerance.reducer,
  },
});

export default store;
