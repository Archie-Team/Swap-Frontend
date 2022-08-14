import React, { useContext, useEffect } from "react";
import AuthContext from "../context/auth-context";
import useBalance from "../hooks/use-balance";
import { roundNumber } from "../modules/formatNumbers";
import { fromWei } from "../modules/web3Wei";

const LPToeknBalance = ({ contract }) => {
  const authCtx = useContext(AuthContext);

  const { balance: LPTokenBalance, getBalance: getLPBalance } = useBalance();

  useEffect(() => {
    if (contract && authCtx.account && authCtx.onCheckNetworkValidation()) {
      getLPBalance(contract, authCtx.account);
    }
  }, [contract, authCtx.account]);

  return (
    <div className="LP-token-balance">
      <p>Balance :</p>
      <p>{roundNumber(fromWei(LPTokenBalance, "ether"), 5)} BUSD_BULC LP</p>
    </div>
  );
};

export default LPToeknBalance;
