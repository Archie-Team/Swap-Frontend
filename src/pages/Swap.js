import React, { useEffect, useState } from "react";
import MainCard from "../components/layout/MainCard";
import "./Swap.css";
import { coins } from "../modules/coins";
import { addresses } from "../modules/addresses";
import SwapPriceImpact from "../components/swap/SwapPriceImpact";
import ERC20_abi from "../assets/files/ERC20.json";
import swapAbi from "../assets/files/Swap.json";
import toast, { Toaster } from "react-hot-toast";
import { roundNumber } from "../modules/formatNumbers";
import useContract from "../hooks/use-contract";
import { fromWei, toWei } from "../modules/web3Wei";
import useWeb3 from "../hooks/use-web3";
import useBalance from "../hooks/use-balance";
import { useSelector } from "react-redux";
import useCoin from "../hooks/use-coin";
import SwapForm from "../components/swap/SwapForm";

const Swap = () => {
  const account = useSelector((state) => state.auth.account);

  const slippageTolerance = useSelector(
    (state) => state.sTol.slippageTolerance
  );

  const { getContract } = useContract();

  const {
    coin: coin1,
    setCoinHandler: setCoin1,
    setCoinValueHandler: setCoin1Value,
  } = useCoin(coins.BUSD);

  const {
    coin: coin2,
    setCoinValueHandler: setCoin2Value,
    setCoinHandler: setCoin2,
  } = useCoin(coins.BULC);

  const [swapContract, setSwapContract] = useState(null);

  useEffect(() => {
    getContract(ERC20_abi.abi, coin1.address, (contract) =>
      setCoin1Value("contract", contract)
    );
    getContract(ERC20_abi.abi, coin2.address, (contract) =>
      setCoin2Value("contract", contract)
    );
  }, []);

  const { balance: token1Balance, getBalance: getToken1Balance } = useBalance();
  const { balance: token2Balance, getBalance: getToken2Balance } = useBalance();

  const updateTokenBalances = () => {
    getToken1Balance(coin1.contract, account);
    getToken2Balance(coin2.contract, account);
  };

  useEffect(() => {
    setCoin1Value("balance", token1Balance);
  }, [token1Balance]);

  useEffect(() => {
    setCoin2Value("balance", token2Balance);
  }, [token2Balance]);

  useEffect(() => {
    getContract(swapAbi.abi, addresses.swap_address, (contract) =>
      setSwapContract(contract)
    );
  }, []);

  const changeFirstInputHandler = async (input) => {
    setCoin1Value("amount", 0);
    setCoin2Value("amount", 0);

    if (!input.value || input.value <= 0) {
      setCoin2Value("calculatedAmount", "");
      return;
    }

    let inputStringValue = input.value.toString();
    let data = toWei(inputStringValue, "ether");

    setCoin1Value("amount", data);

    await swapContract.methods
      .getAmountsOut(data, [coin1.address, coin2.address]) //execute amount of second (amountIn, convertible token address, result token address)
      .call()
      .then((res) => {
        setCoin2Value("calculatedAmount", res[1]);
      })
      .catch((err) => {
        setCoin1Value("calculatedAmount", "");
      });
  };

  const changeSecInputHandler = async (input) => {
    setCoin1Value("amount", 0);
    setCoin2Value("amount", 0);

    if (!input.value || input.value <= 0) {
      setCoin1Value("amount", 0);
      setCoin2Value("amount", 0);

      setCoin1Value("calculatedAmount", 0);
      return;
    }

    let inputStringValue = input.value.toString();
    let data = toWei(inputStringValue, "ether");

    setCoin2Value("amount", data);

    await swapContract.methods
      .getAmountsIn(data, [coin1.address, coin2.address]) //execute amount of second (amount, convertible token address, result token address)
      .call()
      .then((res) => {
        setCoin1Value("calculatedAmount", res[0]);
      });
  };

  useEffect(() => {
    if (coin1.contract && coin2.contract && account) {
      updateTokenBalances();
    }
  }, [coin1.contract, account]);

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

  const { getAllowence, approve } = useWeb3();

  const swapFirstCoinFunction = async () => {
    console.log("swapfirstCoinFunction");

    await getAllowence(
      coin1.contract,
      account,
      addresses.swap_address,
      async (tokenAllowence) => {
        if (tokenAllowence < Number(toWei(coin1.amount, "wei"))) {
          await approve(
            coin1.contract,
            toWei("100000000000000", "tether"),
            account,
            addresses.swap_address,
            (res) => {
              toast.success(res);
            }
          );
        } else {
          console.log("No Need to Approve");
        }
      }
    );

    let temp = Number(coin2.calculatedAmount);
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
      account
    )
      .then((res) => {
        updateTokenBalances();
        toast.success(res);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const swapSecCoinFunction = async () => {
    console.log("swapSecCoinFunction");

    await getAllowence(
      coin1.contract,
      account,
      addresses.swap_address,
      async (tokenAllowence) => {
        if (tokenAllowence < Number(toWei(coin2.amount, "ether"))) {
          await approve(
            coin1.contract,
            toWei("100000000000000", "tether"),
            account,
            addresses.swap_address,
            (res) => {
              toast.success(res);
            }
          );
        } else {
          console.log("No Need to Approve");
        }
      }
    );

    let temp = Number(coin1.calculatedAmount);
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
      account
    )
      .then((res) => {
        updateTokenBalances();
        toast.success(res);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const callingSwapHanlder = () => {
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
    setCoin1Value("amount", 0);
    setCoin2Value("amount", 0);
    setCoin1Value("calculatedAmount", 0);
    setCoin2Value("calculatedAmount", 0);
  };

  const insufficientBalance =
    roundNumber(fromWei(coin1.amount, "ether"), 4) >
      roundNumber(fromWei(coin1.balance, "ether"), 4) ||
    roundNumber(fromWei(coin2.amount, "ether"), 4) >
      roundNumber(fromWei(coin2.balance, "ether"), 4);

  return (
    <MainCard className="swap-card">
      <Toaster position="top-center" reverseOrder={false} />

      <SwapForm
        coin1={coin1}
        coin2={coin2}
        swapContract={swapContract}
        onChangeFirstInput={changeFirstInputHandler}
        onChangeSecInput={changeSecInputHandler}
        onChangeSwapState={changeSwapState}
      />

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
