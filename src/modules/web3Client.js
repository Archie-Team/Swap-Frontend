import Web3 from "web3";

const web3 = new Web3(
  Web3.givenProvider ||
    "https://rinkeby.infura.io/v3/9497529ebd9b4ccfaabb477128cc6c22"
);

export const getCurrentChainId = async () => {
  const currentChainId = await window.ethereum.request({
    method: "eth_chainId",
  });
  return currentChainId;
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

export const approve = async (contarct, amount, account, address) => {
  return await contarct.methods
    .approve(address, amount) //client(owner) address , contarct address
    .send({ from: account })
    .then((res) => {
      console.log(res);
      return Promise.resolve("Successfully approved!");
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(" approve has problem!");
    });
};

export const getTokenBalance = async (contract, account) => {
  return await contract.methods
    .balanceOf(account) //client(owner) address , contarct address
    .call()
    .then((res) => {
      return Promise.resolve(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
