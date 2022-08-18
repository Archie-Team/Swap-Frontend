import React, { useEffect, useState } from "react";
import MainCard from "../components/layout/MainCard";
import { BsPlusLg } from "react-icons/bs";
import "./Pool.css";
import { addresses } from "../modules/addresses";
import ERC20_abi from "../assets/files/ERC20.json";
import swap_abi from "../assets/files/Swap.json";
import { coins } from "../modules/coins";
import CoinField from "../components/coin/CoinField";
import { Toaster } from "react-hot-toast";
import useContract from "../hooks/use-contract";
import pair_abi from "../assets/files/Pair.json";
import { fromWei, toWei } from "../modules/web3Wei";
import useBalance from "../hooks/use-balance";
import { useSelector } from "react-redux";
import PoolActions from "../components/pool/PoolActions";
import PoolViewContract from "../components/pool/PoolViewContract";

const Pool = () => {
  const account = useSelector((state) => state.auth.account);
  const [swapContract, setSwapContract] = useState(null);
  const [pairContract, setPairContract] = useState(null);
  const [BUSDContract, setBUSDContract] = useState(null);
  const [BULCContract, setBULCContract] = useState(null);

  const { getContract: getContract } = useContract();

  const [coin1, setCoin1] = useState({
    ...coins.BULC,
    balance: "",
    amount: "",
    contract: null,
  });

  const [coin2, setCoin2] = useState({
    ...coins.BUSD,
    balance: "",
    amount: "",
    contract: null,
  });

  const changeBULCAmount = async (data) => {
    if (!data.value || data.value <= 0) {
      setCoin2((prev) => {
        return { ...prev, amount: "" };
      });
      return;
    }
    setCoin1((prev) => {
      return { ...prev, amount: data.value };
    });
    await getBalances().then(async (res) => {
      if (res.resBUSD < 2000 || res.resBULC < 2000) return;
      await quote(data.value, res.resBULC, res.resBUSD).then((res2) => {
        setCoin2((prev) => {
          return { ...prev, amount: fromWei(res2, "ether") };
        });
      });
    });
  };

  const { balance: BUSDBalance, getBalance: getBUSDBalance } = useBalance();
  const { balance: BULCBalance, getBalance: getBULCBalance } = useBalance();

  const updateTokenBalances = () => {
    getBULCBalance(BULCContract, account);
    getBUSDBalance(BUSDContract, account);
  };

  useEffect(() => {
    if (BULCContract && BUSDContract && account) {
      updateTokenBalances();
    }
  }, [BULCContract, BUSDContract, account]);

  useEffect(() => {
    setCoin2((prev) => {
      return { ...prev, balance: BUSDBalance };
    });
  }, [BUSDBalance]);

  useEffect(() => {
    setCoin1((prev) => {
      return { ...prev, balance: BULCBalance };
    });
  }, [BULCBalance]);

  const changeBUSDAmount = async (data) => {
    if (!data.value || data.value <= 0) {
      setCoin1((prev) => {
        return { ...prev, amount: "" };
      });
      return;
    }

    setCoin2((prev) => {
      return { ...prev, amount: data.value };
    });
    await getBalances().then(async (res) => {
      if (res.resBUSD < 2000 || res.resBULC < 2000) return;
      await quote(data.value, res.resBUSD, res.resBULC).then((res2) => {
        setCoin1((prev) => {
          return { ...prev, amount: fromWei(res2, "ether") };
        });
      });
    });
  };

  const getBalances = async () => {
    return await pairContract.methods
      .getReserves()
      .call()
      .then((res) => {
        return Promise.resolve({
          resBULC: res._reserve0,
          resBUSD: res._reserve1,
        }); //reserve0 --> bulc
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const quote = async (amount, reserve0, reserve1) => {
    if (!amount || amount === 0) return;

    return await swapContract.methods
      .quote(toWei(amount, "ether"), reserve0, reserve1)
      .call()
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getContract(swap_abi.abi, addresses.swap_address, (contract) =>
      setSwapContract(contract)
    );

    getContract(ERC20_abi.abi, addresses.BULC_address, (contract) =>
      setBULCContract(contract)
    );

    getContract(ERC20_abi.abi, addresses.BUSD_address, (contract) =>
      setBUSDContract(contract)
    );

    getContract(pair_abi.abi, addresses.pair_address, (contract) =>
      setPairContract(contract)
    );
  }, []);

  return (
    <MainCard className="pool-card">
      <div className="pool__containers">
        <PoolViewContract />

        <Toaster position="top-center" reverseOrder={false} />

        <CoinField
          coinBalance={coin1.balance}
          tokenImage={coin1.image}
          tokenName={coin1.name}
          tokenContract={BULCContract}
          tokenAddress={coin1.address}
          calculatedAmount={coin1.amount}
          onChangeInputHandler={changeBULCAmount}
        />

        <BsPlusLg className="pool-icon" />

        <CoinField
          coinBalance={coin2.balance}
          tokenImage={coin2.image}
          tokenName={coin2.name}
          tokenContract={BUSDContract}
          tokenAddress={coin2.address}
          calculatedAmount={coin2.amount}
          onChangeInputHandler={changeBUSDAmount}
        />
      </div>

      <PoolActions
        coin1={coin1}
        coin2={coin2}
        pairContract={pairContract}
        swapContract={swapContract}
        BULCContract={BULCContract}
        BUSDContract={BUSDContract}
        onUpdateTokenBalances={updateTokenBalances}
      />
    </MainCard>
  );
};

export default Pool;
