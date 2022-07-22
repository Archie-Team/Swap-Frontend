import React, { useContext, useEffect, useState } from "react";
import MainCard from "../components/layout/MainCard";
import "./Swap.css";
import { MdSwapVert } from "react-icons/md";
import CoinField from "../components/coin/CoinField";
import { coins } from "../modules/coins";
import { addresses } from "../modules/addresses";
import Web3 from "web3";
import {
  approve,
  checkAllowence,
  getTokenBalance,
  initContract,
} from "../modules/web3Client";
import ERC20_abi from "../assets/files/ERC20.json";
import swapAbi from "../assets/files/Swap.json";
import toast, { Toaster } from "react-hot-toast";
import AuthContext from "../context/auth-context";

const Swap = () => {
  const [swapContract, setSwapContract] = useState(null);
  const [token1Contract, setToken1Contract] = useState(null);
  const [token2Contract, setToken2Contract] = useState(null);
  const authCtx = useContext(AuthContext)


  const [coin1, setCoin1] = useState({
    ...coins.BUSD,
    balance: "",
    amount: "",
    contract: null,
  });

  const [coin2, setCoin2] = useState({
    ...coins.BULC,
    balance: "",
    amount: "",
    contract: null,
  });

  const [coin1Amount, setCoin1Amount] = useState("");
  const [coin2Amount, setCoin2Amount] = useState("");
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
    initContract(swapAbi.abi, addresses.contract_Address).then((res) => {
      setSwapContract(res);
    });
  }, []);


  const changeFirstInputHandler = async (input) => {
    if (!input.value || input.value === 0) {
      setCalculatedCoin2Amount("");
      return;
    }
    setCoin2Amount("");
    let inputStringValue = input.value.toString();
    let data = Web3.utils.toWei(inputStringValue, "ether");
    setCoin1Amount(data);

    await swapContract.methods
      .getAmountsOut(data, [coin1.address, coin2.address]) //execute amount of second (amount, convertible token address, result token address)
      .call()
      .then((res) => {
        let val = Web3.utils.fromWei(res[1], "ether");
        setCalculatedCoin2Amount(val);
      })
      .catch((err) => {
        setCalculatedCoin2Amount(0);
      });
  };

  
  const changeSecCoinHandler = async (input) => {
    if (!input.value || input.value === 0) {
      setCalculatedCoin1Amount("");
      return;
    }


    setCoin1Amount("");
    let inputStringValue = input.value.toString();
    let data = Web3.utils.toWei(inputStringValue, "ether");
    setCoin2Amount(data);

    await swapContract.methods
      .getAmountsIn(data, [coin1.address, coin2.address]) //execute amount of second (amount, convertible token address, result token address)
      .call()
      .then((res) => {
        let val = Web3.utils.fromWei(res[0], "ether");
        setCalculatedCoin1Amount(val);
      });
  };


  useEffect(() => {
    if (token1Contract && token2Contract && authCtx.account) {
      updateTokenBalances();
    }
  }, [authCtx.account]);


  const swap = async (
    contract,
    methodName,
    amount,
    address1,
    address2,
    amountOutMin,
    account
  ) => {

    return await contract.methods[methodName](
      amount, // coin1.amount,
      amountOutMin, //ask from client
      [address1, address2],
      account,
      9876543210
    )
      .send({ from:  account })
      .then((res) => {
        return Promise.resolve("Swap Was Successfull");
      })
      .catch((err) => {
        return Promise.reject("Error in Swap");
      });
  };

  const swapFirstCoinFunction = async () => {
    await checkAllowence(
      token1Contract,
      authCtx.account,
      addresses.contract_Address
    ).then(async (res) => {
      if (res < Web3.utils.toWei(coin1Amount, "ether")) {
        await approve(
          token1Contract,
          Web3.utils.toWei(coin1Amount, "tether"),
          authCtx.account,
          addresses.contract_Address
        );
      } else {
        return;
      }
    });

 
    swap(
      swapContract,
      "swapExactTokensForTokens",
      coin1Amount,
      coin1.address,
      coin2.address,
      Web3.utils.fromWei(coin1Amount, "Kwei"),
      authCtx.account
    )
      .then((res) => {
        // updateTokenBalances()
        toast.success(res);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const swapSecCoinFunction = async () => {
    await checkAllowence(
      token1Contract,
      authCtx.account,
      addresses.contract_Address
    ).then(async (res) => {
      if (res < Web3.utils.toWei(coin2Amount, "ether")) {
        await approve(
          token1Contract,
          Web3.utils.toWei(coin2Amount, "tether"),
          authCtx.account,
          addresses.contract_Address
        );
      } else {
        return;
      }
    });

    swap(
      swapContract,
      "swapTokensForExactTokens",
      coin2Amount,
      coin1.address,
      coin2.address,
      coin2Amount + Math.pow(10, 16),
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
    if (!coin1Amount) {
      swapSecCoinFunction();
    } else if (!coin2Amount) {
      swapFirstCoinFunction();
    }
  };

  const changeSwapState = async () => {
    let temp = coin1;
    setCoin1(coin2);
    setCoin2(temp);
    setCoin1Amount("");
    setCoin2Amount("");
    setCalculatedCoin1Amount(0);
    setCalculatedCoin2Amount(0);
  };

  useEffect(() => {
    initContract(ERC20_abi.abi, coin1.address).then((res) => {
      setToken1Contract(res);
    });

    initContract(ERC20_abi.abi, coin2.address).then((res) => {
      setToken2Contract(res);
    });
  }, [coin1, coin2]);

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
          calculatedAmount={calculatedCoin1Amount}
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
          calculatedAmount={calculatedCoin2Amount}
          onChangeInputHandler={changeSecCoinHandler}
        />
      </div>

      <div className="swap-actions">
        <button onClick={callingSwapHanlder} className="main-button">
          Swap
        </button>
      </div>
    </MainCard>
  );
};

export default Swap;
