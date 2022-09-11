export const getTotalValueLockLPToken = (stakeContract) => {
  return async (dispatch) => {
    return await stakeContract.methods
      .totalValueLuckLPToken()
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
