import React, { useEffect, useState } from "react";
import MainCard from "../components/layout/MainCard";
import Stake from "../components/staking/StakeItem";
import "./Staking.css";
import { addresses } from "../modules/addresses";
import { stakes } from "../modules/stakes";
import stakeAbi from "../assets/files/Staking.json";
import pairAbi from "../assets/files/Pair.json";
import Web3 from "web3";
import ERC20Abi from "../assets/files/ERC20.json";
import LPToeknBalance from "./LPToeknBalance";
import toast, { Toaster } from "react-hot-toast";
import useContract from "../hooks/use-contract";
import useWeb3 from "../hooks/use-web3";
import { toWei } from "../modules/web3Wei";
import { useSelector } from "react-redux";

const Staking = () => {
  const account = useSelector((state) => state.auth.account);

  const [selectedStake, setSelectedStake] = useState({
    value: null,
    stake: {},
  });

  const [stakeContract, setStakeContract] = useState(null);
  const [pairContract, setPairContract] = useState(null);
  const [BUSDContract, setBUSDContract] = useState(null);

  const { getContract } = useContract();

  useEffect(() => {
    getContract(stakeAbi.abi, addresses.staking_address, (contract) =>
      setStakeContract(contract)
    );

    getContract(pairAbi.abi, addresses.pair_address, (contract) =>
      setPairContract(contract)
    );

    getContract(ERC20Abi.abi, addresses.BUSD_address, (contract) =>
      setBUSDContract(contract)
    );
  }, []);

  const calculateBUSDValue = async (amount) => {
    return await stakeContract.methods
      .calculateValue(toWei(amount.toString(), "ether"))
      .call()
      .then((res) => {
        return res;
      });
  };

  const { getAllowence, approve } = useWeb3();

  const stakeHandler = async (amount, choice, account) => {
    await getAllowence(
      pairContract,
      account,
      addresses.staking_address,
      async (pairAllowence) => {
        if (pairAllowence < Number(toWei(amount, "ether"))) {
          await approve(
            pairContract,
            toWei("100000000000000", "tether"),
            account,
            addresses.staking_address,
            (res) => {
              toast.success(res);
            }
          );
        } else {
          console.log("No Need to Approve pair");
        }
      }
    );

    const BUSDValue = await calculateBUSDValue(amount);

    await getAllowence(
      BUSDContract,
      account,
      addresses.staking_address,
      async (BUSDAllowence) => {
        if (BUSDAllowence < Number(BUSDValue)) {
          await approve(
            BUSDContract,
            toWei("100000000000000", "tether"),
            account,
            addresses.staking_address,
            (res) => {
              toast.success(res);
            }
          );
        } else {
          console.log("No Need to Approve BUSD");
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
          onClick={() =>
            stakeHandler(selectedStake.value, selectedStake.choice, account)
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
