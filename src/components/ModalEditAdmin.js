import React from "react";
import FormEducExpe from "./FormEducExpe";
import PropTypes from 'prop-types';

function ModalEditAdmin({ value, submit, setId, success, closeModal }) {

  window.addEventListener("click", (event) => {
    if(event.target.className === "modal"){
      closeModal();
    }
  });

  return (
    <div className="modal">
      <div className="modal-container">
        <button className="close-modal" onClick={() => closeModal()}>X</button>
        <FormEducExpe handleFunction={submit} setId={setId} formType="edit" value={value} success={success} />
      </div>
    </div>
  );
}

ModalEditAdmin.propTypes = {
  value: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
  setId: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default ModalEditAdmin;