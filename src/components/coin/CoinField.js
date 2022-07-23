import React, { useEffect, useState } from "react";
import { roundNumber } from "../../modules/formatNumbers";
import "./CoinField.css";

const CoinField = ({
  tokenImage,
  tokenName,
  onChangeInputHandler,
  calculatedAmount,
  coinBalance
}) => {
  const [coinValue, setCoinValue] = useState("");

  const changeInputHandler = (e) => {
    setCoinValue(e.target.value);
    onChangeInputHandler({ name: e.target.name, value: e.target.value });
  };

  useEffect(() => {
    setCoinValue(roundNumber(calculatedAmount,5));
  }, [calculatedAmount]);

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
          {roundNumber(coinBalance, 5) } {tokenName}
        </p>
      </div>
    </div>
  );
};

export default CoinField;
