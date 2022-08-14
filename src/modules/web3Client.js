export const getCurrentChainId = async () => {
  const currentChainId = await window.ethereum.request({
    method: "eth_chainId",
  });
  return currentChainId;
};