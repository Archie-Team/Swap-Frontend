import React, { useEffect } from "react";
import useBalance from "../hooks/use-balance";
import { roundNumber } from "../modules/formatNumbers";
import { networksId } from "../modules/networks";
import { fromWei } from "../modules/web3Wei";
import { useSelector } from "react-redux";

const LPToeknBalance = ({ contract }) => {
  const account = useSelector((state) => state.auth.account);
  const networkId  = useSelector((state) => state.network.networkId)
  const { balance: LPTokenBalance, getBalance: getLPBalance } = useBalance();

  useEffect(() => {
    if (contract && account && networkId === networksId.testNetworkId) {
      getLPBalance(contract, account);
    }
  }, [contract, account]);

  return (
    <div className="LP-token-balance">
      <p>Balance :</p>
      <p>{roundNumber(fromWei(LPTokenBalance, "ether"), 5)} BUSD_BULC LP</p>
    </div>
  );
};

export default LPToeknBalance;
