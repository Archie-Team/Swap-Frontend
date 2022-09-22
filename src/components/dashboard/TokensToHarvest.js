import React from "react";
import { useEffect, useState } from "react";
// import useBalance from "../../hooks/use-balance";
import { coins } from "../../modules/coins";
import Token from "./Token";
import "./TokensToHarvest.css";
import { useDispatch } from "react-redux";
import {
  getTotalValueLockLPToken,
  getAllStakedBalance,
} from "../../store/token-actions";
import { fromWei } from "../../modules/web3Wei";

const TokensToHarvest = ({
  // BULCContract,
  // BUSDContract,
  stakeContract,
  stakeContract2,
  account,
}) => {
  const [BULCBalance, setBULCBalance] = useState(0);
  const [BUSDBalance, setBUSDBalance] = useState(0);
  const [LPBalance, setLPBalance] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const getValues = async () => {
      let allStakedBalance = await dispatch(
        getAllStakedBalance(stakeContract2)
      ).then((res) => {
        return res;
      });
      let totalValLock = await dispatch(
        getTotalValueLockLPToken(stakeContract)
      ).then((res) => {
        return res;
      });
      setLPBalance(fromWei(allStakedBalance + totalValLock, "ether"));
    };
    if (stakeContract && account) {
      getValues();
    }
  }, [account, stakeContract]);

  return (
    <div className="tokens-to-harvest tokens-container">
      <p className="title">Tokens To Harvest</p>
      <div className="tokens-inwallet_container">
        <Token
          tokenName="BULC"
          tokenBalance={BULCBalance}
          tokenUrl={coins.BULC.image}
        />
        <Token
          tokenName="BUSD"
          tokenBalance={BUSDBalance}
          tokenUrl={coins.BUSD.image}
        />
        <Token
          tokenName="SNACKS"
          tokenBalance={LPBalance}
          tokenUrl={coins.BULC.image}
        />
      </div>
    </div>
  );
};

export default TokensToHarvest;
