import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/auth-context";
import { fromWei } from "../modules/convertors";
import { roundNumber } from "../modules/formatNumbers";
import { getTokenBalance } from "../modules/web3Client";

const LPToeknBalance = ({ contract }) => {
  const [LPTokenBalance, setLPTokenBalance] = useState(0);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (contract && authCtx.account && authCtx.onCheckNetworkValidation()) {
      getTokenBalance(contract, authCtx.account).then((res) => {
        setLPTokenBalance(roundNumber(fromWei(res), 5));
      });
    }
  }, [contract, authCtx.account]);

  return (
    <div className="LP-token-balance">
      <p>Balance :</p>
      <p>{LPTokenBalance} BUSD-BULC LP</p>
    </div>
  );
};

export default LPToeknBalance;
