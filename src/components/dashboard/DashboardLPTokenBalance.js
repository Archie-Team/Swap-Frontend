import React, { useContext, useEffect, useState } from "react";
import { addresses } from "../../modules/addresses";
import pair_abi from "../../assets/files/Pair.json";
import { getTokenBalance } from "../../modules/web3Client";
import AuthContext from "../../context/auth-context";
import { roundNumber } from "../../modules/formatNumbers";
import "./DashboardLPTokenBalance.css";
import { fromWei } from "../../modules/convertors";
import useContract from "../../hooks/use-contract";

const LPTokenBalance = () => {
  const [lpBalance, setLPTokenBalance] = useState(0);
  const authCtx = useContext(AuthContext);
  const { contract: pairContract, getContract: getPairContract } =
    useContract();

  useEffect(() => {
    if (pairContract && authCtx.account) {
      getTokenBalance(pairContract, authCtx.account).then((res) => {
        setLPTokenBalance(roundNumber(fromWei(res), 5));
      });
    }
  }, [pairContract, authCtx.account]);

  useEffect(() => {
    getPairContract(pair_abi.abi, addresses.pair_address);
  }, [getPairContract]);

  return (
    <div className="lp-token_balance">
      <p>{lpBalance} </p>
      <p> BUSD_BULC LP</p>
    </div>
  );
};

export default LPTokenBalance;
