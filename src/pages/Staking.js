import React, { useEffect, useState } from "react";
import "./Staking.css";
import { addresses } from "../modules/addresses";
import stakeAbi from "../assets/files/Staking.json";
import stakeAbi2 from "../assets/files/Staking2.json";

import pairAbi from "../assets/files/Pair.json";
import ERC20Abi from "../assets/files/ERC20.json";
import { Toaster } from "react-hot-toast";
import useContract from "../hooks/use-contract";
import { useSelector } from "react-redux";
import FirstStake from "../components/staking/OldStake";
import SecStake from "../components/staking/NewStake";
import LPToeknBalance from "./LPToeknBalance";

const Staking = () => {
  const account = useSelector((state) => state.auth.account);
  const [selectedStakeType, setSelectedStakeType] = useState(null); //BUSD_B & BULC_B

  const { getContract } = useContract();

  const [stakeContract, setStakeContract] = useState(null);
  const [stakeContract2, setStakeContract2] = useState(null);
  const [pairContract, setPairContract] = useState(null);
  const [BUSDContract, setBUSDContract] = useState(null);

  const selectStakeTypeHandler = (val) => {
    console.log(val);
    setSelectedStakeType(val);
  };

  const backStakingButtons = () => {};

  useEffect(() => {
    getContract(stakeAbi.abi, addresses.staking_address, (contract) =>
      setStakeContract(contract)
    );

    getContract(stakeAbi2.abi, addresses.staking2_address, (contract) =>
      setStakeContract2(contract)
    );

    getContract(pairAbi.abi, addresses.pair_address, (contract) =>
      setPairContract(contract)
    );

    getContract(ERC20Abi.abi, addresses.BUSD_address, (contract) =>
      setBUSDContract(contract)
    );
  }, []);

  const selectedStake = () => {
    switch (selectedStakeType) {
      case "BUSD_B":
        return (
          <FirstStake
            account={account}
            stakeContract={stakeContract}
            BUSDContract={BUSDContract}
            pairContract={pairContract}
            onBackStakingButtons={() => selectStakeTypeHandler("")}
          />
        );
      case "BULC_B":
        return (
          <SecStake
            pairContract={pairContract}
            stakeContract={stakeContract2}
            stakeAddress={addresses.staking2_address}
            account={account}
            onBackStakingButtons={() => selectStakeTypeHandler("")}
          />
        );

      default:
        return (
          <div className="stake-type__actions">
            <button onClick={() => selectStakeTypeHandler("BUSD_B")}>
              BUSD Bounty
            </button>
            <button onClick={() => selectStakeTypeHandler("BULC_B")}>
              BULC Bounty
            </button>
          </div>
        );
    }
  };

  return (
    <div className="staking-main">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="staking-main__lp-balance">
        <LPToeknBalance
          contract={pairContract}
          address={addresses.pair_address}
        />
      </div>

      <div className="staking-card">{selectedStake()}</div>
    </div>
  );
};

export default Staking;
