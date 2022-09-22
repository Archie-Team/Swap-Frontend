import React, { useEffect } from "react";
import useBalance from "../hooks/use-balance";
import { roundNumber } from "../modules/formatNumbers";
import { usedNetworkId } from "../modules/networks";
import { fromWei } from "../modules/web3Wei";
import { useSelector } from "react-redux";

const LPToeknBalance = ({ contract }) => {
  const account = useSelector((state) => state.auth.account);
  const networkId = useSelector((state) => state.wallet.networkId);
  const { balance: LPTokenBalance, getBalance: getLPBalance } = useBalance();

  useEffect(() => {
    console.log(networkId);

    if (contract && account && networkId === usedNetworkId) {
      getLPBalance(contract, account);
      console.log(LPTokenBalance);
    }
  }, [contract, account, networkId]);

  return (
    <div className="LP-token-balance">
      <p>Balance :</p>
      <p>{roundNumber(fromWei(LPTokenBalance, "ether"), 5)} BUSD-BULC LP</p>
    </div>
  );
};

export default LPToeknBalance;
