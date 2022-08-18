import { useState } from "react";

const useCoin = (initialCoin) => {
  const [coin, setCoin] = useState({
    ...initialCoin,
    balance: "",
    amount: "",
    calculatedAmount: "",
    contract: null,
  });

  const setCoinHandler = (coin) => {
    setCoin(coin);
  };

  const setCoinValueHandler = (key, value) => {
    setCoin((prev) => {
      return { ...prev, [key]: value };
    });
  };

  return {
    coin,
    setCoinHandler,
    setCoinValueHandler,
  };
};

export default useCoin;
