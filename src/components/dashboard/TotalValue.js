import React, { useEffect, useState } from "react";
import { CommaFormat } from "../../modules/formatNumbers";
import { fromWei } from "../../modules/web3Wei";
import "./TotalValue.css";

const TotalValue = ({ stakeContract }) => {
  const [totalFrozen, setTotalFrozen] = useState(0);
  const [totalValueLocked, setTotalValueLocked] = useState(0);
  
  useEffect(() => {
    const getTotalFrozen = async () => {
      await stakeContract.methods
        .StakedRewardFreezed()
        .call()
        .then((res) => {
          setTotalFrozen(res);
        });
    };

    const getTotalValueLocked = async () => {
      await stakeContract.methods
        .totalValueLockBUSD()
        .call()
        .then((res) => {
          setTotalValueLocked(res);
        });
    };

    if (stakeContract) {
      getTotalFrozen();
      getTotalValueLocked();
    }
  }, [stakeContract]);

  
  return (
    <div className="total-value__container">
      <div>
        <p className="title">Total Value Locked (TVL)</p>
        <p className="amount">${CommaFormat(fromWei(totalValueLocked, "ether"))}</p>
      </div>

      <div>
        <p>Total Frozen</p>
        <p className="amount">{CommaFormat(fromWei(totalFrozen, "ether"))}</p>
      </div>
    </div>
  );
};

export default TotalValue;
