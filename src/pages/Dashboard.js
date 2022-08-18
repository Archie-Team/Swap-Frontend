import "./Dashboard.css";
import TotalValue from "../components/dashboard/TotalValue";
import React, { useEffect, useState } from "react";
import stakeAbi from "../assets/files/Staking.json";
import { addresses } from "../modules/addresses";
import MainCard from "../components/layout/MainCard";
import useContract from "../hooks/use-contract";
import TokenInWallet from "../components/dashboard/TokenInWallet";
import Positions from "../components/dashboard//Positions";
import LPTokenBalance from "../components/dashboard/DashboardLPTokenBalance";

const Home = () => {
  const [stakeContract, setStakeContract] = useState(null);
  const { getContract } = useContract();

  useEffect(() => {
    getContract(stakeAbi.abi, addresses.staking_address, (contract) =>
      setStakeContract(contract)
    );
  }, []);

  return (
    <MainCard>
      <div className="top-container">
        <TokenInWallet />
        <LPTokenBalance />
        <div className="seprator-line"></div>
        <Positions />
      </div>
      <div className="bottom-container">
        <TotalValue stakeContract={stakeContract} />
      </div>
    </MainCard>
  );
};

export default Home;
