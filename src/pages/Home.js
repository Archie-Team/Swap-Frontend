import React, { useEffect, useState } from "react";
// import MainCard from "../components/layout/MainCard";
import "./Home.css";
import stakeAbi from "../assets/files/Staking.json";
import { addresses } from "../modules/addresses";
import MainCard from "../components/layout/MainCard";
import TokensAmount from "../components/dashboard/TokensAmount";
import BullcoinStates from "../components/dashboard/BullcoinStates";
import TotalValue from "../components/dashboard/TotalValueLocked";

import useContract from "../hooks/use-contract";

const Home = () => {
  const [stakeContract, setStakeContract] = useState(null);
  const { getContract } = useContract();

  useEffect(() => {
    getContract(stakeAbi.abi, addresses.staking_address, (contract) =>
      setStakeContract(contract)
    );
  }, []);

  return (
    <div className="home-page">
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
