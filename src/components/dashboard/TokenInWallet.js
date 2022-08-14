import React, { useContext, useEffect } from "react";
import Token from "./Token";
import "./TokensInWallet.css";
import { coins } from "../../modules/coins";
import { addresses } from "../../modules/addresses";
import ERC20_abi from "../../assets/files/ERC20.json";
import AuthContext from "../../context/auth-context";
import useContract from "../../hooks/use-contract";
import useBalance from "../../hooks/use-balance";

const TokenInWallet = () => {
  const authCtx = useContext(AuthContext);

  const { contract: BULCContract, getContract: getBULCContract } =
    useContract();
  const { contract: BUSDContract, getContract: getBUSDContract } =
    useContract();

  const { balance: BULCBalance, getBalance: getBULCBalance } = useBalance();
  const { balance: BUSDBalance, getBalance: getBUSDBalance } = useBalance();

  useEffect(() => {
    getBUSDContract(ERC20_abi.abi, addresses.BUSD_address);
    getBULCContract(ERC20_abi.abi, addresses.BULC_address);
  }, []);

  useEffect(() => {
    if (BULCContract && BUSDContract && authCtx.account) {
      getBUSDBalance(BUSDContract, authCtx.account);
      getBULCBalance(BULCContract, authCtx.account);
    }
  }, [BUSDContract, BULCContract, authCtx.account]);

  return (
    <div className="tokens-inwallet">
      <p className="title">Tokens In Wallet</p>
      <div className="tokens-inwallet_container">
        <Token tokenBalance={BUSDBalance} tokenUrl={coins.BUSD.image} />
        <Token tokenBalance={BULCBalance} tokenUrl={coins.BULC.image} />
      </div>
    </div>
  );
};

export default TokenInWallet;
