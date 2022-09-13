import React, { useEffect, useState } from "react";
import { roundNumber } from "../../modules/formatNumbers";
import { fromWei } from "../../modules/web3Wei";
import "./CoinField.css";

const CoinField = ({
  tokenImage,
  tokenName,
  coinAmount,
  onChangeInputHandler,
  calculatedAmount,
  coinBalance,
}) => {
  const [coinValue, setCoinValue] = useState("");
  const changeInputHandler = (e) => {
    setCoinValue(e.target.value);
    onChangeInputHandler({ name: e.target.name, value: e.target.value });
  };

  useEffect(() => {
    console.log(calculatedAmount);
    calculatedAmount === 0
      ? setCoinValue("")
      : setCoinValue(roundNumber(calculatedAmount, 5));
  }, [calculatedAmount]);

  useEffect(() => {
    if (coinAmount === 0) {
      setCoinValue("");
    }
  }, [coinAmount]);

  const computedBalance = coinBalance
    ? roundNumber(fromWei(coinBalance, "ether"), 5)
    : 0;

  return (
    <div className="token-container">
      <div className="amount">
        <div className="logo">
          <img src={tokenImage} alt="" />
          <p className="">{tokenName}</p>
        </div>
        <div className="form-group">
          <input
            type="number"
            name={tokenName}
            placeholder={tokenName}
            value={coinValue}
            onChange={changeInputHandler}
          />
        </div>
      </div>
      <div className="balance">
        <p>Balance :</p>
        <p className="balance-amount">
          {computedBalance} {tokenName}
        </p>
      </div>
    </div>
  );
};

export default CoinField;
