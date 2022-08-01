import React from "react";
import "./Token.css";

const Token = ({ tokenAmount, tokenUrl }) => {
  return (
    <div className="token-inwallet_container">
      <img src={tokenUrl} alt="" />
      <p>{tokenAmount}</p>
    </div>
  );
};

export default Token;
