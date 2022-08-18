import { useState, useCallback } from "react";

const useBalance = () => {
  const [balance, setBalance] = useState(null);

  const getBalance = useCallback(async (contract, account) => {
    await contract.methods
      .balanceOf(account)
      .call()
      .then((res) => {
        setBalance(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return {
    balance,
    getBalance,
  };
};

export default useBalance;
