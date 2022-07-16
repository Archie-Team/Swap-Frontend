import React from "react";
import "../TokenFormStyle.css";

const BUSDPool = ({ onChangeInputHandler, BUSDAmount }) => {
  const changeInputHandler = (e) => {
    onChangeInputHandler({ name: e.target.name, value: e.target.value });
  };

  return (
    <div className="token-container">
      <div className="amount">
        <div className="logo">
          <img
            src="https://cryptologos.cc/logos/binance-usd-busd-logo.png?v=0"
            alt=""
          />
          <p className="">BUSD</p>
        </div>
        <div className="form-group">
          <input
            type="number"
            value={BUSDAmount}
            onChange={changeInputHandler}
            name="BUSDPool"
            placeholder="BUSD"
          />
        </div>
      </div>
      <div className="balance">
        <p>Balance :</p>
        <p className="balance-amount">--</p>
      </div>
    </div>
  );
};

export default BUSDPool;
