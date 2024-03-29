import React from "react";
import { closeModal } from "./../utils/modalDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

function ModalDisplay({ div, displayFormState }) {
  const { displayForm, setDisplayForm } = displayFormState;
  const closeExteriorModal = (e) => {
    if (e.target.className === "modalDisplay showModalDisplay") {
      closeModal(setDisplayForm);
    }
  };

  return (
    <div
      className={`modalDisplay ${displayForm ? "showModalDisplay" : ""}`}
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

ModalDisplay.propTypes = {
  div: PropTypes.object.isRequired,
  displayFormState: PropTypes.shape({
    displayForm: PropTypes.bool.isRequired,
    setDisplayForm: PropTypes.func.isRequired,
  }),
};

export default ModalDisplay;
