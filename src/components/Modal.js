import React from "react";
import { closeModal } from "./../utils/modalDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

function Modal({ div, setDisplayForm }) {
  const closeExteriorModal = (e) => {
    if (e.target.className === "modal") {
      closeModal(setDisplayForm);
    }
  };

  return (
    <div
      className="modal"
      onMouseDown={(e) => closeExteriorModal(e, setDisplayForm)}
    >
      <div className="modal-container">
        <button
          className="close-modal"
          onClick={() => closeModal(setDisplayForm)}
        >
          <FontAwesomeIcon icon="times" />
        </button>
        {div}
      </div>
    </div>
  );
}

Modal.propTypes = {
  div: PropTypes.object.isRequired,
  setDisplayForm: PropTypes.func.isRequired,
};

export default Modal;
