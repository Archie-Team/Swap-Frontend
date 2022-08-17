import React, { useEffect, useState } from "react";
import MainCard from "../components/layout/MainCard";
import "./Swap.css";
import { MdSwapVert } from "react-icons/md";
import CoinField from "../components/coin/CoinField";
import { coins } from "../modules/coins";
import { addresses } from "../modules/addresses";
import SwapPriceImpact from "../components/swap/SwapPriceImpact";
import ERC20_abi from "../assets/files/ERC20.json";
import swapAbi from "../assets/files/Swap.json";
import toast, { Toaster } from "react-hot-toast";
import SwapPrice from "../components/swap/SwapPrice";
import SwapSlippageTolerance from "../components/swap/SwapSlippageTolerance";
import { roundNumber } from "../modules/formatNumbers";
import useContract from "../hooks/use-contract";
import { fromWei, toWei } from "../modules/web3Wei";
import useWeb3 from "../hooks/use-web3";
import useBalance from "../hooks/use-balance";
import { useSelector } from "react-redux";

const Swap = () => {
  const account = useSelector((state) => state.auth.account);
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

  const { getContract } = useContract();
  // const { contract: token2Contract, getContract: getToken2Contract } =
  //   useContract();
  // const { contract: swapContract, getContract: getSwapContract } =
  //   useContract();

  const [token1Contract, setToken1Contract] = useState(null);
  const [token2Contract, setToken2Contract] = useState(null);
  const [swapContract, setSwapContract] = useState(null);

  useEffect(() => {
    getContract(ERC20_abi.abi, coin1.address, (contract) =>
      setToken1Contract(contract)
    );
    getContract(ERC20_abi.abi, coin2.address, (contract) =>
      setToken2Contract(contract)
    );
  }, []);

  const [calculatedCoin1Amount, setCalculatedCoin1Amount] = useState("");
  const [calculatedCoin2Amount, setCalculatedCoin2Amount] = useState("");

  const { balance: token1Balance, getBalance: getToken1Balance } = useBalance();
  const { balance: token2Balance, getBalance: getToken2Balance } = useBalance();

  const updateTokenBalances = () => {
    getToken1Balance(token1Contract, account);
    getToken2Balance(token2Contract, account);
  };

  useEffect(() => {
    setCoin1((prev) => {
      return { ...prev, balance: token1Balance };
    });
  }, [token1Balance]);

  useEffect(() => {
    setCoin2((prev) => {
      return { ...prev, balance: token2Balance };
    });
  }, [token2Balance]);

  useEffect(() => {
    getContract(swapAbi.abi, addresses.swap_address, (contract) =>
      setSwapContract(contract)
    );
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
    let data = toWei(inputStringValue, "ether");
    setCoin1((prev) => {
      return { ...prev, amount: data };
    });

    await swapContract.methods
      .getAmountsOut(data, [coin1.address, coin2.address]) //execute amount of second (amountIn, convertible token address, result token address)
      .call()
      .then((res) => {
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
    let data = toWei(inputStringValue, "ether");
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
    if (token1Contract && token2Contract && account) {
      updateTokenBalances();
    }
  }, [token1Contract, account]);

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
      token1Contract,
      account,
      addresses.swap_address,
      async (tokenAllowence) => {
        if (tokenAllowence < Number(toWei(coin1.amount, "wei"))) {
          await approve(
            token1Contract,
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
      account
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

    await getAllowence(
      token1Contract,
      account,
      addresses.swap_address,
      async (tokenAllowence) => {
        if (tokenAllowence < Number(toWei(coin2.amount, "ether"))) {
          await approve(
            token1Contract,
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
      account
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
    roundNumber(fromWei(coin1.amount, "ether"), 4) >
      roundNumber(fromWei(coin1.balance, "ether"), 4) ||
    roundNumber(fromWei(coin2.amount, "ether"), 4) >
      roundNumber(fromWei(coin2.balance, "ether"), 4);

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
