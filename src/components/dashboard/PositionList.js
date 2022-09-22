import React, { useEffect, useState } from "react";
import "./Positions.css";
import PositionItem from "./PositionItem";
import { stakes } from "../../modules/stakes";
import toast from "react-hot-toast";
import { roundNumber } from "../../modules/formatNumbers";
import { fromWei } from "../../modules/web3Wei";
import { useDispatch } from "react-redux";
import { unstakePosition } from "../../store/token-actions";
// import { getPosition, getPostionNumbers } from "../../store/stake-actions";

const PositionList = ({ stakeContract, positions, account }) => {
  const dispatch = useDispatch();

  const shortAccountAddress = (account) => {
    return "0x..." + account.substr(account.length - 4);
  };

  const unstakePositionHandler = async (index) => {
    let res = await dispatch(unstakePosition(index, account, stakeContract));
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

    // toast.error("Unstake Has Error !");

    // await getPositions(account).then((res) => {
    //   setPositionNumber(res);
    // });
    // return res;
  };

  return (
    <div className="positions-container">
      {/* <p className="title">Positions</p> */}
      {positions.length > 0 && (
        <div className="position-list">
          {positions.map((item, index) => (
            <PositionItem
              onUnstakePosition={() => unstakePositionHandler(index)}
              lpToken={item.LPTokenBalnce}
              deadline={item.deadLine}
              profit={item.reward}
              choice={stakes[item.choise - 1]}
              key={item.index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PositionList;
