import React, { useContext, useEffect, useState } from "react";
import { addresses } from "../../modules/addresses";
import pair_abi from "../../assets/files/Pair.json";
import { getTokenBalance, initContract } from "../../modules/web3Client";
import AuthContext from "../../context/auth-context";
import { roundNumber } from "../../modules/formatNumbers";
import "./DashboardLPTokenBalance.css";
import { fromWei } from "../../modules/convertors";

const LPTokenBalance = () => {
  const [lpBalance, setLPTokenBalance] = useState(0);
  const authCtx = useContext(AuthContext);
  const [pairContarct, setPairContarct] = useState(null);

 

  useEffect(() => {
    if (pairContarct && authCtx.account) {
      getTokenBalance(pairContarct, authCtx.account).then((res) => {
        setLPTokenBalance(roundNumber(fromWei(res), 5));
      });
    }
  }, [pairContarct, authCtx.account]);


  useEffect(() => {
    initContract(pair_abi.abi, addresses.pair_address).then((res) => {
      setPairContarct(res);
    })
  }, [])
  

  return (
    <div className="lp-token_balance">
      <p>{lpBalance} </p>
      <p> BUSD_BULC LP</p>
    </div>
  );
};

export default LPTokenBalance;
