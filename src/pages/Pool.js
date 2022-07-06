import React from "react";
import BULCPool from "../components/pool/BULCPool";
import BUSDPool from "../components/pool/BUSDPool";
import MainCard from "../components/layout/MainCard";
import { BsPlusLg } from "react-icons/bs";
import './Pool.css'

const Pool = () => {
  return (
    <MainCard className="pool-card">
      <div className="pool__containers">
        <BULCPool />
        <BsPlusLg className="pool-icon" />
        <BUSDPool  />
      </div>

      <div className="pool-actions">
        <button className="main-button">Supply</button>
      </div>
    </MainCard>
  );
};

export default Pool;
