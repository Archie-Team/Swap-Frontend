import React, { useEffect, useState } from "react";
import useContract from "../../hooks/use-contract";
import { addresses } from "../../modules/addresses";
import PoolItem from "./PoolItem";
import "./PoolList.css";
import factory_abi from "../../assets/files/Factory.json";
import { Route } from "react-router-dom";

const PoolList = () => {
  const [factoryContract, setFactoryContract] = useState(null);
  const [poolList, setPoolList] = useState([]);

  const { getContract } = useContract();

  useEffect(() => {
    getContract(factory_abi.abi, addresses.factory_address, (contract) => {
      setFactoryContract(contract);
      // console.log(contract.methods);
    });
  }, []);

  useEffect(() => {
    // console.log("pool list");

    const getPairs = async () => {
      console.log("factoryContract");
      await factoryContract.methods
        .getAllPairs()
        .call()
        .then((res) => {
          console.log("res", res);
        });
    };

    if (factoryContract) {
      getPairs();
    }
  }, [factoryContract]);

  return (
    <div>
      {/* {PoolList.map((item) => { */}
      <PoolItem name={"name"} />;{/* })} */}
    </div>
  );
};

export default PoolList;
