import React from "react";
import MainCard from "../components/layout/MainCard";
import Stake from "../components/staking/Stake";
import './Staking.css'

const Staking = () => {
  const stakes = [
    {
      monthNumber: 3,
      APRAmountPersent: 60,
    },
    {
      monthNumber: 6,
      APRAmountPersent: 80,
    },
    {
      monthNumber: 12,
      APRAmountPersent: 100,
    },
  ];
  return (
    <MainCard>
      {stakes.map((stake) => (
        <Stake APRAmountPersent={stake.APRAmountPersent} monthNumber={stake.monthNumber} />
      ))}
      <div className="staking-actions">
        <button className="main-button">Stake</button>
        <button className="main-button">UnStake & Claim</button>
      </div>
    </MainCard>
  );
};

export default Staking;
