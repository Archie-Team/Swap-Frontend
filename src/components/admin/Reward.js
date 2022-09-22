import React, { useRef, useState } from "react";
import Modal from "react-modal";
import "./AdminModals.css";

const Reward = ({ onReward }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const RewardValue = useRef(0);

  const rewardOpenModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={rewardOpenModal}>
        <h5>Reward</h5>
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
            <input ref={RewardValue} placeholder="value" />
            <div className="actions">
              <button className="cansel-btn" onClick={closeModal}>
                Cansel
              </button>
              <button
                className="submit-btn"
                type="button"
                onClick={() => onReward(RewardValue)}
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

export default Reward;
