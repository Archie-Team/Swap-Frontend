import { toWei } from "../modules/web3Wei";

export const setStakeTime = (contract, account) => {
  return async (dispatch) => {
    return await contract.methods
      .setStake()
      .send({ from: account })
      .then((res) => {
        console.log("setStakeTime", res);
        return Promise.resolve(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const setUnStakeTime = (contract, account) => {
  return async (dispatch) => {
    return await contract.methods
      .setWitdraw()
      .send({ from: account })
      .then((res) => {
        console.log("setUnStakeTime", res);

        return Promise.resolve(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const witdrawLP = (contract, account, amount) => {
  return async (dispatch) => {
    console.log("witdrawLP", toWei(amount.toString(), "ether"));
    return await contract.methods
      .witdrawOwnerLP(toWei(amount.toString(), "ether"))
      .send({ from: account })
      .then((res) => {
        console.log("witdrawLP", res);
        return Promise.resolve(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const setReward = (contract, account, amount) => {
  return async (dispatch) => {
    console.log("reward", toWei(amount.toString(), "ether"));
    return await contract.methods
      .setReward(toWei(amount.toString(), "ether"))
      .send({ from: account })
      .then((res) => {
        console.log("setReward", res);
        return Promise.resolve(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
