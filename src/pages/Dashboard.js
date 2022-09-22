import "./Dashboard.css";
import React, { useEffect, useState } from "react";
// import PositionList from "../components/dashboard/PositionList";
import MainCard from "../components/layout/MainCard";
import useContract from "../hooks/use-contract";

import stakeAbi from "../assets/files/Staking.json";
import stakeAbi2 from "../assets/files/Staking2.json";

import { addresses } from "../modules/addresses";
import BUSDBountyPositions from "../components/dashboard/BUSDBountyPositions";
import BULCBountyPositions from "../components/dashboard/BULCBountyPositions";

const Home = () => {
  const [stakeContract, setStakeContract] = useState(null);
  const [stakeContract2, setStakeContract2] = useState(null);

  const { getContract } = useContract();
  // const [BUSDBountyPositions, setBUSDBountyPositions] = useState([]);

  useEffect(() => {
    getContract(stakeAbi.abi, addresses.staking_address, (contract) =>
      setStakeContract(contract)
    );
    getContract(stakeAbi2.abi, addresses.staking2_address, (contract) =>
      setStakeContract2(contract)
    );
  }, []);

  return (
    <MainCard className="dashboard-container">
      <BULCBountyPositions stakeContract={stakeContract} />
      <div className="seprator-line"></div>
      <BUSDBountyPositions stakeContract={stakeContract2} />
    </MainCard>
  );
};

export default Home;
