import React, { useRef } from "react";
import "./RemoveLiquidityModal.css";
import { IoMdClose } from "react-icons/io";
import LPToeknBalance from "../../pages/LPToeknBalance";

const RemoveLiquidity = ({
  onRemoveLiquidity,
  onCloseModal,
  address,
  contract,
}) => {
  const LPToken = useRef(0);

  const closeModal = () => {
    onCloseModal();
  };

  const removeLiquidity = () => {
    onRemoveLiquidity(LPToken);
  };

  return (
    <div>
      <button className="close-modal__button" onClick={closeModal}>
        <IoMdClose />
      </button>
      <LPToeknBalance contract={contract} address={address} />
      <form className="remove-l-form">
        <input ref={LPToken} placeholder="BUSD_BULC LP" />
      </form>
      <button className="remove-l-button" onClick={removeLiquidity}>
        Remove Liquidity
      </button>
    </div>
  );
};

export default RemoveLiquidity;
