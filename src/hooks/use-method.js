import { useState, useCallback } from "react";

const useMethod = () => {
  const [value, setValue] = useState(null);

  const methodCall = useCallback(
    async (contract, account, methodName, type) => {
      if (type === "call") {
        await contract.methods[methodName](account)
          .call()
          .then((res) => {
            setValue(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        await contract.methods[methodName](account)
          .send()
          .then((res) => {
            setValue(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    []
  );

  return {
    balance,
    getBalance,
  };
};

export default useMethod;
