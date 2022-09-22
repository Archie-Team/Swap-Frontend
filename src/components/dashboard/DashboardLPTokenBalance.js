import React, { useEffect, useState } from "react";
// import { addresses } from "../../modules/addresses";
// import { roundNumber } from "../../modules/formatNumbers";
import "./DashboardLPTokenBalance.css";
import useContract from "../../hooks/use-contract";
// import { fromWei } from "../../modules/web3Wei";
// import useBalance from "../../hooks/use-balance";
// import { useSelector } from "react-redux";

const LPTokenBalance = () => {
  // const account = useSelector((state) => state.auth.account);
  const { getContract } = useContract();

  useEffect(() => {}, [getContract]);

  useEffect(() => {
    if (pairContract && account) {
    }
  }, [getLPBalance, pairContract, account]);

  return (
    <div className="lp-token_balance">
      <p>{} </p>
      <p> BUSD-BULC LP</p>
    </div>
  );
};

export default LPTokenBalance;
