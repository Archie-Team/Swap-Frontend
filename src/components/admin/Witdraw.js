import React, { useRef, useState } from "react";
// import { witdrawLP } from "../../store/admin-actions";
import Modal from "react-modal";
import "./AdminModals.css";

const Witdraw = ({ onWithdraw }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const witdrawValue = useRef(0);

  const witdrawOpenModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={witdrawOpenModal}>
        <h5>Withdraw</h5>
      </button>
      {modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="Modal"
          overlayClassName="Overlay"
          ariaHideApp={false}
        >
          <form>
            <input ref={witdrawValue} placeholder="value" />
            <div className="actions">
              <button className="cansel-btn" onClick={closeModal}>
                Cansel
              </button>
              <button
                className="submit-btn"
                type="button"
                onClick={() => onWithdraw(witdrawValue)}
              >
                Submit
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default Witdraw;
