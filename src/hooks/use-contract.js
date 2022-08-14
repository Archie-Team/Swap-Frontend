import { useState, useCallback } from "react";
import Web3 from "web3";

const web3 = new Web3(
  Web3.givenProvider ||
    "https://rinkeby.infura.io/v3/9497529ebd9b4ccfaabb477128cc6c22"
);

const useContract = () => {
  const [contract, setContract] = useState(null);
  const getContract = useCallback(async (abi, address) => {
    try {
      const initialContract = await new web3.eth.Contract(abi, address);
      setContract(initialContract);
    } catch (err) {
      console.log("err");
    }
  }, []);

  return {
    contract,
    getContract,
  };
};

export default useContract;
