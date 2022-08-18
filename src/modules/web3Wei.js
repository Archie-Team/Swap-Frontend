import Web3 from "web3";

export function fromWei(number, unit) {
  return number ? Web3.utils.fromWei(number, unit) : 0;
}

export function toWei(number, unit) {
  return number ? Web3.utils.toWei(number, unit) : 0;
}
