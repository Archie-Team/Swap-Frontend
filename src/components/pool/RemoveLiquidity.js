import React, { useEffect, useState } from "react";
import "./RemoveLiquidity.css";
import RemoveLiquidityModal from "./RemoveLiquidityModal";
import Modal from "react-modal";
import toast from "react-hot-toast";
import useWeb3 from "../../hooks/use-web3";
import { addresses } from "../../modules/addresses";
import { toWei } from "../../modules/web3Wei";
import { useSelector } from "react-redux";
import { roundNumber } from "../../modules/formatNumbers";

const RemoveLiquidity = ({ coin1, coin2, pairContract, swapContract }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { getAllowence, approve } = useWeb3();
  const account = useSelector((state) => state.auth.account);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const removeLiquidity = async (input) => {
    let LPToken = input.current.value;

    await getAllowence(
      pairContract,
      account,
      addresses.swap_address,
      async (pairAllowence) => {
        if (pairAllowence < Number(toWei(LPToken, "ether"))) {
          await approve(
            pairContract,
            toWei("100000000000000", "tether"),
            account,
            addresses.swap_address,
            (res) => {
              toast.success(res);
            }
          );
        } else {
          console.log("No Need to Approve pair");
        }
      }
    );

    var now = new Date().getTime();

    await swapContract.methods
      .removeLiquidity(
        coin1.address,
        coin2.address,
        toWei(LPToken, "ether"),
        1,
        1,
        account,
        roundNumber((now + 300000) / 1000, 0)
      )
      .send({ from: account })
      .then((res) => {
        closeModal();
        toast.success("remove Liquidity was successfull !");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="Modal"
          overlayClassName="Overlay"
          ariaHideApp={false}
        >
          <RemoveLiquidityModal
            onCloseModal={closeModal}
            onRemoveLiquidity={removeLiquidity}
            coinsAddress={{ coin1: coin1.address, coin2: coin2.address }}
            contract={pairContract}
            address={addresses.pair_address}
          />
        </Modal>
      )}

      <button onClick={openModal} className="main-button">
        Remove LP
      </button>
    </div>
  );
};

export default RemoveLiquidity;
