import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { roundNumber } from "../../modules/formatNumbers";
import "./PositionItem.css";

const PositionItem = ({
  lpToken,
  choice,
  profit,
  deadline,
}) => {
  const [timer, setTimer] = useState({});


  const getTimeFromDate = (timestamp) => {

    var now = new Date().getTime();
    var timeleft = timestamp - now;
        
    var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

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
        setInterval(() => {    
          let time = getTimeFromDate(timestamp);    
          setTimer(time);
        }, 1000);
      };


    countdownTimer(deadline*1000);
  }, []);


  return (
    <div className="position-item">
      <div>
        <p>Position :</p>
        <p>{choice.monthNumber} Months - {choice.APRAmountPersent}% APR</p>
      </div>

      <div>
        <p>Stake Token :</p>
        <p>{Web3.utils.fromWei(lpToken, "ether")} BULC-BUSD</p>
      </div>

      <div>
        <p>Profit :</p>
        <p> {roundNumber(Web3.utils.fromWei(profit, "ether"),5)} BULC</p>
      </div>

      {timer != 0 ? (
        <div className="deadline-timer">
          <p>Deadline :</p>
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
      ) : (
        <button>Unstake</button>
      )}
    </div>
  );
};

export default PositionItem;
