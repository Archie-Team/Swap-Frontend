import React, { useEffect, useState } from "react";
import BULKSwap from "../components/swap/BULCSwap";
import BUSDSwap from "../components/swap/BUSDSwap";
import MainCard from "../components/layout/MainCard";
import "./Swap.css";
import { MdSwapVert } from "react-icons/md";
import Web3 from "web3";


const Swap = () => {
  const [swapState, setSwapState] = useState("BUSD_to_BULK"); //2 state od BUSD_to_BULK and BULK_to_BUSD

  useEffect( () => {

    const web3 = new Web3(
      Web3.givenProvider
      //  ||
      //  providers.test
    ); //test
  
    // const networkId = await web3.eth.net.getId();
    // const nftContract = new web3.eth.Contract(NFTContractBuild.abi,NFTContractBuild.networks[networkId].address
    // await this.NFTContract.methods
    //   .revealed()
    //   .call()
    //   .then((res) => {
    //   });

    // const tokenAddress = "0x0d8775f648430679a709e98d2b0cb6250d"


// The minimum ABI required to get the ERC20 Token balance
const minABI = [
  // balanceOf
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
];
const tokenAddress = "0x0d8775f648430679a709e98d2b0cb6250d2887ef";
// const walletAddress = "0x1cf56Fd8e1567f8d663e54050d7e44643aF970Ce";

const contract = new web3.eth.Contract(minABI, tokenAddress);



// async function getBalance() {
  const result =  contract.methods.balanceOf('0xccfC48733331FDE696A5058DbEBC4574a18464c5').call(); // 29803630997051883414242659
  console.log(result);

    // web3.eth
    //   .getBalance("0xccfC48733331FDE696A5058DbEBC4574a18464c5")
    //   .then(res => console.log(res));

  }, []);

  const changeSwapState = () => {
    swapState === "BUSD_to_BULK"
      ? setSwapState("BULK_to_BUSD")
      : setSwapState("BUSD_to_BULK");
  };

  return (
    <MainCard className="swap-card">
      <div
        className="token-swap__containers"
        style={{
          ...(swapState === "BULK_to_BUSD"
            ? {
                flexDirection: "column-reverse",
              }
            : {}),
        }}
      >
        <BUSDSwap role={swapState === "BUSD_to_BULK" ? "sender" : ""} />
        <button className="swap-icon" onClick={changeSwapState}>
          <MdSwapVert />
        </button>
        <BULKSwap role={swapState === "BULK_to_BUSD" ? "sender" : ""} />
      </div>

      <div className="swap-actions">
        <button className="main-button">Swap</button>
      </div>
    </MainCard>
  );
};

export default Swap;
