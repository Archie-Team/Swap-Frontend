import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fromWei } from "../../modules/web3Wei";
import { getTotalTokenSupply } from "../../store/token-actions";
import "./TotalTokenSupply.css";

const TotalTokenSupply = ({ BULCContract }) => {
  const [totalTokenSupply, settotalTokenSupply] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (BULCContract) {
      dispatch(getTotalTokenSupply(BULCContract)).then((res) => {
        settotalTokenSupply(fromWei(res.toString(), "ether"));
      });
    }
  }, [BULCContract]);

  return (
    <div className="bullcoin-state">
      <p>
        Total Token Supply <span className="dash-span">-</span>{" "}
        <span>{totalTokenSupply} BULC</span>
      </p>
    </div>
  );
};

export default TotalTokenSupply;
