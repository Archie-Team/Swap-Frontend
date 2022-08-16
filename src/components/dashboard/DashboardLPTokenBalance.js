import React, { useContext, useEffect, useState } from "react";
import { addresses } from "../../modules/addresses";
import pair_abi from "../../assets/files/Pair.json";
import { roundNumber } from "../../modules/formatNumbers";
import "./DashboardLPTokenBalance.css";
import useContract from "../../hooks/use-contract";
import { fromWei } from "../../modules/web3Wei";
import useBalance from "../../hooks/use-balance";
import { useSelector } from "react-redux";

const LPTokenBalance = () => {
  const account = useSelector((state) => state.auth.account);
  const { contract: pairContract, getContract: getPairContract } =
    useContract();

  const { balance: lpBalance, getBalance: getLPBalance } = useBalance();

  useEffect(() => {
    if (pairContract && account) {
      getLPBalance(pairContract, account);
    }
  }, [pairContract, account]);

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
