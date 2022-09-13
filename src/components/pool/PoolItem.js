import React, { useEffect } from "react";
import "./PoolItem.css";

const PoolItem = ({ name }) => {
  const beringAddLiquidityHandler = () => {};

  useEffect(() => {
    console.log("test");
  }, []);

  return (
    <div>
      <p>{name}</p>
      <button onClick={beringAddLiquidityHandler}>Add Liquidity</button>
    </div>
  );
};

export default PoolItem;
