import "./Dashboard.css";
import TotalValue from "../components/dashboard/TotalValue";
import React, { useEffect, useState } from "react";
import stakeAbi from "../assets/files/Staking.json";
import { addresses } from "../modules/addresses";
import MainCard from "../components/layout/MainCard";
import useContract from "../hooks/use-contract";
import { fromWei } from "../modules/web3Wei";
import TokenInWallet from "../components/dashboard/TokenInWallet";
import Positions from "../components/dashboard//Positions";
import LPTokenBalance from "../components/dashboard/DashboardLPTokenBalance";

const Home = () => {
  const [totalFrozen, setTotalFrozen] = useState(0);
  const [totalValueLocked, setTotalValueLocked] = useState(0);
  const { contract: stakeContract, getContract: getStakeContract } =
    useContract();

  useEffect(() => {
    getStakeContract(stakeAbi.abi, addresses.staking_address);
  }, []);

  useEffect(() => {
    const getTotalFrozen = async () => {
      await stakeContract.methods
        .StakedRewardFreezed()
        .call()
        .then((res) => {
          setTotalFrozen(fromWei(res, "ether"));
        });
    };

    const getTotalValueLocked = async () => {
      await stakeContract.methods
        .totalValueLockBUSD()
        .call()
        .then((res) => {
          setTotalValueLocked(fromWei(res, "ether"));
        });
    };

    if (stakeContract) {
      getTotalFrozen();
      getTotalValueLocked();
    }
  }, [stakeContract]);

  return (
    <MainCard>
      <div className="top-container">
        <TokenInWallet />
        <LPTokenBalance />
        <div className="seprator-line"></div>
        <Positions />
      </div>
      <div className="bottom-container">
        <TotalValue totalValue={totalValueLocked} totalFrozen={totalFrozen} />
      </div>
    </MainCard>
  );
};

export default Home;
