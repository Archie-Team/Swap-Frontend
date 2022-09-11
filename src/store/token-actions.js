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
    console.log(BULCContract);
    return await BULCContract.methods
      .totalSupply()
      .call()
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
