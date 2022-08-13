import React, { useContext, useEffect, useState } from "react";
import MainCard from "../components/layout/MainCard";
import Stake from "../components/staking/StakeItem";
import "./Staking.css";
import { addresses } from "../modules/addresses";
import { approve } from "../modules/web3Client";
import { stakes } from "../modules/stakes";
import stakeAbi from "../assets/files/Staking.json";
import pairAbi from "../assets/files/Pair.json";
import Web3 from "web3";
import ERC20Abi from "../assets/files/ERC20.json";
import LPToeknBalance from "./LPToeknBalance";
import toast, { Toaster } from "react-hot-toast";
import AuthContext from "../context/auth-context";
import useContract from "../hooks/use-contract";
import useWeb3 from "../hooks/use-web3";

const Staking = () => {
  const authCtx = useContext(AuthContext);

  const [selectedStake, setSelectedStake] = useState({
    value: null,
    stake: {},
  });

  const { contract: stakeContract, getContract: getStakeContract } =
    useContract();

  const { contract: pairContract, getContract: getPairContract } =
    useContract();

  const { contract: BUSDContract, getContract: getBUSDContract } =
    useContract();

  useEffect(() => {
    getStakeContract(stakeAbi.abi, addresses.staking_address);
    getPairContract(pairAbi.abi, addresses.pair_address);
    getBUSDContract(ERC20Abi.abi, addresses.BUSD_address);
  }, []);

  const calculateBUSDValue = async (amount) => {
    return await stakeContract.methods
      .calculateValue(Web3.utils.toWei(amount.toString(), "ether"))
      .call()
      .then((res) => {
        return res;
      });
  };

  const { getAllowence: getPairAllowence } = useWeb3();
  const { getAllowence: getBUSDAllowence } = useWeb3();

  const stakeHandler = async (amount, choice, account) => {
    await getPairAllowence(
      pairContract,
      account,
      addresses.staking_address,
      //apply data
      async (pairAllowence) => {
        if (pairAllowence < Number(Web3.utils.toWei(amount, "ether"))) {
          await approve(
            pairContract,
            Web3.utils.toWei("10000000000000000000000000", "tether"),
            account,
            addresses.staking_address
          ).then((res) => {
            toast.success(res);
          });
        } else {
          console.log("No Need to Approve Stake");
          return;
        }
      }
    );

    const BUSDValue = await calculateBUSDValue(amount);

    //approve BUSD amount
    await getBUSDAllowence(
      BUSDContract,
      account,
      addresses.staking_address,
      async (BUSDAllowence) => {
        if (BUSDAllowence < Number(BUSDValue)) {
          await approve(
            BUSDContract,
            Web3.utils.toWei("1000000000000000", "tether"),
            account,
            addresses.staking_address
          ).then((res) => {
            toast.success(res);
          });
        } else {
          console.log("No Need to Approve BUSD");
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
        contract={pairContract}
        address={addresses.pair_address}
      />
      <div className="LP-token-balance">
        <p>Fee :</p>
        <p> 1% BUSD</p>
      </div>
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
          onClick={
            () =>
              stakeHandler(
                selectedStake.value,
                selectedStake.choice,
                authCtx.account
              ) //, authCtx.account
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
