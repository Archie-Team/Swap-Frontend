import React from "react";
import { useState } from "react";
import "./TotalTokenSupply.css";

const TotalTokenSupply = () => {
  const [totalTokenSupply, settotalTokenSupply] = useState(0);

  return (
    <div className="bullcoin-state">
      <p>
        Total Token Supply  <span className="dash-span">-</span> <span>{totalTokenSupply}</span>
      </p>
    </div>
  );
};

export default TotalTokenSupply;
