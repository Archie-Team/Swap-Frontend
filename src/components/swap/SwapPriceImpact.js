import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { roundNumber } from "../../modules/formatNumbers";
import "./SwapPriceImpact.css";

const SwapPriceImpact = ({ contract, amount, pathAddrress }) => {
  const [priceImpact, setPriceImpact] = useState("0");
  const [computedPriceImpact, setComputedPriceImpact] = useState(0);

  useEffect(() => {
    if (contract && amount && amount !== 0) {
      contract.methods
        .priceImpact(amount, pathAddrress)
        .call()
        .then((res) => {
          let price_impact = Web3.utils.fromWei(res, "ether") * 100;
          // if(price_impact < 0.01){
          //   setPriceImpact('<0.01');
          // }
          // else{
          setPriceImpact(price_impact);
          // }
        })
        .catch((err) => {
          console.log("err in price impact");
        });
    } else {
      setPriceImpact(0);
    }
  }, [amount]);

  useEffect(() => {
    setPriceImpact(0);
  }, [pathAddrress[0]]);

  const computePriceImpactHandler = () => {
    if (priceImpact < 0.01 && priceImpact !== 0) return "<0.01";
    else if (priceImpact > 99) return 99;
    else {
      return roundNumber(priceImpact, 2);
    }
  };

  useEffect(() => {
    const price_impact = computePriceImpactHandler();
    setComputedPriceImpact(price_impact);
  }, [priceImpact]);

  return (
    <div className="swap__price-impact">
      <p>Price Impact : </p>
      <p>{computedPriceImpact}%</p>
    </div>
  );
};

export default SwapPriceImpact;
