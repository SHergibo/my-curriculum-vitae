import React from "react";
import FormEducExpe from "./FormEducExpe";
import FormSkill from "./FormSkill";
import PropTypes from 'prop-types';

function ModalEditAdmin({ value, formType, submit, setId, success, closeModal }) {

  window.addEventListener("click", (event) => {
    if(event.target.className === "modal"){
      closeModal();
    }
  });

  return (
    <div className="modal">
      <div className="modal-container">
        <button className="close-modal" onClick={() => closeModal()}>X</button>
        {formType === "educExpe" && 
          <FormEducExpe handleFunction={submit} setId={setId} formType="edit" value={value} success={success} />
        }
        {formType === "skill" && 
          <FormSkill handleFunction={submit} setId={setId} formType="edit" value={value} success={success} />
        }
      </div>
    </div>
  );
}

ModalEditAdmin.propTypes = {
  value: PropTypes.object.isRequired,
  formType: PropTypes.string.isRequired,
  submit: PropTypes.func.isRequired,
  setId: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default ModalEditAdmin;