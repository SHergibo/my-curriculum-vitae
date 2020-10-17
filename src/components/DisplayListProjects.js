import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from "./Modal";
import { displayModal } from './../utils/modalDisplay';
import FormProject from "./FormProject";
import PropTypes from 'prop-types';

function DisplayListProjects({ arrayProject, submit, setIdItem, funcDelete, success, successMessage, displayForm, setDisplayForm, imgProjectName, setImgProjectName }) {
  const [value, setValue] = useState({});

  let liListProjects = arrayProject.map((item) => {
    return <li key={item._id}>
            <div className="div-list-container">
              <div className="title-list">{item.projectName}</div>
            </div>
            <div className="div-list-btn-container">
              <button className="btn-list-edit" title="Éditer" onClick={() => displayModal(item, setDisplayForm, setValue)}><FontAwesomeIcon icon="edit" /></button>
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
          setDisplayForm={setDisplayForm} />
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