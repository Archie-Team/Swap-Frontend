import React, { useState,useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./ConnectWallet.css";
import web3 from 'web3';
import { IoWalletOutline } from "react-icons/io5";

const ConnectWallet = () => {
  const { ethereum } = window;
  const [account, setAccount] = useState(null);

  const setAccountAddress = (account) => {
    setAccount(account);
    localStorage.setItem("account", account);
  }

  const unsetAccountAddress = () => {
    setAccount(null);
    localStorage.removeItem("account");
}

const shortAccountAddress =()=> {
  return '0x...' + account.substr(account.length - 4);
}


  async function connectToWallet() {
    try {
      await ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then((res) => {
          let account = web3.utils.toChecksumAddress(res[0]);
          setAccountAddress(account)
        });
    } catch (err) {
      console.log(err);
    }
  }

  async function disconnectFromWallet() {
    unsetAccountAddress()
  }

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (!ethereum) {
        toast.error("Please install Metamask!");
      }

      // check if user disconnect or change account
      ethereum.on("accountsChanged", (accounts) => {
     
        accounts[0] ? setAccountAddress(accounts[0]) : unsetAccountAddress()
      });

      //check if wallet is connected
      await ethereum.request({ method: "eth_accounts" }).then((res) => {
        setAccountAddress(res[0])
      });
    };
    connectWalletOnPageLoad();
  }, []);

  return (
    <div className="connect-wallet__actions">
      <Toaster position="top-center" reverseOrder={false} />
      {!account ? (
        <button className="connect-wallet__button" onClick={connectToWallet}>
          Connect to MetaMask
        </button>
      ) : (
       <div className="wallet-information">
        <div className="wallet-icon">
        <IoWalletOutline />

        </div>
         <p className="">
          {shortAccountAddress()}
        </p>
       </div>
      )}
    </div>
  );
};

export default ConnectWallet;
