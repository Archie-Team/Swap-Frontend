import React, { useEffect, useState } from "react";
import Token from "./Token";
import "./TokensInWallet.css";
import { coins } from "../../modules/coins";
import { addresses } from "../../modules/addresses";
import ERC20_abi from "../../assets/files/ERC20.json";
import useContract from "../../hooks/use-contract";
import useBalance from "../../hooks/use-balance";
import { useSelector } from "react-redux";

const TokenInWallet = () => {
  const account = useSelector((state) => state.auth.account);
  const [BULCContract, setBULCContract] = useState(null);
  const [BUSDContract, setBUSDContract] = useState(null);

  const { getContract } = useContract();
  
  const { balance: BULCBalance, getBalance: getBULCBalance } = useBalance();
  const { balance: BUSDBalance, getBalance: getBUSDBalance } = useBalance();

  useEffect(() => {
    getContract(ERC20_abi.abi, addresses.BUSD_address, (contract) =>
      setBUSDContract(contract)
    );
    getContract(ERC20_abi.abi, addresses.BULC_address, (contract) =>
      setBULCContract(contract)
    );
  }, []);

  useEffect(() => {
    if (BULCContract && BUSDContract && account) {
      getBUSDBalance(BUSDContract, account);
      getBULCBalance(BULCContract, account);
    }
  }, [BUSDContract, BULCContract, account]);

  return (
    <div className="tokens-inwallet">
      <p className="title">Tokens In Wallet</p>
      <div className="tokens-inwallet_container">
        <Token tokenBalance={BUSDBalance} tokenUrl={coins.BUSD.image} />
        <Token tokenBalance={BULCBalance} tokenUrl={coins.BULC.image} />
      </div>
    </div>
  );
};

export default TokenInWallet;
