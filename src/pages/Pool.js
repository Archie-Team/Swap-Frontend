import React, { useEffect, useState } from "react";
import BULCPool from "../components/pool/BULCPool";
import BUSDPool from "../components/pool/BUSDPool";
import MainCard from "../components/layout/MainCard";
import { BsPlusLg } from "react-icons/bs";
import "./Pool.css";
import { approve,checkAllowence, initContract } from "../modules/web3Client";
import { addresses } from "../modules/addresses";
import ERC20_abi from "../assets/files/ERC20.json";
import swap_abi from "../assets/files/Swap.json";

const Pool = () => {
  const [swapContract, setSwapContract] = useState("");
  const [BULCContarct, setBULCContarct] = useState(null);
  const [BUSDContarct, setBUSDContarct] = useState(null);

  const [BUSDAmount, setBUSDAmount] = useState(Math.pow(10, 15));
  const [BULCAmount, setBULCAmount] = useState(Math.pow(10, 15));

  const account = localStorage.getItem("account");

  const changeBULCAmount = (data) => {
    setBULCAmount(data.value);
  };

  const changeBUSDAmount = (data) => {
    setBUSDAmount(data.value);
  };

  const addLiqueidity = async () => {
  
    await checkAllowence(
      BUSDContarct,
      account,
      addresses.contract_Address
    ).then(async (res) => {
      console.log(res);

      if (res < BUSDAmount) {
        await approve(BUSDContarct, "500000000000000000000");
      } else {
        return;
      }
    });

    await checkAllowence(
      BULCContarct,
      account,
      addresses.contract_Address
    ).then(async (res) => {
      console.log(res);
      if (res < BULCAmount) {
        await approve(BULCContarct, "500000000000000000000");
      } else {
        return;
      }
    });

    await swapContract.methods
      .addLiquidity(
        addresses.BUSD_address,
        addresses.BULC_address,
        BUSDAmount ,
        BULCAmount , 
        1,
        1,
        account,
        324324324234234
      )
      .send({ from: account })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const contract = initContract(swap_abi.abi, addresses.contract_Address);
    setSwapContract(contract);

    const BULC_contract = initContract(ERC20_abi.abi, addresses.BULC_address); // for approve BULC
    setBULCContarct(BULC_contract);

    const BUSD_contract = initContract(ERC20_abi.abi, addresses.BUSD_address); // for approve BUSD
    setBUSDContarct(BUSD_contract);
  }, []);

  return (
    <MainCard className="pool-card">
      <div className="pool__containers">
        <BULCPool onChangeInputHandler={changeBULCAmount} />
        <BsPlusLg className="pool-icon" />
        <BUSDPool onChangeInputHandler={changeBUSDAmount} />
      </div>

      <div className="pool-actions">
        <button onClick={addLiqueidity} className="main-button">
          Supply
        </button>
      </div>
    </MainCard>
  );
};

export default Pool;
