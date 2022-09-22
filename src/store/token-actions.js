export const getToatalValueLocked = (pairContract) => {
  return async (dispatch) => {
    return await pairContract.methods
      .getReserves()
      .call()
      .then((res) => {
        return res[1];
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getTotalTokenSupply = (BULCContract) => {
  return async (dispatch) => {
    // console.log(BULCContract);
    return await BULCContract.methods
      .totalSupply()
      .call()
      .then((res) => {
        console.log("getTotalTokenSupply", res);
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getTotalValueLockLPToken = (stakeContract) => {
  return async (dispatch) => {
    return await stakeContract.methods
      .totalValueLockLPToken()
      .call()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getAllStakedBalance = (stakeContract2) => {
  return async (dispatch) => {
    return await stakeContract2.methods
      .allStakedBalance()
      .call()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getPositions = (contract) => {
  return async (dispatch) => {
    return await contract.methods
      .getPositions()
      .call()
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const unstakePosition = async (index, account, stakeContract) => {
  return await stakeContract.methods
    .unstake(index)
    .send({ from: account })
    .then(async (res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
