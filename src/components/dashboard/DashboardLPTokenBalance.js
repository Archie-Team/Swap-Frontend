import React, { useContext, useEffect, useState } from "react";
import { addresses } from "../../modules/addresses";
import pair_abi from "../../assets/files/Pair.json";
import AuthContext from "../../context/auth-context";
import { roundNumber } from "../../modules/formatNumbers";
import "./DashboardLPTokenBalance.css";
import useContract from "../../hooks/use-contract";
import { fromWei } from "../../modules/web3Wei";
import useBalance from "../../hooks/use-balance";

const LPTokenBalance = () => {
  const authCtx = useContext(AuthContext);
  const { contract: pairContract, getContract: getPairContract } =
    useContract();

  const { balance: lpBalance, getBalance: getLPBalance } = useBalance();

  useEffect(() => {
    if (pairContract && authCtx.account) {
      getLPBalance(pairContract, authCtx.account);
    }
  }, [pairContract, authCtx.account]);

  useEffect(() => {
    getPairContract(pair_abi.abi, addresses.pair_address);
  }, [getPairContract]);

  return (
    <div className="lp-token_balance">
      <p>{roundNumber(fromWei(lpBalance, "ether"), 5)} </p>
      <p> BUSD_BULC LP</p>
    </div>
  );
};

export default LPTokenBalance;
