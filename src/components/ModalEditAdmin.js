import React from "react";
import PropTypes from 'prop-types';

function ModalEditAdmin({ div, closeModal }) {

  window.addEventListener("click", (event) => {
    if(event.target.className === "modal"){
      closeModal();
    }
  });

  return (
    <div className="modal">
      <div className="modal-container">
        <button className="close-modal" onClick={() => closeModal()}>X</button>
        {div}
      </div>
    </div>
  );
}

ModalEditAdmin.propTypes = {
  div: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default ModalEditAdmin;