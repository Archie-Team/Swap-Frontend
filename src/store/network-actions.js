import { networkActions } from "./network-slice";

export const getCurrentNetworkId = () => {
  return async (dispatch) => {
    try {
      const networkId = await window.ethereum.request({
        method: "eth_chainId",
      });
      dispatch(networkActions.setCurrentNetworkId(networkId));
    } catch (error) {}
  };
};

export const switchNetwork = (id) => {
  return async () => {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: id }],
    });
    window.location.reload();
  };
};
