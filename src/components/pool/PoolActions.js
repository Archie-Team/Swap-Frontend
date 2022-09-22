import React from "react";
import AddLiquidity from "./AddLiquidity";
import RemoveLiquidity from "./RemoveLiquidity";

const PoolActions = ({
  coin1,
  coin2,
  swapContract,
  pairContract,
  BUSDContract,
  BULCContract,
  onUpdateTokenBalances,
}) => {
  // const updateTokenBalances = () => {
  //   getBULCBalance(BULCContract, account);
  //   getBUSDBalance(BUSDContract, account);
  // };

  return (
    <div>
      <div className="pool-actions">
        <AddLiquidity
          coin1={coin1}
          coin2={coin2}
          BULCContract={BULCContract}
          BUSDContract={BUSDContract}
          swapContract={swapContract}
          onUpdateTokenBalances={onUpdateTokenBalances}
        />
        <RemoveLiquidity
          coin1={coin1}
          coin2={coin2}
          pairContract={pairContract}
          swapContract={swapContract}
        />
      </div>
    </div>
  );
};

export default PoolActions;
