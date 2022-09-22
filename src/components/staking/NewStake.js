import React, { useEffect, useState } from "react";
// import { stakes } from "../../modules/stakes";
// import Stake from "./StakeItem";
// import Web3 from "web3";
import useWeb3 from "../../hooks/use-web3";
import { toWei } from "../../modules/web3Wei";
import toast from "react-hot-toast";
import { getIsStartedStake } from "../../store/stake-actions";
import { useDispatch } from "react-redux";
// import { addresses } from "../../modules/addresses";

const SecStake = ({
  pairContract,
  stakeContract,
  account,
  stakeAddress,
  onBackStakingButtons,
}) => {
  const [value, setValue] = useState("");
  const [isStartedStake, setIsStartedStake] = useState(false);
  // const [isStartedStake, setIsStartedStake] = useState(false);

  const dispatch = useDispatch();

  const changeStakeItem = (e) => {
    setValue(e.target.value);
  };

  const { getAllowence, approve } = useWeb3();

  useEffect(() => {
    if ((stakeContract, account)) {
      dispatch(getIsStartedStake(stakeContract)).then((res) => {
        setIsStartedStake(res);
      });
    }
  }, [stakeContract]);

  const stakeHandler = async () => {
    await getAllowence(
      pairContract,
      account,
      stakeAddress,
      async (pairAllowence) => {
        if (pairAllowence < Number(toWei(value, "ether"))) {
          await approve(
            pairContract,
            toWei("100000000000000", "ether"),
            account,
            stakeAddress,
            (res) => {
              console.log(res);
              toast.success(res);
            }
          );
        } else {
          console.log("No Need to Approve pair");
        }
      }
    );

    console.log("stakeAmount", toWei(value, "ether"));

    await stakeContract.methods
      .stake(toWei(value, "ether"))
      .send({ from: account })
      .then((res) => {
        console.log(res);
        toast.success("Position Set Successfully !");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="stake_form_field ">
        <h3>BUSD Bounty</h3>
        <div className="stake_form-group">
          <label className="stake-title">1 Month</label>
          <input
            data-index="2"
            id="stake_field_1"
            name="stake_field_1"
            placeholder="0"
            type="number"
            value={value}
            onChange={changeStakeItem}
          />
        </div>
      </div>

      <div className="staking-actions">
        <button
          disabled={isStartedStake ? false : true}
          onClick={stakeHandler}
          className="main-button"
        >
          Stake
        </button>
        <button className="return-button" onClick={onBackStakingButtons}>
          Return
        </button>
      </div>
    </div>
  );
};

export default SecStake;
