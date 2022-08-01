import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { roundNumber } from "../../modules/formatNumbers";
import "./SwapPrice.css";

const SwapPrice = ({
  contract,
  amount,
  pathAddrress,
  coin1Name,
  coin2Name,
}) => {
  const [price, setPrice] = useState(0);

  const getTokenAperTokenB = async () => {
    await contract.methods
      .tokenAPerTokenB(amount, pathAddrress)
      .call()
      .then((res) => {
        setPrice(Web3.utils.fromWei(res, "ether"));
      })
      .catch((err) => {
        console.log("err in price");
      });
  };

  useEffect(() => {
    if (contract && amount && amount !== 0) {
      getTokenAperTokenB();
    } else {
      setPrice(0);
    }
  }, [amount, [pathAddrress[0]]]);

  useEffect(() => {
    setPrice(0);
  }, [pathAddrress[0]]);

  return (
    <div className="swap-price">
      <p>Price :</p>
      <p>
        {roundNumber(price, 4)} {coin1Name} Per {coin2Name}{" "}
      </p>
    </div>
  );
};

export default SwapPrice;
