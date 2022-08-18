import React, { useState } from "react";
import "./SwapSlippageTolerance.css";
import { IoMdSettings } from "react-icons/io";
import Modal from "react-modal";
import SwapSlippageToleranceForm from "./SwapSlippageToleranceForm";
import { useDispatch, useSelector } from "react-redux";
import { sTolActions } from "../../store/slippageTolerance-slice";

const SwapSlippageTolerance = () => {
  const slippageTolerance = useSelector(
    (state) => state.sTol.slippageTolerance
  );
  const [modalIsOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  function openChangeSlippageModal() {
    openModal();
  }

  function submitSlippageTolerance(val) {
    closeModal();
    dispatch(sTolActions.setSlippageTolerance(val));
  }

  return (
    <div className="slippage-tolerance">
      <p>Slippage Tolerance :</p>
      <div className="slippage-tolerance__amount">
        <p className="">{slippageTolerance}%</p>
        <button onClick={openChangeSlippageModal}>
          <IoMdSettings />
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="Modal"
        overlayClassName="Overlay"
        ariaHideApp={false}
      >
        <SwapSlippageToleranceForm
          onSubmitslippageToleranceAmount={(input) =>
            submitSlippageTolerance(input)
          }
        />
      </Modal>
    </div>
  );
};

export default SwapSlippageTolerance;
