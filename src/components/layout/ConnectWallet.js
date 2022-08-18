import React from "react";
import "./ConnectWallet.css";
import { IoWalletOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { ethRequestAccounts } from "../../store/wallet-actions";

const ConnectWallet = () => {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.auth.account);

  const shortAccountAddress = () => {
    return "0x..." + account.substr(account.length - 4);
  };

  const connectToWallet = () => {
    dispatch(ethRequestAccounts());
  };

  return (
    <div className="connect-wallet__actions">
      {!account ? (
        <button className="connect-wallet__button" onClick={connectToWallet}>
          Connect to MetaMask
        </button>
      ) : (
        <div className="wallet-information">
          <div className="wallet-icon">
            <IoWalletOutline />
          </div>
          <p>{shortAccountAddress()}</p>
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;
