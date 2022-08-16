import { configureStore } from "@reduxjs/toolkit";

import wallet from "./wallet-slice";
import auth from "./auth-slice";

const store = configureStore({
  reducer: { wallet: wallet.reducer, auth: auth.reducer },
});

export default store;
