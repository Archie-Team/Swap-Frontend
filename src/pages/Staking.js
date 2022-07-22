import React, { useContext, useEffect, useState } from "react";
import MainCard from "../components/layout/MainCard";
import Stake from "../components/staking/StakeItem";
import "./Staking.css";
import { addresses } from "../modules/addresses";
import { approve, checkAllowence, initContract } from "../modules/web3Client";
import { stakes } from "../modules/stakes";
import stakeAbi from "../assets/files/Staking.json";
import pairAbi from "../assets/files/Pair.json";
import Web3 from "web3";
import ERC20Abi from "../assets/files/ERC20.json";
import pair_abi from "../assets/files/Pair.json";
import LPToeknBalance from "./LPToeknBalance";
import toast, { Toaster } from "react-hot-toast";
import AuthContext from "../context/auth-context";

const Staking = () => {
  const [stakeContract, setStakeContract] = useState(null);
  const [pairContract, setPairContract] = useState(null);
  const [BUSDContract, setBUSDContract] = useState(null);
  const [pairContarct, setPairContarct] = useState(null);
  const authCtx = useContext(AuthContext)


  const [selectedStake, setSelectedStake] = useState({
    value: null,
    stake: {},
  });


  useEffect(() => {
    initContract(pair_abi.abi, addresses.pair_address).then((res) => {
      setPairContarct(res);
    });
  }, []);

  useEffect(() => {
    initContract(stakeAbi.abi, addresses.staking_address).then((res) => {
      setStakeContract(res);
    });

    initContract(pairAbi.abi, addresses.pair_address).then((res) => {
      setPairContract(res);
    });

    initContract(ERC20Abi.abi, addresses.BUSD_address).then((res) => {
      setBUSDContract(res);
    });
  }, []);

  const calculateBUSDValue = async (amount) => {
    return await stakeContract.methods
      .calculateValue(Web3.utils.toWei(amount.toString(), "ether"))
      .call()
      .then((res) => {
        console.log("BUSDValue", res);
        return res;
      });
  };

  const stakeHandler = async (amount, choice,account) => {
   
    await checkAllowence(pairContract, account, addresses.staking_address).then(
      async (res) => {
        // console.log("stakingAllownce", res);
        if (res < Number(Web3.utils.toWei(amount, "ether"))) {
          await approve(
            pairContract,
            Web3.utils.toWei("10000000000000000000000000", "tether"), //approve a big number
            account,
            addresses.staking_address
          ).then((res) => {
            toast.success(res);
          });
        } else {
          console.log("no need to Approve");
          return;
        }
      }
    );

    const BUSDValue = await calculateBUSDValue(amount);

    //approve BUSD amount
    await checkAllowence(BUSDContract, account, addresses.staking_address).then(
      async (res) => {
        // console.log("BUSDAllowence", res);
        if (res < Number(BUSDValue)) {
          await approve(
            BUSDContract,
            Web3.utils.toWei("1000000000000000", "tether"), //approve a big number
            account,
            addresses.staking_address
          ).then((res) => {
            toast.success(res);
          });
        } else {
          console.log("no need to Approve");
          return;
        }
      }
    );

    await stakeContract.methods
      .stake(Web3.utils.toWei(amount, "ether"), choice)
      .send({ from: account })
      .then((res) => {
        toast.success("Position Set Successfully !");
      });
  };

  const changeStakeInputHandler = (data) => {
    setSelectedStake(data);
  };

  return (
    <MainCard>
      <Toaster position="top-center" reverseOrder={false} />
      <LPToeknBalance
        contract={pairContarct}
        address={addresses.pair_address}
      />
      {stakes.map((stake) => (
        <Stake
          key={stake.monthNumber}
          stake={stake}
          onChangeStakeItem={changeStakeInputHandler}
          unselectedStakeAmount={
            selectedStake.choice === stake.choice ? selectedStake.value : ""
          }
        />
      ))}

      <div className="staking-actions">
        <button
          onClick={() =>
            stakeHandler(selectedStake.value, selectedStake.choice, authCtx.account) //, authCtx.account
          }
          className="main-button"
        >
          Stake
        </button>
      </div>
    </MainCard>
  );
};

export default Staking;
