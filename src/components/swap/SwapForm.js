import React from "react";
import CoinField from "../coin/CoinField";
import { MdSwapVert } from "react-icons/md";
import SwapSlippageTolerance from "./SwapSlippageTolerance";
import SwapPrice from "./SwapPrice";
import { fromWei } from "../../modules/web3Wei";
import { useEffect } from "react";

const SwapForm = ({
  onChangeFirstInput,
  onChangeSecInput,
  onChangeSwapState,
  coin1,
  coin2,
  swapContract,
}) => {
  return (
    <div>
      <CoinField
        tokenImage={coin1.image}
        tokenName={coin1.name}
        tokenAddress={coin1.address}
        tokenContract={coin1.contract}
        coinBalance={coin1.balance}
        coinAmount={coin1.amount}
        onChangeInputHandler={(input) => onChangeFirstInput(input)}
        calculatedAmount={fromWei(coin1.calculatedAmount, "ether")}
      />

      <button className="swap-icon" onClick={onChangeSwapState}>
        <MdSwapVert />
      </button>

      <CoinField
        tokenImage={coin2.image}
        tokenName={coin2.name}
        tokenContract={coin2.contract}
        tokenAddress={coin2.address}
        coinBalance={coin2.balance}
        coinAmount={coin2.amount}
        calculatedAmount={fromWei(coin2.calculatedAmount, "ether")}
        onChangeInputHandler={(input) => onChangeSecInput(input)}
      />
      <SwapPrice
        contract={swapContract}
        coin1Name={coin1.name}
        coin2Name={coin2.name}
        amount={coin1.amount}
        pathAddrress={[coin1.address, coin2.address]}
      />
      <SwapSlippageTolerance />
    </div>
  );
};

export default SwapForm;
