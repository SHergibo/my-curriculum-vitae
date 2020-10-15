import React, { useEffect } from "react";
import PropTypes from 'prop-types';

function Modal({ div, closeModal }) {

  useEffect(() => {
    const closeModalEventListener = window.addEventListener("click", (event) => {
      if(event.target.className === "modal"){
        closeModal();
      }
    });
    return () => {
      window.removeEventListener('click', closeModalEventListener);
    }
  }, [closeModal])



  return (
    <div className="modal">
      <div className="modal-container">
        <button className="close-modal" onClick={() => closeModal()}>X</button>
        {div}
      </div>
    </div>
  );
}

Modal.propTypes = {
  div: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default Modal;