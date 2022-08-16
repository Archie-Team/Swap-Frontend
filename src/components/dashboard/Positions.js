import React, { useEffect, useState } from "react";
import "./Positions.css";
import stakeAbi from "../../assets/files/Staking.json";
import { addresses } from "../../modules/addresses";
import PositionItem from "./PositionItem";
import { stakes } from "../../modules/stakes";
import toast from "react-hot-toast";
import { roundNumber } from "../../modules/formatNumbers";
import useContract from "../../hooks/use-contract";
import { fromWei } from "../../modules/web3Wei";
import { useSelector } from "react-redux";

const StakingAmount = () => {
  const [positionNumber, setPositionNumber] = useState(0);
  const [positions, setPositions] = useState([]);
  const account = useSelector((state) => state.auth.account);

  const { contract: stakeContract, getContract: getStakeContract } =
  useContract();

  useEffect(() => {
    getStakeContract(stakeAbi.abi, addresses.staking_address)
  }, []);

  const getPositions = async (account) => {
    return await stakeContract.methods
      .positions(account)
      .call()
      .then((res) => {
        return Promise.resolve(res);
      });
  };

  useEffect(() => {
    if (stakeContract && account) {
      getPositions(account).then((res) => {
        setPositionNumber(res);
      });
    }
  }, [stakeContract, account]);

  useEffect(() => {
    const setPositionsObject = async (account) => {
      setPositions([]);
      for (let index = 0; index < positionNumber; index++) {
        const position = await getPosition(index, account);
        setPositions((prev) => [...prev, { ...position, index: index }]);
      }
    };

    if (account) {
      setPositionsObject(account);
    }
  }, [positionNumber, account]);

  const getPosition = async (number, account) => {
    return await stakeContract.methods
      .getAll(account, number)
      .call()
      .then((res) => {
        return res;
      })
      .catch("get position has error");
  };

  const shortAccountAddress = (account) => {
    return "0x..." + account.substr(account.length - 4);
  };

  const unstakePosition = async (index) => {
    return await stakeContract.methods
      .unstake(index)
      .send({ from: account })
      .then(async (res) => {
        let returnValues = res.events.Unstake.returnValues;

        toast.success(
          "Unstake Was Successfull !" +
            "\n" +
            "User : " +
            shortAccountAddress(returnValues.user) +
            "\n" +
            "Amount : " +
            roundNumber(fromWei(returnValues.amount, "ether"), 5) +
            " LP" +
            "\n" +
            "Reward : " +
            roundNumber(fromWei(returnValues.reward, "ether"), 5),
          {
            duration: 10000,
          }
        );

        await getPositions(account).then((res) => {
          setPositionNumber(res);
        });
        return res;
      })
      .catch((err) => {
        toast.error("Unstake Has Error !");
      });
  };

  return (
    <div className="positions-container">
      <p className="title">Positions</p>
      <div className="position-list">
        {positions.map((item, index) => (
          <PositionItem
            onUnstakePosition={() => unstakePosition(index)}
            lpToken={item.LPTokenBalnce}
            deadline={item.deadLine}
            profit={item.reward}
            choice={stakes[item.choise - 1]}
            key={item.index}
          />
        ))}
      </div>
    </div>
  );
};

export default StakingAmount;
