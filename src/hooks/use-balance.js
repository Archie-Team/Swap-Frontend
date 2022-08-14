import { useState, useCallback } from "react";
// import Web3 from "web3";

// const web3 = new Web3(
//   Web3.givenProvider ||
//     "https://rinkeby.infura.io/v3/9497529ebd9b4ccfaabb477128cc6c22"
// );

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
