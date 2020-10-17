import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from "./Modal";
import { displayModal } from "./../utils/modalDisplay";
import FormEducExpe from "./FormEducExpe";
import PropTypes from 'prop-types';

function DisplayListEducExpe({arrayEduc, arrayExpe, submit, setIdItem, funcDelete, success, successMessage, displayForm, setDisplayForm, dateStart, setDateStart, dateEnd, setDateEnd}) {
  const [value, setValue] = useState({});

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
      return <li key={item._id}>
                <div className="div-list-container">
                  <div className="date-list">{formatDateStart} - {formatDateEnd}</div> 
                  <div className="title-list">{item.titleEducExpe}</div> 
                </div>
                <div className="div-list-btn-container">
                  <button className="btn-list-edit" title="Éditer" onClick={() => displayModal(item, setDisplayForm, setValue)}><FontAwesomeIcon icon="edit" /></button>
                  <button className="btn-list-delete" title="Supprimer" onClick={() => funcDelete(item)}><FontAwesomeIcon icon="trash-alt" /></button>
                </div>
              </li>
    });
  }

  if(arrayExpe){
    liListExpe = arrayExpe.map((item) => {
      let formatDateStart = formatDate(item.dateStart);
      let formatDateEnd = formatDate(item.dateEnd);
      return <li key={item._id}>
                <div className="div-list-container">
                  <div className="date-list">{formatDateStart} - {formatDateEnd}</div> 
                  <div className="title-list">{item.titleEducExpe}</div> 
                </div>
                <div className="div-list-btn-container">
                  <button className="btn-list-edit" title="Éditer" onClick={() => displayModal(item, setDisplayForm, setValue)}><FontAwesomeIcon icon="edit" /></button>
                  <button className="btn-list-delete" title="Supprimer" onClick={() => funcDelete(item)}><FontAwesomeIcon icon="trash-alt" /></button>
                </div>
              </li>
    });
  }

  return (
    <>
      <div>
        <h4>Éducation</h4>
        <ul >
          {liListEduc}
        </ul>
      </div>
      <div>
        <h4>Expérience</h4>
        <ul >
          {liListExpe}
        </ul>
      </div>
      {displayForm  && 
        <Modal div={
          <FormEducExpe 
          handleFunction={submit} 
          setIdItem={setIdItem} 
          formType="edit" 
          value={value} 
          success={success} 
          successMessage={successMessage}
          dateStart={dateStart} 
          setDateStart={setDateStart} 
          dateEnd={dateEnd} 
          setDateEnd={setDateEnd} />
        }
        setDisplayForm={setDisplayForm} />
      }
    </>
  );
}

DisplayListEducExpe.propTypes = {
  arrayEduc: PropTypes.array.isRequired,
  arrayExpe: PropTypes.array.isRequired,
  submit: PropTypes.func.isRequired,
  setIdItem: PropTypes.func,
  funcDelete: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired,
  successMessage: PropTypes.object.isRequired,
}

export default DisplayListEducExpe;