import Web3 from "web3";

export function fromWei(number) {
  return Web3.utils.fromWei(number, "ether");
}

export function toWei(number) {
  return Web3.utils.toWei(number, "ether");
}
