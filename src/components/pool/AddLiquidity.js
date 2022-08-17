import React from "react";
import useWeb3 from "../../hooks/use-web3";
import { addresses } from "../../modules/addresses";
import { toWei } from "../../modules/web3Wei";
import "./AddLiquidity.css";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const AddLiquidity = ({
  coin1,
  coin2,
  BULCContract,
  BUSDContract,
  swapContract,
  onUpdateTokenBalances,
}) => {
  const { getAllowence, approve } = useWeb3();
  const account = useSelector((state) => state.auth.account);

  const addLiquidity = async (account) => {
    await getAllowence(
      BUSDContract,
      account,
      addresses.swap_address,
      async (BUSDAllowence) => {
        if (BUSDAllowence < Number(toWei(coin2.amount, "ether"))) {
          await approve(
            BUSDContract,
            toWei("100000000000000", "tether"),
            account,
            addresses.swap_address,
            (res) => {
              toast.success(res);
            }
          );
        } else {
          console.log("No Need to Approve BUSD");
        }
      }
    );

    await getAllowence(
      BULCContract,
      account,
      addresses.swap_address,
      async (BULCAllowence) => {
        if (BULCAllowence < Number(toWei(coin1.amount, "ether"))) {
          await approve(
            BULCContract,
            toWei("100000000000000", "tether"),
            account,
            addresses.swap_address,
            (res) => {
              toast.success(res);
            }
          );
        } else {
          console.log("No Need to Approve BULC");
        }
      }
    );

    await swapContract.methods
      .addLiquidity(
        addresses.BULC_address,
        addresses.BUSD_address,
        toWei(coin1.amount, "ether"),
        toWei(coin2.amount, "ether"),
        1,
        1,
        account,
        324324324234234
      )
      .send({ from: account })
      .then((res) => {
        onUpdateTokenBalances();
        toast.success("add Liquidity was successfull !");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <button
        onClick={() => addLiquidity(account)}
        className="main-button supply"
      >
        Supply
      </button>
    </div>
  );
};

export default AddLiquidity;
