import React from "react";
import { CommaFormat } from "../../modules/formatNumbers";
import "./TotalValue.css";

const TotalValue = ({ totalValue }) => {
  return (
    <div className="total-value__container">
      <div>
        <p className="title">Total Value Locked (TVL)</p>
        <p className="amount">${CommaFormat(totalValue)}</p>
      </div>

      {/* <div>
        <p>Total Frozen</p>
        <p className="amount">{CommaFormat(totalFrozen)}</p>
      </div> */}
    </div>
  );
};

export default TotalValue;
