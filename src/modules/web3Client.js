import Web3 from "web3";
// import swap_abi from "../assets/files/Swap.json";
// import ERC20_abi from "../assets/files/ERC20.json";
// providers

import { addresses } from "../modules/addresses";
import { providers } from "./providers";


// const web3 = new Web3(
//   // Web3.givenProvider  || 
//   Web3.givenProvider ||
//   'https://data-seed-prebsc-2-s3.binance.org:8545'
// );

const web3 = new Web3(
  Web3.givenProvider ||
  'https://rinkeby.infura.io/v3/9497529ebd9b4ccfaabb477128cc6c22'
);

export const initContract = async (abi,address) => {
  const contract = await new web3.eth.Contract(
    abi,
    address
  );

  return contract;
};


export const checkAllowence = async (contract, account, contarctAddress) => {
  return await contract.methods
    .allowance(account, contarctAddress) //client(owner) address , contarct address
    .call()
    .then((res) => {
      return Promise.resolve(res);
    })
    .catch((err) => {
      console.log(err);
    });
};


export const approve = async (contarct, amount,account) => {
  await contarct.methods
    .approve(addresses.contract_Address, amount) //client(owner) address , contarct address
    .send({ from: account })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};