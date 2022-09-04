import React from "react";
import { useEffect } from "react";
import useBalance from "../../hooks/use-balance";
import { coins } from "../../modules/coins";
import Token from "./Token";
import "./TokensToHarvest.css";

const TokensToHarvest = ({
  BULCContract,
  BUSDContract,
  pairContract,
  account,
}) => {
  const { balance: BULCBalance, getBalance: getBULCBalance } = useBalance();
  const { balance: BUSDBalance, getBalance: getBUSDBalance } = useBalance();
  const { balance: lpBalance, getBalance: getLPBalance } = useBalance();

  useEffect(() => {
    if (BULCContract && BUSDContract && pairContract && account) {
      getBUSDBalance(BUSDContract, account);
      getBULCBalance(BULCContract, account);
      getLPBalance(pairContract, account);
    }
  }, [BUSDContract, BULCContract, account]);

  return (
    <div className="tokens-to-harvest tokens-container">
      <p className="title">Tokens To Harvest</p>
      <div className="tokens-inwallet_container">
         
        <Token  tokenName="BULC" tokenBalance={BULCBalance} tokenUrl={coins.BULC.image} />
        <Token  tokenName="BUSD" tokenBalance={BUSDBalance} tokenUrl={coins.BUSD.image} />
        <Token  tokenName="SNACKS" tokenBalance={lpBalance} tokenUrl={coins.BULC.image} />
      </div>
    </div>
  );
};

export default TokensToHarvest;
