import TokensStatus from "../components/dashboard/TokensStatus";
import "./Dashboard.css";
import TotalValue from "../components/dashboard/TotalValue";
import React, { useEffect, useState } from "react";
import stakeAbi from "../assets/files/Staking.json";
import { addresses } from "../modules/addresses";
import { initContract } from "../modules/web3Client";
import Web3 from "web3";
import MainCard from '../components/layout/MainCard'
const Home = () => {

  const [stakeContract, setStakeContract] = useState(null);
  const [totalFrozen, setTotalFrozen] = useState(0);
  const [totalValueLocked, setTotalValueLocked] = useState(0);

  useEffect(() => {
    initContract(stakeAbi.abi, addresses.staking_address).then((res) => {
      setStakeContract(res);
    });
  }, []);


  useEffect(() => {
    const getTotalFrozen = async () => {
      await stakeContract.methods
        .StakedRewardFreezed()
        .call()
        .then((res) => {
          setTotalFrozen(Web3.utils.fromWei(res, "ether"));
        });
    };

    const getTotalValueLocked = async () => {
      await stakeContract.methods
        .totalValueLuckBUSD()
        .call()
        .then((res) => {
          setTotalValueLocked(Web3.utils.fromWei(res, "ether"));
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
        <TokensStatus />
      </div>
      <div className="bottom-container">
        <TotalValue totalValue={totalValueLocked}  totalFrozen={totalFrozen} />
      </div>
    </MainCard>
  );
};

export default Home;
