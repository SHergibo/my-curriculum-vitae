import React, { useState, Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Modal from "./Modal";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import FormProject from "./FormProject";
import PropTypes from 'prop-types';

function DisplayListProjects({ arrayProject, submit, setId, funcDelete, success, displayForm, setDisplayForm, closeModal }) {
  const [value, setValue] = useState({});
  let body = document.getElementsByTagName("body")[0];

  const displayModal = (value) => {
    body.setAttribute('style', 'overflow : hidden;');
    setDisplayForm(true);
    setValue(value);
  }

  let liListProjects = arrayProject.map((item) => {
    return <CSSTransition
      key={item._id}
      timeout={500}
      classNames="item-list"
    >
      <li>
        <div className="div-list-container">
          <div className="title-list">{item.projectName}</div>
        </div>
        <div className="div-list-btn-container">
          <button className="btn-list-edit" title="Éditer" onClick={() => displayModal(item)}><FontAwesomeIcon icon={faEdit} /></button>
          <button className="btn-list-delete" title="Supprimer" onClick={() => funcDelete(item)}><FontAwesomeIcon icon={faTrashAlt} /></button>
        </div>
      </li>
    </CSSTransition>
  });

  return (
    <Fragment>
      <div>
        <h4>Projets</h4>
        <ul>
          <TransitionGroup
          component={null}
          >
            {liListProjects}
          </TransitionGroup>
        </ul>
      </div>
      {displayForm &&
        <Modal div={<FormProject handleFunction={submit} setId={setId} formType="edit" value={value} success={success} />} closeModal={closeModal} />
      }
    </Fragment>
  );
}

DisplayListProjects.propTypes = {
  arrayProject: PropTypes.array.isRequired,
  submit: PropTypes.func.isRequired,
  funcDelete: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired,
}

export default DisplayListProjects;