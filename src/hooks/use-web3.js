import { useCallback } from "react";

const useWeb3 = () => {
  const getAllowence = useCallback(
    async (contract, account, contarctAddress, applyAllowence) => {
      await contract.methods
        .allowance(account, contarctAddress)
        .call()
        .then(async (res) => {
          await applyAllowence(res);
        });
    },
    []
  );

  const approve = useCallback(
    async (contract, amount, account, address, setResult) => {
      return await contract.methods
        .approve(address, amount) //client(owner) address , contarct address
        .send({ from: account })
        .then((res) => {
          setResult("Successfully approved!");
        });
    },
    []
  );

  return {
    getAllowence,
    approve,
  };
};

export default useWeb3;
