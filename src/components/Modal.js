import React, { useEffect } from "react";
import { closeModal } from './../utils/modalDisplay';
import PropTypes from 'prop-types';

function Modal({ div, setDisplayForm }) {

  useEffect(() => {
    const closeModalEventListener = window.addEventListener("click", (event) => {
      if(event.target.className === "modal"){
        closeModal(setDisplayForm);
      }
    });
    return () => {
      window.removeEventListener('click', closeModalEventListener);
    }
  }, [setDisplayForm])

  return (
    <div className="modal">
      <div className="modal-container">
        <button className="close-modal" onClick={() => closeModal(setDisplayForm)}>X</button>
        {div}
      </div>
    </div>
  );
}

Modal.propTypes = {
  div: PropTypes.object.isRequired,
  setDisplayForm: PropTypes.func.isRequired,
}

export default Modal;