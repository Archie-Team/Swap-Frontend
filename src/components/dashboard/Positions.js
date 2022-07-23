import React, { useContext, useEffect, useState } from "react";
import "./Positions.css";
import stakeAbi from "../../assets/files/Staking.json";
import { addresses } from "../../modules/addresses";
import { initContract } from "../../modules/web3Client";
import PositionItem from "./PositionItem";
import { stakes } from "../../modules/stakes";
import AuthContext from "../../context/auth-context";

const StakingAmount = () => {
  const [stakeContract, setStakeContract] = useState(null);
  const [positionNumber, setPositionNumber] = useState(0);
  const [positions, setPositions] = useState([]);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    initContract(stakeAbi.abi, addresses.staking_address).then((res) => {
      setStakeContract(res);
    });
  }, []);



  useEffect(() => {
    const getPositions = async (account) => {
      return await stakeContract.methods
        .positions(account)
        .call()
        .then((res) => {
          return Promise.resolve(res);
        });
    };

    if (stakeContract && authCtx.account) {
      getPositions(authCtx.account).then((res) => {
        setPositionNumber(res);
      });
    }
  }, [stakeContract,authCtx.account]);

  useEffect(() => {
    const setPositionsObject = async (account) => {
      setPositions([]);
      for (let index = 0; index < positionNumber; index++) {
        const position = await getPosition(index, account);
        setPositions((prev) => [...prev, position]);
      }
    };

    if(authCtx.account) {setPositionsObject(authCtx.account)}
    
  }, [positionNumber,authCtx.account]);

  const getPosition = async (number, account) => {
    return await stakeContract.methods
      .getAll(account, number)
      .call()
      .then((res) => {
        return res;
      });
  };

  return (
    <div className="positions-container">
      <p className="title">Positions</p>
      <div className="position-list">
        {positions.map((item, index) => (
          <PositionItem
            lpToken={item.LPTokenBalnce}
            deadline={item.remainedTime}
            profit={item.reward}
            choice={stakes[item.choise - 1]}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default StakingAmount;
