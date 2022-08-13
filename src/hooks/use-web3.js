import { useState, useCallback } from "react";
// import Web3 from "web3";

// const web3 = new Web3(
//   Web3.givenProvider ||
//     "https://rinkeby.infura.io/v3/9497529ebd9b4ccfaabb477128cc6c22"
// );

const useWeb3 = () => {
  const [allowence, setAllowence] = useState(null);

  const getAllowence = useCallback(
    async (contract, account, contarctAddress,applyAllowence) => {
      //   console.log("checkallownce is pending");

      try {
        let tempallowence = await contract.methods
          .allowance(account, contarctAddress)
          .call()
          
        //   .then(res => {
        //     setAllowence(res)
        //   })
        applyAllowence(tempallowence)
        setAllowence(tempallowence);

        return tempallowence;
      } catch (err) {}
      //  return

      //   .then((res) => {
      //     console.log('tempAllowence',res);

      //       // setAllowence(res)
      //         setAllowence(res);

      //     //   return res;
      //   //   return Promise.resolve(res);
      //   })
      // .catch((err) => {
      // });
    },
    []
  );

  return {
    // contract,
    allowence,
    getAllowence,
  };
};

export default useWeb3;
