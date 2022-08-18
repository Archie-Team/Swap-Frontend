import { useEffect, useState } from "react";
import { coins } from "../modules/coins";

const useCoin = (initialCoin) => {
  const [coin, setCoin] = useState({
    ...initialCoin,
    balance: "",
    amount: "",
    calculatedAmount: "",
    contract: null,
  });

//   useEffect(() => {
//     console.log(coin);
//   }, [coin]);

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
    setCoinValueHandler
  };
};

export default useCoin;
