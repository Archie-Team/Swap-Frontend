export const getPostionNumbers = (account, stakeContract) => {
  return async (dispatch) => {
    return await stakeContract.methods
      .positions(account)
      .call()
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getPosition = (stakeContract, number, account) => {
  return async (dispatch) => {
    return await stakeContract.methods
      .getAll(account, number)
      .call({ from: account })
      .then((res) => {
        let data = {
          LPTokenBalnce: res.LPTokenBalnce,
          deadLine: res.deadLine,
          choise: res.choise,
          reward: res.reward,
        };

        return Promise.resolve(res);
      })
      .catch("get position has error");
  };
};

export const getNewStakePositions = (stakeContract, account) => {
  // console.log("stakemethods", stakeContract.methods);
  return async (dispatch) => {
    return await stakeContract.methods
      .getAll(account)
      .call({ from: account })
      .then((res) => {
        console.log("getNewStakePositions", res);
        let data = {
          percentShares: res.percentShares,
          shares: res.shares,
          value: res.value,
          // reward: res.reward,
        };
        return Promise.resolve(data);
      })
      .catch((err) => {
        return Promise.reject("get position has error");
        // console.log("get position has error");
      });
  };
};

export const unstakePosition = (account, stakeContract) => {
  return async (dispatch) => {
    return await stakeContract.methods
      .unstake()
      .send({ from: account })
      .then(async (res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  };
};

export const getReward = (account, stakeContract) => {
  return async (dispatch) => {
    return await stakeContract.methods
      .getReward(account)
      .send({ from: account })
      .then(async (res) => {
        console.log("get reward", res);
        return Promise.resolve(res);
      })
      .catch((err) => {
        console.log("err");
        return Promise.reject(err);
      });
  };
};

// export const getRewardValue = (account, stakeContract) => {
//   return async (dispatch) => {
//     return await stakeContract.methods
//       .getReward(account)
//       .send({ from: account })
//       .then(async (res) => {
//         console.log("get reward", res);
//         return Promise.resolve(res);
//       })
//       .catch((err) => {
//         console.log("err");
//         return Promise.reject(err);
//       });
//   };
// };

export const startWithdrawTimestamp = (stakeContract) => {
  return async (dispatch) => {
    // console.log(stakeContract);
    return await stakeContract.methods
      .startWitdrawTimestamp()
      .call()
      .then((res) => {
        // console.log("startWithdrawTimestamp", res);
        return Promise.resolve(res);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  };
};

export const getIsStartedStake = (stakeContract) => {
  return async (dispatch) => {
    return await stakeContract.methods
      .isStartedStake()
      .call()
      .then((res) => {
        console.log("getIsStartedStake", res);
        return Promise.resolve(res);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  };
};

export const getIsStartedWithdraw = (stakeContract) => {
  return async (dispatch) => {
    console.log(stakeContract);
    return await stakeContract.methods
      .isStartedWitdraw()
      .call()
      .then((res) => {
        console.log("getIsStartedWithdraw", res);
        return Promise.resolve(res);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  };
};
