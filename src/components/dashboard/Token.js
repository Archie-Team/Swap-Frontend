import React from "react";
import { roundNumber } from "../../modules/formatNumbers";
import { fromWei } from "../../modules/web3Wei";
import "./Token.css";

const Token = ({ tokenBalance, tokenUrl, tokenName }) => {
  return (
    <div className="token-inwallet_container">
      <img src={tokenUrl} alt="" />
      <p>
        {tokenName} - {roundNumber(fromWei(tokenBalance, "ether"), 5)}
      </p>
    </div>
  );
};

export default Token;
