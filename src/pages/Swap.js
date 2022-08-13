import React, { useContext, useEffect, useState } from "react";
import MainCard from "../components/layout/MainCard";
import "./Swap.css";
import { MdSwapVert } from "react-icons/md";
import CoinField from "../components/coin/CoinField";
import { coins } from "../modules/coins";
import { addresses } from "../modules/addresses";
import SwapPriceImpact from "../components/swap/SwapPriceImpact";
import Web3 from "web3";
import {
  approve,
  checkAllowence,
  getTokenBalance,
} from "../modules/web3Client";
import ERC20_abi from "../assets/files/ERC20.json";
import swapAbi from "../assets/files/Swap.json";
import toast, { Toaster } from "react-hot-toast";
import AuthContext from "../context/auth-context";
import SwapPrice from "../components/swap/SwapPrice";
import SwapSlippageTolerance from "../components/swap/SwapSlippageTolerance";
import { roundNumber } from "../modules/formatNumbers";
import { fromWei } from "../modules/convertors";
import useContract from "../hooks/use-contract";

const Swap = () => {
  const authCtx = useContext(AuthContext);
  const [slippageTolerance, setSlippageTolerance] = useState(2);

  const [coin1, setCoin1] = useState({
    ...coins.BUSD,
    balance: "",
    amount: "",
    calculatedAmount: "",
    contract: null,
  });

  const [coin2, setCoin2] = useState({
    ...coins.BULC,
    balance: "",
    amount: "",
    calculatedAmount: "",
    contract: null,
  });

  const { contract: token1Contract, getContract: getToken1Contract } =
    useContract();
  const { contract: token2Contract, getContract: getToken2Contract } =
    useContract();
  const { contract: swapContract, getContract: getSwapContract } =
    useContract();

  useEffect(() => {
    getToken1Contract(ERC20_abi.abi, coin1.address);
    getToken2Contract(ERC20_abi.abi, coin2.address);
  }, []);

  const [calculatedCoin1Amount, setCalculatedCoin1Amount] = useState("");
  const [calculatedCoin2Amount, setCalculatedCoin2Amount] = useState("");

  const updateTokenBalances = () => {
    getTokenBalance(token1Contract, authCtx.account).then((res) => {
      setCoin1((prev) => {
        return { ...prev, balance: res };
      });
    });

    getTokenBalance(token2Contract, authCtx.account).then((res) => {
      setCoin2((prev) => {
        return { ...prev, balance: res };
      });
    });
  };

  useEffect(() => {
    getSwapContract(swapAbi.abi, addresses.swap_address);
  }, []);

  const changeFirstInputHandler = async (input) => {
    setCoin1((prev) => {
      return { ...prev, amount: "" };
    });
    setCoin2((prev) => {
      return { ...prev, amount: "" };
    });

    if (!input.value || input.value <= 0) {
      setCalculatedCoin2Amount("");
      return;
    }

    let inputStringValue = input.value.toString();
    let data = Web3.utils.toWei(inputStringValue, "ether");
    setCoin1((prev) => {
      return { ...prev, amount: data };
    });

    await swapContract.methods
      .getAmountsOut(data, [coin1.address, coin2.address]) //execute amount of second (amountIn, convertible token address, result token address)
      .call()
      .then((res) => {
        // let val = Web3.utils.fromWei(res[1], "ether");
        setCalculatedCoin2Amount(res[1]);
      })
      .catch((err) => {
        setCalculatedCoin2Amount("");
      });
  };

  const changeSecCoinHandler = async (input) => {
    setCoin1((prev) => {
      return { ...prev, amount: "" };
    });
    setCoin2((prev) => {
      return { ...prev, amount: "" };
    });

    if (!input.value || input.value <= 0) {
      setCoin1((prev) => {
        return { ...prev, amount: "" };
      });
      setCoin2((prev) => {
        return { ...prev, amount: "" };
      });
      setCalculatedCoin1Amount("");
      return;
    }

    let inputStringValue = input.value.toString();
    let data = Web3.utils.toWei(inputStringValue, "ether");
    setCoin2((prev) => {
      return { ...prev, amount: data };
    });

    await swapContract.methods
      .getAmountsIn(data, [coin1.address, coin2.address]) //execute amount of second (amount, convertible token address, result token address)
      .call()
      .then((res) => {
        setCalculatedCoin1Amount(res[0]);
      });
  };

  useEffect(() => {
    if (token1Contract && token2Contract && authCtx.account) {
      updateTokenBalances();
    }
  }, [token1Contract, authCtx.account]);

  const swap = async (
    contract,
    methodName,
    amount,
    address1,
    address2,
    amountOut,
    account
  ) => {
    return await contract.methods[methodName](
      amount, // coin1.amount,
      amountOut,
      [address1, address2],
      account,
      9876543210
    )
      .send({ from: account })
      .then((res) => {
        return Promise.resolve("Swap Was Successfull");
      })
      .catch((err) => {
        return Promise.reject("Error in Swap");
      });
  };

  const swapFirstCoinFunction = async () => {
    console.log("swapfirstCoinFunction");

    await checkAllowence(
      token1Contract,
      authCtx.account,
      addresses.swap_address
    ).then(async (res) => {
      if (res < Web3.utils.toWei(coin1.amount, "wei")) {
        await approve(
          token1Contract,
          Web3.utils.toWei(coin1.amount, "tether"),
          authCtx.account,
          addresses.swap_address
        );
      } else {
        return;
      }
    });

    let temp = Number(calculatedCoin2Amount);
    let amountOutMin = temp - (slippageTolerance / 100) * temp;

    const amountOutMin_string = amountOutMin.toLocaleString("fullwide", {
      useGrouping: false,
    });

    swap(
      swapContract,
      "swapExactTokensForTokens",
      coin1.amount,
      coin1.address,
      coin2.address,
      amountOutMin_string,
      authCtx.account
    )
      .then((res) => {
        toast.success(res);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const swapSecCoinFunction = async () => {
    console.log("swapSecCoinFunction");
    await checkAllowence(
      token1Contract,
      authCtx.account,
      addresses.swap_address
    ).then(async (res) => {
      if (res < Web3.utils.toWei(coin2.amount, "ether")) {
        await approve(
          token1Contract,
          Web3.utils.toWei(coin2.amount, "tether"),
          authCtx.account,
          addresses.swap_address
        );
      } else {
        return;
      }
    });

    let temp = Number(calculatedCoin1Amount);
    let amountOutMax = temp + (slippageTolerance / 100) * temp;

    const amountOutMax_string = amountOutMax.toLocaleString("fullwide", {
      useGrouping: false,
    });

    swap(
      swapContract,
      "swapTokensForExactTokens",
      coin2.amount,
      coin1.address,
      coin2.address,
      amountOutMax_string,
      authCtx.account
    )
      .then((res) => {
        toast.success(res);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const callingSwapHanlder = () => {
    console.log("coin1.amount", coin1.amount);
    console.log("coin2.amount", coin2.amount);

    if (coin1.amount) {
      swapFirstCoinFunction();
    } else if (coin2.amount) {
      swapSecCoinFunction();
    }
  };

  const changeSwapState = async () => {
    let temp = coin1;
    setCoin1(coin2);
    setCoin2(temp);
    setCoin1((prev) => {
      return { ...prev, amount: "" };
    });
    setCoin2((prev) => {
      return { ...prev, amount: "" };
    });
    setCalculatedCoin1Amount("");
    setCalculatedCoin2Amount("");
  };

  function submitSlippageToleranceAmount(val) {
    setSlippageTolerance(val);
  }

  const insufficientBalance =
    roundNumber(fromWei(coin1.amount), 4) >
      roundNumber(fromWei(coin1.balance), 4) ||
    roundNumber(fromWei(coin2.amount), 4) >
      roundNumber(fromWei(coin2.balance), 4);

  return (
    <MainCard className="swap-card">
      <Toaster position="top-center" reverseOrder={false} />

      <div>
        <CoinField
          tokenImage={coin1.image}
          tokenName={coin1.name}
          tokenAddress={coin1.address}
          tokenContract={token1Contract}
          coinBalance={coin1.balance}
          onChangeInputHandler={changeFirstInputHandler}
          calculatedAmount={Web3.utils.fromWei(calculatedCoin1Amount, "ether")}
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
          calculatedAmount={Web3.utils.fromWei(calculatedCoin2Amount, "ether")}
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

      <div className="swap-actions">
        <button
          onClick={callingSwapHanlder}
          className="main-button"
          disabled={insufficientBalance}
        >
          {insufficientBalance ? "Insufficient Balance" : "Swap"}
        </button>
      </div>

      <SwapPriceImpact
        contract={swapContract}
        amount={coin1.amount}
        pathAddrress={[coin1.address, coin2.address]}
      />
    </MainCard>
  );
};

export default Swap;
