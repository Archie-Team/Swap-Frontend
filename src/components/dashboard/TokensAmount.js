import React from "react";
import TokensInWallet from "./TokensInWallet";
import { useSelector } from "react-redux";

import { addresses } from "../../modules/addresses";
import ERC20_abi from "../../assets/files/ERC20.json";
import pair_abi from "../../assets/files/Pair.json";
import stake_abi from "../../assets/files/Staking.json";
import stake2_abi from "../../assets/files/Staking2.json";
import useContract from "../../hooks/use-contract";

import { useState } from "react";
import { useEffect } from "react";
import TokensToHarvest from "./TokensToHarvest";
import "./TokensAmount.css";

const TokensAmount = () => {
  const account = useSelector((state) => state.auth.account);

  const [BULCContract, setBULCContract] = useState(null);
  const [BUSDContract, setBUSDContract] = useState(null);
  const [pairContract, setPairContract] = useState(null);
  const [stakeContract, setStakeContract] = useState(null);
  const [stakeContract2, setStakeContract2] = useState(null);

  const { getContract } = useContract();

  useEffect(() => {
    getContract(ERC20_abi.abi, addresses.BUSD_address, (contract) =>
      setBUSDContract(contract)
    );
    getContract(ERC20_abi.abi, addresses.BULC_address, (contract) =>
      setBULCContract(contract)
    );
    getContract(pair_abi.abi, addresses.pair_address, (contract) =>
      setPairContract(contract)
    );
    getContract(stake_abi.abi, addresses.staking_address, (contract) =>
      setStakeContract(contract)
    );
    getContract(stake2_abi.abi, addresses.staking2_address, (contract) =>
      setStakeContract2(contract)
    );
  }, []);

  return (
    <div className="token-amount__container">
      <TokensInWallet
        BULCContract={BULCContract}
        BUSDContract={BUSDContract}
        account={account}
        pairContract={pairContract}
      />

      <TokensToHarvest
        BULCContract={BULCContract}
        BUSDContract={BUSDContract}
        account={account}
        stakeContract={stakeContract}
        stakeContract2={stakeContract2}
      />
    </div>
  );
};

export default TokensAmount;
