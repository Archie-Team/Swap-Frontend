import React, { useEffect, useState } from "react";
import MainCard from "../components/layout/MainCard";
import "./Swap.css";
import { MdSwapVert } from "react-icons/md";
import CoinField from "../components/swap/CoinField";
import { coins } from "../modules/coins";
import { addresses } from "../modules/addresses";
import Web3 from "web3";
import { initContract, initERC20 } from "../modules/web3Client";

const Swap = () => {
  const [contract, setContract] = useState(null);

  const [tokenContarct, setTokenContarct] = useState(null);

  const [coin1, setCoin1] = useState(coins.BUSD);
  const [coin2, setCoin2] = useState(coins.BULC);

  const [coin1Amount, setCoin1Amount] = useState(coins.BUSD);
  const [coin2Amount, setCoin2Amount] = useState(coins.BULC);

  useEffect(() => {
    const func = initContract();
    setContract(func);
    initBUSDContarct();
  }, []);

  const changeFirstCoinHandler = async (input) => {
    // swapTokensForExactTokens --> for first coin
    //  swapExactTokensForTokens --> for sec coin
    // const BigNumber = require('bignumber.js');
    // let x = new BigNumber(10000000000000000000000000);
    // let x = bignumber(20000000000000000000000000)
    // console.log(200000000000000000000000000000);
    // let x = 200000000000000;
    // let y = 2* pow(10,18);

    let test = input.value.toString();
    // const test = "0.001";

    if (test === "0") return;

    let data = Web3.utils.toWei(test, "ether"); //fromwei
    setCoin1Amount(data);

    await contract.methods
      .getAmountsIn(data, [coin1.address, coin2.address]) //execute amount of second (amount, convertible token address, result token address)
      .call()
      .then((res) => {
        console.log(res);
      });
  };

  const changeSecCoinHandler = async (input) => {
    // swapTokensForExactTokens --> for first coin
    //  swapExactTokensForTokens --> for sec coin

    console.log(input);
    await contract.methods
      .getAmountsOut(2000, [coin1.address, coin2.address]) //execute amount of second (amount, convertible token address, result token address)
      .call()
      .then((res) => {
        console.log(res);
      });
  };

  const initBUSDContarct = async () => {
    const tempContract = await initContract('0x3afC77D320CB164134FC5afD73B8dB453813094a');
    setTokenContarct(tempContract);
  };

  const approvePair = async (contarct, amount) => {
    console.log(tokenContarct);
    await tokenContarct.methods
      .approve(addresses.pair_address, "5000000000000000000000000") //client(owner) address , contarct address
      .send({ from: "0xccfC48733331FDE696A5058DbEBC4574a18464c5" })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const swapFirst = async (input) => {
    // await approvePair() //approve first tken (coin)
    console.log(contract);
    // console.log(coin1.address);
    // console.log(coin2.address);
    await contract.methods
      .swapTokensForExactTokens(
        1,
        11, //ask from client
        ["0x3afC77D320CB164134FC5afD73B8dB453813094a","0x1603035964573375E9546fA2cDbed9Ad435865df"],
        "0xccfC48733331FDE696A5058DbEBC4574a18464c5",
        9876543210
      ) 
      .send({ from: "0xccfC48733331FDE696A5058DbEBC4574a18464c5" })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const swapSec = async (input) => {
    // swapTokensForExactTokens --> for first coin
    //  swapExactTokensForTokens --> for sec coin

    await contract.methods
      .swapExactTokensForTokens() //execute amount of second (amount, convertible token address, result token address)
      .send({})
      .then((res) => {
        console.log(res);
      });
  };

  const changeSwapState = () => {
    let temp = coin1;
    setCoin1(coin2);
    setCoin2(temp);
    initBUSDContarct();
  };

  return (
    <MainCard className="swap-card">
      <div>
        <CoinField
          tokenImage={coin1.image}
          tokenName={coin1.name}
          onChangeInputHandler={changeFirstCoinHandler}
        />

        <button className="swap-icon" onClick={changeSwapState}>
          <MdSwapVert />
        </button>

        <CoinField
          tokenImage={coin2.image}
          tokenName={coin2.name}
          onChangeInputHandler={changeSecCoinHandler}
        />
      </div>

      <div className="swap-actions">
        <button onClick={swapFirst} className="main-button">
          Swap
        </button>
      </div>
    </MainCard>
  );
};

export default Swap;
