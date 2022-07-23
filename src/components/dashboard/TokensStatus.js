import React from "react";
import Positions from "./Positions";
import TokenInWallet from "./TokenInWallet";

const TokensStatus = () => {
  return (
    <div className="">
      <TokenInWallet />
      <div className="seprator-line"></div>
      <Positions />
    </div>
  );
};

export default TokensStatus;
