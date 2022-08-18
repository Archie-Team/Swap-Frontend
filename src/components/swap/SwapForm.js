import React from "react";
import CoinField from "../coin/CoinField";
import { MdSwapVert } from "react-icons/md";

import SwapPrice from "./swap/SwapPrice";
import SwapSlippageTolerance from "./SwapSlippageTolerance";


const SwapForm = () => {
  return (
    <div>
      <CoinField
        tokenImage={coin1.image}
        tokenName={coin1.name}
        tokenAddress={coin1.address}
        tokenContract={token1Contract}
        coinBalance={coin1.balance}
        onChangeInputHandler={changeFirstInputHandler}
        calculatedAmount={fromWei(calculatedCoin1Amount, "ether")}
      />

      <button className="swap-icon" onClick={changeSwapState}>
        <MdSwapVert />
      </button>

      <CoinField
        tokenImage={coin2.image}
        tokenName={coin2.name}
        tokenContract={token2Contract}
        tokenAddress={coin2.address}
        coinBalance={coin2.balance}
        calculatedAmount={fromWei(calculatedCoin2Amount, "ether")}
        onChangeInputHandler={changeSecCoinHandler}
      />
      <SwapPrice
        contract={swapContract}
        coin1Name={coin1.name}
        coin2Name={coin2.name}
        amount={coin1.amount}
        pathAddrress={[coin1.address, coin2.address]}
      />
      <SwapSlippageTolerance
        slippageTolerance={slippageTolerance}
        onSubmitslippageToleranceAmount={submitSlippageToleranceAmount}
      />
    </div>
  );
};

export default SwapForm;
