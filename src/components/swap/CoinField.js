import React from "react";

const CoinField = ({ tokenImage, tokenName, onChangeInputHandler }) => {
  const changeInputHandler = (e) => {
    onChangeInputHandler({ name: e.target.name, value: e.target.value });
  };

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
            id=""
            placeholder={tokenName}
            onChange={changeInputHandler}
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

export default CoinField;
