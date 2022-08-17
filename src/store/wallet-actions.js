import { walletActions } from "./wallet-slice";
import { authActions } from "./auth-slice";
import { networksId, usedNetworkId } from "../modules/networks";

export const getCurrentNetworkId = () => {
  return async (dispatch) => {
    try {
      const networkId = await window.ethereum.request({
        method: "eth_chainId",
      });
      dispatch(walletActions.setCurrentNetworkId(networkId));

      if (networkId !== usedNetworkId) {
        dispatch(switchNetwork(usedNetworkId));
      }
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

export const getCurrentAccount = () => {
  return async (dispatch) => {
    await window.ethereum.request({ method: "eth_accounts" }).then((res) => {
      if (res[0]) dispatch(authActions.login(res[0]));
    });
  };
};

export const ethRequestAccounts = () => {
  return async (dispatch) => {
    await window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then((res) => {
        dispatch(authActions.login(res[0]));
      });
  };
};
