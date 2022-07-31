import React, { useContext, useEffect, useState } from "react";
import Token from "./Token";
import "./TokensInWallet.css";
import { coins } from "../../modules/coins";
import { addresses } from "../../modules/addresses";
import { getTokenBalance, initContract } from "../../modules/web3Client";
import ERC20_abi from "../../assets/files/ERC20.json";
import { roundNumber } from "../../modules/formatNumbers";
import AuthContext from "../../context/auth-context";
import { fromWei } from "../../modules/convertors";

const TokenInWallet = () => {
  const [BUSDAmount, setBUSDAmount] = useState(0);
  const [BULCAmount, setBULCAmount] = useState(0);
  const [BUSDContract, setBUSDContract] = useState(null);
  const [BULCContract, setBULCContract] = useState(null);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    initContract(ERC20_abi.abi, addresses.BUSD_address).then((res) => {
      setBUSDContract(res);
    });

    initContract(ERC20_abi.abi, addresses.BULC_address).then((res) => {
      setBULCContract(res);
    });
  }, []);

  useEffect(() => {
    if (BULCContract && BUSDContract && authCtx.account) {
      getTokenBalance(BUSDContract, authCtx.account).then((res) => {
        setBUSDAmount(roundNumber(fromWei(res), 5));
      });

      getTokenBalance(BULCContract, authCtx.account).then((res) => {
        setBULCAmount(roundNumber(fromWei(res), 5));
      });
    }
  }, [BUSDContract, BULCContract, authCtx.account]);

  return (
    <div className="tokens-inwallet">
      <p className="title">Tokens In Wallet</p>
      <div className="tokens-inwallet_container">
        <Token tokenAmount={BUSDAmount} tokenUrl={coins.BUSD.image} />
        <Token tokenAmount={BULCAmount} tokenUrl={coins.BULC.image} />
      </div>
    </div>
  );
};

export default TokenInWallet;
