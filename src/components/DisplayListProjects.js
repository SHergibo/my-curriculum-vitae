import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from "./Modal";
import FormProject from "./FormProject";
import PropTypes from 'prop-types';

function DisplayListProjects({ arrayProject, submit, setIdItem, funcDelete, success, successMessage, displayForm, setDisplayForm, closeModal, imgProjectName, setImgProjectName }) {
  const [value, setValue] = useState({});
  let body = document.getElementsByTagName("body")[0];

  const displayModal = (value) => {
    body.setAttribute('style', 'overflow : hidden;');
    setDisplayForm(true);
    setValue(value);
  }

  let liListProjects = arrayProject.map((item) => {
    return <li key={item._id}>
            <div className="div-list-container">
              <div className="title-list">{item.projectName}</div>
            </div>
            <div className="div-list-btn-container">
              <button className="btn-list-edit" title="Éditer" onClick={() => displayModal(item)}><FontAwesomeIcon icon="edit" /></button>
              <button className="btn-list-delete" title="Supprimer" onClick={() => funcDelete(item)}><FontAwesomeIcon icon="trash-alt" /></button>
            </div>
          </li>
  });

  return (
    <>
      <div>
        <h4>Projets</h4>
        <ul>
        {liListProjects}
        </ul>
      </div>
      {displayForm &&
        <Modal div={
          <FormProject 
          handleFunction={submit} 
          setIdItem={setIdItem} 
          formType="edit" 
          value={value} 
          success={success}
          successMessage={successMessage}
          imgProjectName={imgProjectName} 
          setImgProjectName={setImgProjectName} />} 
          closeModal={closeModal} />
      }
    </>
  );
}

DisplayListProjects.propTypes = {
  arrayProject: PropTypes.array.isRequired,
  submit: PropTypes.func.isRequired,
  setIdItem: PropTypes.func,
  funcDelete: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired,
  successMessage: PropTypes.object.isRequired,
  imgProjectName: PropTypes.string.isRequired,
  setImgProjectName: PropTypes.func.isRequired
}

export default DisplayListProjects;