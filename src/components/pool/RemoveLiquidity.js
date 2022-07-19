import React, { useRef } from "react";
import "./RemoveLiquidity.css";
import { IoMdClose } from "react-icons/io";

const RemoveLiquidity = ({ onRemoveLiquidity,onCloseModal,tokenBalance }) => {
  const LPToken = useRef(0);
  

  const closeModal = () => {
    onCloseModal()
  };

  const removeLiqueidity = () => {
    onRemoveLiquidity(LPToken);
  };

  return (
    <div>
      <button className="close-modal__button" onClick={closeModal}><IoMdClose /></button>
      <div className="LP-token-balance">
        <p>Balance :</p>
        <p>{tokenBalance}   BUSD_BULC LP</p>
      </div>
      <form className="remove-l-form">
        <input ref={LPToken} placeholder="BUSD_BULC LP" />
      </form>
      <button className="remove-l-button" onClick={removeLiqueidity}>Remove Liqueidity</button>
    </div>
  );
};

export default RemoveLiquidity;
