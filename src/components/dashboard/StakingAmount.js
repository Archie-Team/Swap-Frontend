import React, { useState } from "react";
import Token from "./Token";
import { logos } from "../../modules/varibales";
import "./TokensInWallet.css";

const StakingAmount = () => {
  const [BUSDAmount, setBUSDAmount] = useState(0);
  const [BULKAmount, setBULKAmount] = useState(0);

  return (
    <div className="staking-amount">
      <p>Staking Amount</p>
      <div className="staking-amount_container">
        <Token tokenAmount={BUSDAmount} tokenUrl={logos.BUSD} />
        <Token tokenAmount={BULKAmount} tokenUrl={logos.BULC} />
      </div>
    </div>
  );
};

export default StakingAmount;
