import React, { useState } from "react";
import Token from "./Token";
import { logos } from "../../modules/varibales";
import './TokensInWallet.css'

const TokenInWallet = () => {
  const [BUSDAmount, setBUSDAmount] = useState(0);
  const [BULKAmount, setBULKAmount] = useState(0);

  return (
    <div className="tokens-inwallet" >
      <p>Tokens In Wallet</p>
      <div className="tokens-inwallet_container">
        <Token tokenAmount={BUSDAmount} tokenUrl={logos.BUSD} />
        <Token tokenAmount={BULKAmount} tokenUrl={logos.BULC} />
      </div>
    </div>
  );
};

export default TokenInWallet;
