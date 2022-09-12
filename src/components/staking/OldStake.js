import React, { useState } from "react";
import LPToeknBalance from "../../pages/LPToeknBalance";
import { stakes } from "../../modules/stakes";
import Stake from "./StakeItem";
import Web3 from "web3";
import useWeb3 from "../../hooks/use-web3";
import { toWei } from "../../modules/web3Wei";
import toast from "react-hot-toast";
import { addresses } from "../../modules/addresses";

const FirstStake = ({
  stakeContract,
  pairContract,
  BUSDContract,
  account,
  onBackStakingButtons,
}) => {
  const [selectedStake, setSelectedStake] = useState({
    value: null,
    stake: {},
  });

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
              console.log(res);
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
              console.log(res);
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
    <div>
      {" "}
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
        <button className="return-button" onClick={onBackStakingButtons}>
          Return
        </button>
      </div>
    </div>
  );
};

export default FirstStake;
