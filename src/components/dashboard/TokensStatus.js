import React from "react";
import LPTokenBalance from "./DashboardLPTokenBalance";
import Positions from "./Positions";
import TokenInWallet from "./TokenInWallet";


const TokensStatus = () => {

  return (
    <div className="">
      <TokenInWallet />
      <LPTokenBalance />

      <div className="seprator-line"></div>
      <Positions />
    </div>
  );
};

export default TokensStatus;
