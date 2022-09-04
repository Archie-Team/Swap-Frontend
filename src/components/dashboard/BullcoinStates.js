import React from "react";
import "./BullcoinStates.css";
import CurrentMarketCap from "./CurrentMarketCap";
import TotalTokenSupply from "./TotalTokenSupply";
import TotalValueLocked from "./TotalValueLocked";

const BullcoinStates = () => {
  return (
    <div className="bullcoin-states__container">
      <p className="title">Bullcoin States</p>
      <TotalTokenSupply />
      <CurrentMarketCap />
      <TotalValueLocked />
    </div>
  );
};

export default BullcoinStates;
