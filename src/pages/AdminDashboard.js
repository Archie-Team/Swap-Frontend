import React, { useEffect, useState } from "react";
import useContract from "../hooks/use-contract";
import { addresses } from "../modules/addresses";
import "./AdminDashboard.css";
import stake2_abi from "../assets/files/Staking2.json";
import { useDispatch, useSelector } from "react-redux";
import {
  setReward,
  setStakeTime,
  setUnStakeTime,
  witdrawLP,
} from "../store/admin-actions";
import Witdraw from "../components/admin/Witdraw";
import Reward from "../components/admin/Reward";

const AdminDashboard = () => {
  const [stakeContract2, setStakeContract2] = useState(null);
  const account = useSelector((state) => state.auth.account);

  const { getContract } = useContract();
  const dispatch = useDispatch();

  useEffect(() => {
    getContract(stake2_abi.abi, addresses.staking2_address, (contract) =>
      setStakeContract2(contract)
    );
  }, []);

  const setStakeTimeHandler = () => {
    dispatch(setStakeTime(stakeContract2, account));
  };
  const setUnStakeTimeHandler = () => {
    dispatch(setUnStakeTime(stakeContract2, account));
  };

  const withdrawHandler = (input) => {
    let amount = input.current.value;
    dispatch(witdrawLP(stakeContract2, account, amount));
  };

  const setRewardHandler = (input) => {
    let amount = input.current.value;
    dispatch(setReward(stakeContract2, account, amount));
  };

  return (
    <div className="admin-dashoard">
      <div className="admin-dashoard__actions">
        <button onClick={setStakeTimeHandler}>
          <h5>Set Stake Time</h5>
        </button>
        <button onClick={setUnStakeTimeHandler}>
          <h5>Set Unstake Time</h5>
        </button>
        <Witdraw onWithdraw={withdrawHandler} />
        <Reward onReward={setRewardHandler} />
      </div>
    </div>
  );
};

export default AdminDashboard;
