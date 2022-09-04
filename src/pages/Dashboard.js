import "./Dashboard.css";
import TotalValue from "../components/dashboard/TotalValueLocked";
import React, { useEffect, useState } from "react";
import stakeAbi from "../assets/files/Staking.json";
import { addresses } from "../modules/addresses";
import MainCard from "../components/layout/MainCard";
import useContract from "../hooks/use-contract";
import Positions from "../components/dashboard//Positions";
import TokensAmount from "../components/dashboard/TokensAmount";
import BullcoinStates from "../components/dashboard/BullcoinStates";

const Home = () => {
  const [stakeContract, setStakeContract] = useState(null);
  const { getContract } = useContract();

  useEffect(() => {
    getContract(stakeAbi.abi, addresses.staking_address, (contract) =>
      setStakeContract(contract)
    );
  }, []);

  return (
    <div className="dashboard-container">
      <div>
        <TokensAmount />
      </div>
      <div>
        <BullcoinStates />
      </div>
    </div>
  );
};

export default Home;
