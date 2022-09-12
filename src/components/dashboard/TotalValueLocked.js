import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CommaFormat } from "../../modules/formatNumbers";
import { fromWei } from "../../modules/web3Wei";
import { getToatalValueLocked } from "../../store/token-actions";
import "./TotalValueLocked.css";

const TotalValue = ({ pairContract }) => {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.auth.account);

  const [totalValueLocked, setTotalValueLocked] = useState(0);

  useEffect(() => {
    if (pairContract && account) {
      dispatch(getToatalValueLocked(pairContract)).then((res) => {
        setTotalValueLocked(fromWei(res.toString(), "ether") * 2);
      });
    }
  }, [pairContract]);

  return (
    <div className="total-value__container">
      <h2 className="title">Total Value Locked (TVL)</h2>
      <p>Across All Farms & Pools</p>
      <p className="amount">$ {CommaFormat(totalValueLocked)}</p>
    </div>
  );
};

export default TotalValue;
