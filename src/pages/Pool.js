import React, { useContext, useEffect, useState } from "react";
import MainCard from "../components/layout/MainCard";
import { BsPlusLg } from "react-icons/bs";
import "./Pool.css";
import {
  approve,
  checkAllowence,
  getTokenBalance,
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
import { Link } from "react-router-dom";
import useContract from "../hooks/use-contract";

const Pool = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const authCtx = useContext(AuthContext);

  const { contract: swapContract, getContract: getSwapContract } =
    useContract();
  const { contract: BULCContract, getContract: getBULCContract } =
    useContract();
  const { contract: BUSDContract, getContract: getBUSDContract } =
    useContract();
  const { contract: pairContract, getContract: getpairContract } =
    useContract();

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
    getTokenBalance(BULCContract, authCtx.account).then((res) => {
      setCoin1((prev) => {
        return { ...prev, balance: res };
      });
    });

    getTokenBalance(BUSDContract, authCtx.account).then((res) => {
      setCoin2((prev) => {
        return { ...prev, balance: res };
      });
    });
  };

  useEffect(() => {
    if (BULCContract && BUSDContract && authCtx.account) {
      updateTokenBalances();
    }
  }, [BULCContract, BUSDContract, authCtx.account]);

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
    await checkAllowence(BUSDContract, account, addresses.swap_address).then(
      async (res) => {
        if (res < Number(Web3.utils.toWei(coin2.amount, "ether"))) {
          await approve(
            BUSDContract,
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
      }
    );

    await checkAllowence(BULCContract, account, addresses.swap_address).then(
      async (res) => {
        if (res < Number(Web3.utils.toWei(coin1.amount, "ether"))) {
          await approve(
            BULCContract,
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
      }
    );

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

    await checkAllowence(pairContract, account, addresses.swap_address).then(
      async (res) => {
        if (res < Number(Web3.utils.toWei(LPToken, "ether"))) {
          await approve(
            pairContract,
            Web3.utils.toWei("10000000000000000000000000", "tether"),
            account,
            addresses.swap_address
          ).then((res2) => {
            toast.success(res2);
          });
        } else {
          return;
        }
      }
    );

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
    getSwapContract(swap_abi.abi, addresses.swap_address);
    // .then((res) => {
    //   setSwapContract(res);
    // });

    getBULCContract(ERC20_abi.abi, addresses.BULC_address);
    // .then((res) => {
    //   setBULCContract(res);
    // });

    getBUSDContract(ERC20_abi.abi, addresses.BUSD_address);
    // .then((res) => {
    //   setBUSDContract(res);
    // });

    getpairContract(pair_abi.abi, addresses.pair_address);
    // .then((res) => {
    //   setPairContract(res);
    // });
  }, []);

  return (
    <MainCard className="pool-card">
      <div className="pool__containers">
        <div className="link-to-address">
          <Link
            className="link"
            to={{
              pathname:
                "https://ropsten.etherscan.io/address/" +
                addresses.pair_address,
            }}
            target="_blank"
          >
            View Contract
            <BiLinkExternal className="icon" />
          </Link>
        </div>
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
            contract={pairContract}
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
