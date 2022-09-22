import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { roundNumber, shortAccountAddress } from "../../modules/formatNumbers";
import { fromWei } from "../../modules/web3Wei";
import {
  getIsStartedStake,
  getIsStartedWithdraw,
  getNewStakePositions,
  getReward,
  unstakePosition,
} from "../../store/stake-actions";
import "./BUSDBountyPositions.css";

const BUSDBountyPositions = ({ stakeContract }) => {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.auth.account);
  const [postion, setPostion] = useState({
    percentShares: 0,
    shares: 0,
    value: 0,
    reward: 0,
  });
  // const [isStartedStake, setIsStartedStake] = useState(false);
  const [isStartedWitdraw, setIsStartedWitdraw] = useState(false);

  useEffect(() => {
    const getNewStakePosition = async () => {
      await dispatch(getNewStakePositions(stakeContract, account))
        .then((res) => {
          setPostion(res);
        })
        .catch((err) => {
          console.log("no psition");
        });
      // await dispatch(getIsStartedStake(stakeContract)).then((res) => {
      //   setIsStartedStake(res);
      // });

      await dispatch(getIsStartedWithdraw(stakeContract)).then((res) => {
        setIsStartedWitdraw(res);
      });
    };
    if (stakeContract && account) {
      getNewStakePosition();
    }
  }, [stakeContract, account]);

  const unstakePositionHandler = async (index) => {
    let res = await dispatch(unstakePosition(account, stakeContract));
    console.log("unstake res", res);
    let returnValues = res.events.Unstake.returnValues;

    toast.success(
      "Unstake Was Successfull !" +
        "\n" +
        "User : " +
        shortAccountAddress(returnValues.user) +
        "\n" +
        "Amount : " +
        roundNumber(fromWei(returnValues.amountStaked, "ether"), 5) +
        " LP" +
        "\n" +
        "Reward : " +
        roundNumber(fromWei(returnValues.reward, "ether"), 5),
      {
        duration: 100000,
      }
    );

    // window.location.reload();
  };

  const getRewardHandler = async () => {
    await dispatch(getReward(account, stakeContract)).then((res) => {
      let returnValues = res.events.rewardAmount.returnValues;

      console.log("get reward", res);
      toast.success(
        "Get Reward Was Successfull !" +
          "\n" +
          "Reward Amount : " +
          shortAccountAddress(returnValues.reward) +
          {
            duration: 100000,
          }
      );
    });
  };

  return (
    <>
      <h2>BUSD Bounty</h2>

      <div className="new-staking">
        <div>
          <h4>Staked Amount</h4>
          <p>{fromWei(postion.shares, "ether")}</p>
        </div>
        <div>
          <h4>Share Percentage </h4>
          <p>{fromWei(postion.percentShares, "ether")}%</p>
        </div>
        <div>
          <h4>LP Value </h4>
          <p>{fromWei(postion.value, "ether")}$</p>
        </div>
        {postion.reward > 0 && (
          <div>
            <h4>Reward </h4>
            <p>{fromWei(postion.reward, "ether")}</p>
          </div>
        )}

        <div>
          <button
            onClick={unstakePositionHandler}
            className="unstake-btn"
            disabled={isStartedWitdraw === false ? true : false}
          >
            Unstake
          </button>
          <button
            onClick={getRewardHandler}
            className="unstake-btn"
            // disabled={isStartedWitdraw === false ? true : false}
          >
            Get Reward
          </button>
        </div>
      </div>
    </>
  );
};

export default BUSDBountyPositions;
