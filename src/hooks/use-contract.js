import { useCallback } from "react";
import Web3 from "web3";

// const web3 = new Web3(
//   Web3.givenProvider ||
//     "https://rinkeby.infura.io/v3/9497529ebd9b4ccfaabb477128cc6c22"
// );

const web3 = new Web3(window.ethereum);

const useContract = () => {
  const getContract = useCallback(async (abi, address, setContract) => {
    try {
      const initialContract = await new web3.eth.Contract(abi, address);
      setContract(initialContract);
    } catch (err) {
      console.log("err");
    }
  }, []);

  return {
    getContract,
  };
};

export default useContract;
