import React, { useEffect, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./ConnectWallet.css";
import web3 from "web3";
import { getCurrentChainId } from "../../modules/web3Client";
import { IoWalletOutline } from "react-icons/io5";
import AuthContext from "../../context/auth-context";

const ConnectWallet = () => {
  const { ethereum } = window;
  const authCtx = useContext(AuthContext);

  const shortAccountAddress = () => {
    return "0x..." + authCtx.account.substr(authCtx.account.length - 4);
  };

  // const switchNetwork = async () => {
  //   await window.ethereum.request({
  //     method: "wallet_switchEthereumChain",
  //     params: [{ chainId: networksId.testNetworkId }],
  //   });
  //   // refresh
  //   window.location.reload();
  // };

  async function connectToWallet() {
    try {
      await ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then((res) => {
          let account = web3.utils.toChecksumAddress(res[0]);
          authCtx.onLogin(account);
          getCurrentChainId().then((res) => {
            authCtx.onSetNetworkId(res);
          });
        });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (!ethereum) {
        toast.error("Please install Metamask!");
      }
   
      // check if user disconnect or change account
      ethereum.on("accountsChanged", (accounts) => {
        accounts[0] ? authCtx.onLogin(accounts[0]) : authCtx.onLogout();
      });

      ethereum.on("chainChanged", (chainId) => {
        authCtx.onSetNetworkId(chainId);
      });

      //check if wallet is connected
      await ethereum.request({ method: "eth_accounts" }).then((res) => {
        authCtx.onLogin(res[0]);
      });

      await getCurrentChainId().then((res) => {
        authCtx.onSetNetworkId(res);
      });
      
    };
    connectWalletOnPageLoad();
  }, []);

  return (
    <div className="connect-wallet__actions">
      <Toaster position="top-center" reverseOrder={false} />
      {!authCtx.account ? (
        <button className="connect-wallet__button" onClick={connectToWallet}>
          Connect to MetaMask
        </button>
      ) : (
        <div className="wallet-information">
          <div className="wallet-icon">
            <IoWalletOutline />
          </div>
          <p className="">{shortAccountAddress()}</p>
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;
