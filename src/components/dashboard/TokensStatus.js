import React from "react";
import StakingAmount from "./StakingAmount";
import TokenInWallet from "./TokenInWallet";

const TokensStatus = () => {
  return (
    <div className="">
      <TokenInWallet />
      <div className="seprator-line"></div>
      <StakingAmount />
    </div>
  );
};

export default TokensStatus;
