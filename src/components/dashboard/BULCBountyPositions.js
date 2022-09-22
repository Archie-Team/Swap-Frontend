import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosition, getPostionNumbers } from "../../store/stake-actions";
import PositionList from "./PositionList";

const BULCBountyPositions = ({ stakeContract }) => {
  const [positionNumber, setPositionNumber] = useState(0);
  const [positions, setPositions] = useState([]);

  const dispatch = useDispatch();

  const account = useSelector((state) => state.auth.account);

  useEffect(() => {
    if (stakeContract && account) {
      dispatch(getPostionNumbers(account, stakeContract)).then((res) => {
        setPositionNumber(res);
      });
    }
  }, [stakeContract, account]);

  useEffect(() => {
    const setPositionsObject = async (account) => {
      setPositions([]);
      for (let index = 0; index < positionNumber; index++) {
        const position = await dispatch(
          getPosition(stakeContract, index, account)
        );
        setPositions((prev) => [...prev, { ...position, index: index }]);
      }
    };

    if (account) {
      setPositionsObject(account);
    }
  }, [positionNumber, account]);

  return (
    <>
      <h2>BULC Bounty Positions</h2>
      <PositionList
        account={account}
        positions={positions}
        stakeContract={stakeContract}
      />
    </>
  );
};

export default BULCBountyPositions;
