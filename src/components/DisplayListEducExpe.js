import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Modal from "./Modal";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import FormEducExpe from "./FormEducExpe";
import PropTypes from 'prop-types';

function DisplayListEducExpe({arrayEduc, arrayExpe, submit, setId, funcDelete, success, displayForm, setDisplayForm, closeModal}) {
  const [value, setValue] = useState({});
  let body = document.getElementsByTagName("body")[0];

  const displayModal = (value) => {
    body.setAttribute('style', 'overflow : hidden;');
    setDisplayForm(true);
    setValue(value);
  }

  let liListEduc;
  let liListExpe;

  const formatDate = (date) => {
    let year = date.split('-')[0];
    return year;
  };
  
  if(arrayEduc){
    liListEduc = arrayEduc.map((item) => {
      let formatDateStart = formatDate(item.dateStart);
      let formatDateEnd = formatDate(item.dateEnd);
      return <CSSTransition
                key={item._id}
                timeout={500}
                classNames="item-list"
              >
              <li>
                <div className="div-list-container">
                  <div className="date-list">{formatDateStart} - {formatDateEnd}</div> 
                  <div className="title-list">{item.titleEducExpe}</div> 
                </div>
                <div className="div-list-btn-container">
                  <button className="btn-list-edit" title="Éditer" onClick={() => displayModal(item)}><FontAwesomeIcon icon={faEdit} /></button>
                  <button className="btn-list-delete" title="Supprimer" onClick={() => funcDelete(item)}><FontAwesomeIcon icon={faTrashAlt} /></button>
                </div>
              </li>
            </CSSTransition>
    });
  }

  if(arrayExpe){
    liListExpe = arrayExpe.map((item) => {
      let formatDateStart = formatDate(item.dateStart);
      let formatDateEnd = formatDate(item.dateEnd);
      return <CSSTransition
                key={item._id}
                timeout={500}
                classNames="item-list"
              >
              <li>
                <div className="div-list-container">
                  <div className="date-list">{formatDateStart} - {formatDateEnd}</div> 
                  <div className="title-list">{item.titleEducExpe}</div> 
                </div>
                <div className="div-list-btn-container">
                  <button className="btn-list-edit" title="Éditer" onClick={() => displayModal(item)}><FontAwesomeIcon icon={faEdit} /></button>
                  <button className="btn-list-delete" title="Supprimer" onClick={() => funcDelete(item)}><FontAwesomeIcon icon={faTrashAlt} /></button>
                </div>
              </li>
            </CSSTransition>
    });
  }

  return (
    <div>
      <h4>Éducation</h4>
      <div>
        <ul>
          <TransitionGroup>
            {liListEduc}
          </TransitionGroup>
        </ul>
      </div>         
      <h4>Expérience</h4>
      <div>
        <ul>
          <TransitionGroup>
            {liListExpe}
          </TransitionGroup>
        </ul>
      </div>
      {displayForm  && 
        <Modal div={<FormEducExpe handleFunction={submit} setId={setId} formType="edit" value={value} success={success} />} closeModal={closeModal}/>
      }
    </div>
  );
}

DisplayListEducExpe.propTypes = {
  arrayEduc: PropTypes.array.isRequired,
  arrayExpe: PropTypes.array.isRequired,
  submit: PropTypes.func.isRequired,
  funcDelete: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired,
}

export default DisplayListEducExpe;