import React, { useContext, useEffect, useState } from "react";
import Token from "./Token";
import "./TokensInWallet.css";
import { coins } from "../../modules/coins";
import { addresses } from "../../modules/addresses";
import { getTokenBalance } from "../../modules/web3Client";
import ERC20_abi from "../../assets/files/ERC20.json";
import { roundNumber } from "../../modules/formatNumbers";
import AuthContext from "../../context/auth-context";
import useContract from "../../hooks/use-contract";
import { fromWei } from "../../modules/web3Wei";

const TokenInWallet = () => {
  const [BUSDAmount, setBUSDAmount] = useState(0);
  const [BULCAmount, setBULCAmount] = useState(0);
  const authCtx = useContext(AuthContext);

  const { contract: BULCContract, getContract: getBULCContract } =
  useContract();

  const { contract: BUSDContract, getContract: getBUSDContract } =
  useContract();

  useEffect(() => {
    getBUSDContract(ERC20_abi.abi, addresses.BUSD_address)
    getBULCContract(ERC20_abi.abi, addresses.BULC_address)
  }, []);

  useEffect(() => {
    if (BULCContract && BUSDContract && authCtx.account) {
      getTokenBalance(BUSDContract, authCtx.account).then((res) => {
        setBUSDAmount(roundNumber(fromWei(res,'ether'), 5));
      });

      getTokenBalance(BULCContract, authCtx.account).then((res) => {
        setBULCAmount(roundNumber(fromWei(res,'ether'), 5));
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
