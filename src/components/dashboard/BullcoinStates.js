import React, { useEffect, useState } from "react";
import "./BullcoinStates.css";
import CurrentMarketCap from "./CurrentMarketCap";
import TotalTokenSupply from "./TotalTokenSupply";
import TotalValueLocked from "./TotalValueLocked";
import pair_abi from "../../assets/files/Pair.json";
import ERC20_abi from "../../assets/files/ERC20.json";
import { addresses } from "../../modules/addresses";
import useContract from "../../hooks/use-contract";

const BullcoinStates = () => {
  const { getContract } = useContract();

  const [pairContract, setPairContract] = useState(null);
  const [BULCContract, setBULCContract] = useState(null);

  useEffect(() => {
    getContract(pair_abi.abi, addresses.pair_address, (contract) =>
      setPairContract(contract)
    );

    getContract(ERC20_abi.abi, addresses.BULC_address, (contract) =>
      setBULCContract(contract)
    );
  }, []);

  return (
    <div className="bullcoin-states__container">
      <p className="title">Bullcoin States</p>
      <TotalTokenSupply BULCContract={BULCContract} />
      <CurrentMarketCap />
      <TotalValueLocked pairContract={pairContract} />
    </div>
  );
};

export default BullcoinStates;
