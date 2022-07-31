import React, { useState } from "react";
import "./SwapSlippageTolerance.css";
import { IoMdSettings } from "react-icons/io";
import Modal from "react-modal";
import SwapSlippageToleranceForm from "./SwapSlippageToleranceForm";

const SwapSlippageTolerance = ({
  slippageTolerance,
  onSubmitslippageToleranceAmount,
}) => {
  const [modalIsOpen, setIsOpen] = useState(false);

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
    onSubmitslippageToleranceAmount(val);
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
