import React, { useContext, useEffect, useState } from "react";
import MainCard from "../components/layout/MainCard";
import { BsPlusLg } from "react-icons/bs";
import "./Pool.css";
import {
  approve,
  checkAllowence,
  getTokenBalance,
  initContract,
} from "../modules/web3Client";
import { addresses } from "../modules/addresses";
import ERC20_abi from "../assets/files/ERC20.json";
import swap_abi from "../assets/files/Swap.json";
import pair_abi from "../assets/files/Pair.json";
import Web3 from "web3";
import { coins } from "../modules/coins";
import CoinField from "../components/coin/CoinField";
import toast, { Toaster } from "react-hot-toast";
import Modal from "react-modal";
import RemoveLiquidity from "../components/pool/RemoveLiquidity";
import { BiLinkExternal } from "react-icons/bi";
import AuthContext from "../context/auth-context";

const Pool = () => {
  const [swapContract, setSwapContract] = useState("");
  const [BULCContarct, setBULCContarct] = useState(null);
  const [BUSDContarct, setBUSDContarct] = useState(null);
  const [pairContarct, setPairContarct] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const authCtx = useContext(AuthContext);

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
          return { ...prev, amount: Web3.utils.fromWei(res2, "ether") };
        });
      });
    });
  };

  const updateTokenBalances = () => {
    getTokenBalance(BULCContarct, authCtx.account).then((res) => {
      setCoin1((prev) => {
        return { ...prev, balance: res };
      });
    });

    getTokenBalance(BUSDContarct, authCtx.account).then((res) => {
      setCoin2((prev) => {
        return { ...prev, balance: res };
      });
    });
  };

  useEffect(() => {
    if (BULCContarct && BUSDContarct && authCtx.account) {
      updateTokenBalances();
    }
  }, [BULCContarct, BUSDContarct, authCtx.account]);

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
          return { ...prev, amount: Web3.utils.fromWei(res2, "ether") };
        });
      });
    });
  };

  const getBalances = async () => {
    return await pairContarct.methods
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
      .quote(Web3.utils.toWei(amount, "ether"), reserve0, reserve1)
      .call()
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addLiquidity = async (account) => {
    await checkAllowence(
      BUSDContarct,
      account,
      addresses.swap_address
    ).then(async (res) => {
      if (res < Number(Web3.utils.toWei(coin2.amount, "ether"))) {
        await approve(
          BUSDContarct,
          Web3.utils.toWei("100000000000000", "tether"),
          account,
          addresses.swap_address
        ).then((res2) => {
          toast.success(res2);
        });
      } else {
        console.log("No Need to Approve BUSD");
        return;
      }
    });

    await checkAllowence(
      BULCContarct,
      account,
      addresses.swap_address
    ).then(async (res) => {
      if (res < Number(Web3.utils.toWei(coin1.amount, "ether"))) {
        await approve(
          BULCContarct,
          Web3.utils.toWei("100000000000000", "tether"),
          account,
          addresses.swap_address
        )
          .then((res2) => {
            toast.success(res2);
          })
          .catch((err) => {
            console.log("approve has error");
          });
      } else {
        console.log("no need approve BULC");
        return;
      }
    });

    await swapContract.methods
      .addLiquidity(
        addresses.BULC_address,
        addresses.BUSD_address,
        Web3.utils.toWei(coin1.amount, "ether"),
        Web3.utils.toWei(coin2.amount, "ether"),
        1,
        1,
        account,
        324324324234234
      )
      .send({ from: account })
      .then((res) => {
        updateTokenBalances();
        toast.success("add Liquidity was successfull !");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const removeLiquidity = async (input) => {
    let LPToken = input.current.value;
    let account = authCtx.account;

    await checkAllowence(
      pairContarct,
      account,
      addresses.swap_address
    ).then(async (res) => {
      if (res < Number(Web3.utils.toWei(LPToken, "ether"))) {
        await approve(
          pairContarct,
          Web3.utils.toWei("10000000000000000000000000", "tether"),
          account,
          addresses.swap_address
        ).then((res2) => {
          toast.success(res2);
        });
      } else {
        return;
      }
    });

    await swapContract.methods
      .removeLiquidity(
        coin1.address,
        coin2.address,
        Web3.utils.toWei(LPToken, "ether"),
        1,
        1,
        account
      )
      .send({ from: account })
      .then((res) => {
        closeModal();
        toast.success("remove Liquidity was successfull !");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    initContract(swap_abi.abi, addresses.swap_address).then((res) => {
      setSwapContract(res);
    });

    initContract(ERC20_abi.abi, addresses.BULC_address).then((res) => {
      setBULCContarct(res);
    });

    initContract(ERC20_abi.abi, addresses.BUSD_address).then((res) => {
      setBUSDContarct(res);
    });

    initContract(pair_abi.abi, addresses.pair_address).then((res) => {
      setPairContarct(res);
    });
  }, []);

  return (
    <MainCard className="pool-card">
      <div className="pool__containers">
        <div className="link-to-address">
          <p>View Contract</p>
          <BiLinkExternal className="icon" />
        </div>
        <Toaster position="top-center" reverseOrder={false} />
        <CoinField
          coinBalance={coin1.balance}
          tokenImage={coin1.image}
          tokenName={coin1.name}
          tokenContract={BULCContarct}
          tokenAddress={coin1.address}
          calculatedAmount={coin1.amount}
          onChangeInputHandler={changeBULCAmount}
        />

        <BsPlusLg className="pool-icon" />

        <CoinField
          coinBalance={coin2.balance}
          tokenImage={coin2.image}
          tokenName={coin2.name}
          tokenContract={BUSDContarct}
          tokenAddress={coin2.address}
          calculatedAmount={coin2.amount}
          onChangeInputHandler={changeBUSDAmount}
        />
      </div>

      {modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="Modal"
          overlayClassName="Overlay"
          ariaHideApp={false}
        >
          <RemoveLiquidity
            onCloseModal={closeModal}
            onRemoveLiquidity={removeLiquidity}
            coinsAddress={{ coin1: coin1.address, coin2: coin2.add }}
            contract={pairContarct}
            address={addresses.pair_address}
          />
        </Modal>
      )}

      <div className="pool-actions">
        <button onClick={openModal} className="main-button">
          Remove
        </button>
        <button
          onClick={() => addLiquidity(authCtx.account)}
          className="main-button supply"
        >
          Supply
        </button>
      </div>
    </MainCard>
  );
};

export default Pool;
