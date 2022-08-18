import React, { useEffect, useState } from "react";
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
  const [pairContract, setPairContract] = useState(null);
  const { balance: lpBalance, getBalance: getLPBalance } = useBalance();
  const { getContract } = useContract();

  useEffect(() => {
    getContract(pair_abi.abi, addresses.pair_address, (contract) =>
      setPairContract(contract)
    );
  }, [getContract]);

  useEffect(() => {
    if (pairContract && account) {
      getLPBalance(pairContract, account);
    }
  }, [getLPBalance, pairContract, account]);

  

  return (
    <div className="lp-token_balance">
      <p>{roundNumber(fromWei(lpBalance, "ether"), 5)} </p>
      <p> BUSD_BULC LP</p>
    </div>
  );
};

export default LPTokenBalance;
