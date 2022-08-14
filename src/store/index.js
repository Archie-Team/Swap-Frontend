import { configureStore } from '@reduxjs/toolkit';

import network from './network-slice';

const store = configureStore({
  reducer: { network: network.reducer },
});

export default store;