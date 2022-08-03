import Web3 from "web3";

export function fromWei(number) {
  return number ? Web3.utils.fromWei(number, "ether") : 0;
}

export function toWei(number) {
  return  number ? Web3.utils.toWei(number, "ether") : 0;
}
