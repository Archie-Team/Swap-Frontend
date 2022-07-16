import React, { useState } from "react";
import Token from "./Token";
import { logos } from "../../modules/varibales";
import './TokensInWallet.css'
import {coins} from '../../modules/coins'


const TokenInWallet = () => {
  const [BUSDAmount, setBUSDAmount] = useState(0);
  const [BULKAmount, setBULKAmount] = useState(0);

  return (
    <div className="tokens-inwallet" >
      <p>Tokens In Wallet</p>
      <div className="tokens-inwallet_container">
        <Token tokenAmount={BUSDAmount} tokenUrl={coins.BUSD.image} />
        <Token tokenAmount={BULKAmount} tokenUrl={coins.BULC.image} />
      </div>
    </div>
  );
};

export default TokenInWallet;
