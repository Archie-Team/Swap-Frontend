import React, { useState } from "react";
import Token from "./Token";
import "./TokensInWallet.css";

import {coins} from '../../modules/coins'

const StakingAmount = () => {
  const [BUSDAmount, setBUSDAmount] = useState(0);
  const [BULKAmount, setBULKAmount] = useState(0);

  return (
    <div className="staking-amount">
      <p>Staking Amount</p>
      <div className="staking-amount_container">
        <Token tokenAmount={BUSDAmount} tokenUrl={coins.BUSD.image} />
        <Token tokenAmount={BULKAmount} tokenUrl={coins.BULC.image} />
      </div>
    </div>
  );
};

export default StakingAmount;
