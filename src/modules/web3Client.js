import Web3 from "web3";
// import NFT_abi from "@/assets/files/NFT.json";
import { addresses } from "../modules/addresses";


export const init = () => {
  let provider = window.ethereum;

  const web3 = new Web3(
    Web3.givenProvider
    //  ||
    //  providers.test
  ); //test

  // const NFTContract = new web3.eth.Contract(
  //   // NFT_abi.abi,
  //   // addresses.NFTCollection_Address
  // );

//   return NFTContract;
  // const web3 = new Web3(provider);
};
