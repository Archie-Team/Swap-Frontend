import React, { useEffect, useRef, useState } from "react";
import Web3 from "web3";
import { roundNumber } from "../../modules/formatNumbers";
import "./PositionItem.css";

const PositionItem = ({
  lpToken,
  choice,
  profit,
  deadline,
  onUnstakePosition,
}) => {
  const launch = useRef();
  const [deadlineIsOver, setDeadlineIsOver] = useState(false);
  const [timer, setTimer] = useState({});

  const getTimeFromDate = (timestamp) => {
    var now = new Date().getTime();
    var timeleft = timestamp - now;
    var days = 0;
    var hours = 0;
    var minutes = 0;
    var seconds = 0;

    if (timeleft > 0) {
      days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
      hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
      seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
    } else {
      setDeadlineIsOver(true);
      clearInterval(launch.current);
    }

    let time = {
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      day: days,
    };

    return time;
  };

  useEffect(() => {
    const countdownTimer = (timestamp) => {
      launch.current = setInterval(() => {
        let time = getTimeFromDate(timestamp);
        setTimer(time);
      }, 1000);
    };

    countdownTimer(deadline * 1000);
  }, []);

  const unstakePositionHandler = () => {
    onUnstakePosition();
  };

  return (
    <div className="position-item">
      <div>
        <p>Position :</p>
        <p>
          {choice.monthNumber} Months - {choice.APRAmountPersent}% APR
        </p>
      </div>

      <div>
        <p>Stake Token :</p>
        <p>{Web3.utils.fromWei(lpToken, "ether")} BULC-BUSD</p>
      </div>

      <div>
        <p>Profit :</p>
        <p> {roundNumber(Web3.utils.fromWei(profit, "ether"), 5)} BULC</p>
      </div>

      <div className="deadline-timer">
        <p>Deadline :</p>
        <div className="deadline-timer__times">
          <div>
            <p>{timer.day}</p>
            <p>Days</p>
          </div>
          <p>:</p>

          <div>
            <p>{timer.hours}</p>
            <p>Hours</p>
          </div>
          <p>:</p>

          <div>
            <p>{timer.minutes}</p>
            <p>Mins</p>
          </div>
          <p>:</p>

          <div>
            <p>{timer.seconds}</p>
            <p>Seconds</p>
          </div>
        </div>
      </div>

      <button
        onClick={unstakePositionHandler}
        className="unstake-btn"
        disabled={deadlineIsOver === false ? true : false}
      >
        Unstake
      </button>
    </div>
  );
};

export default PositionItem;
