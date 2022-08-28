import TokensStatus from "../components/dashboard/TokensStatus";
import "./Dashboard.css";
import TotalValue from "../components/dashboard/TotalValue";
import React, { useEffect, useState } from "react";
import stakeAbi from "../assets/files/Staking.json";
import { addresses } from "../modules/addresses";
import { initContract } from "../modules/web3Client";
import MainCard from "../components/layout/MainCard";
import { fromWei } from "../modules/convertors";
const Home = () => {
  const [stakeContract, setStakeContract] = useState(null);
  // const [totalFrozen, setTotalFrozen] = useState(0);
  const [totalValueLocked, setTotalValueLocked] = useState(0);

  useEffect(() => {
    initContract(stakeAbi.abi, addresses.staking_address).then((res) => {
      setStakeContract(res);
    });
  }, []);

  useEffect(() => {
    // const getTotalFrozen = async () => {
    //   await stakeContract.methods
    //     .StakedRewardFreezed()
    //     .call()
    //     .then((res) => {
    //       setTotalFrozen(fromWei(res));
    //     });
    // };

    const getTotalValueLocked = async () => {
      await stakeContract.methods
        .totalValueLockBUSD()
        .call()
        .then((res) => {
          setTotalValueLocked(fromWei(res));
        });
    };

    if (stakeContract) {
      // getTotalFrozen();
      getTotalValueLocked();
    }
  }, [stakeContract]);

  return (
    <MainCard>
      <div className="top-container">
        <TokensStatus />
      </div>
      {/* <div className="bottom-container">
        <TotalValue totalValue={totalValueLocked}  />
      </div> */}
    </MainCard>
  );
};

export default Home;
