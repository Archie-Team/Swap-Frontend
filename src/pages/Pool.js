import React, { useEffect, useState } from "react";
import MainCard from "../components/layout/MainCard";
import "./Pool.css";
import { addresses } from "../modules/addresses";
import ERC20_abi from "../assets/files/ERC20.json";
import swap_abi from "../assets/files/Swap.json";
import { Toaster } from "react-hot-toast";
import useContract from "../hooks/use-contract";
import pair_abi from "../assets/files/Pair.json";
import PoolForm from "../components/pool/PoolForm";

const Pool = () => {
  const [swapContract, setSwapContract] = useState(null);
  const [pairContract, setPairContract] = useState(null);
  const [BUSDContract, setBUSDContract] = useState(null);
  const [BULCContract, setBULCContract] = useState(null);

  const { getContract: getContract } = useContract();

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
      <Toaster position="top-center" reverseOrder={false} />
      {/* <PoolList /> */}
      <PoolForm
        swapContract={swapContract}
        BULCContract={BULCContract}
        BUSDContract={BUSDContract}
        pairContract={pairContract}
      />
    </MainCard>
  );
};

export default Pool;
