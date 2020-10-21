import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from "./Modal";
import { displayModal } from "./../utils/modalDisplay";
import FormEducExpe from "./FormEducExpe";
import PropTypes from 'prop-types';

function DisplayListEducExpe({arrayEduc, arrayExpe, submit, setIdItem, funcDelete, successMessage, displayFormState, dateStartState, dateEndState}) {
  const { displayForm, setDisplayForm } = displayFormState;
  const [value, setValue] = useState({});

  let liListEduc;
  let liListExpe;

  const formatDate = (date) => {
    let year = date.split('-')[0];
    return year;
  };

  const liListRender = (item) => {
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
  }
  
  if(arrayEduc){
    liListEduc = arrayEduc.map((item) => {
      return liListRender(item);
    });
  }

  if(arrayExpe){
    liListExpe = arrayExpe.map((item) => {
      return liListRender(item);
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
          value={value} 
          successMessage={successMessage}
          dateStartState={dateStartState}
          dateEndState={dateEndState} />
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
  successMessage: PropTypes.object.isRequired,
  displayFormState: PropTypes.shape({
    displayForm: PropTypes.bool.isRequired,
    setDisplayForm: PropTypes.func.isRequired
  }),
  dateStartState: PropTypes.shape({
    dateStart: PropTypes.instanceOf(Date),
    setDateStart: PropTypes.func.isRequired
  }),
  dateEndState: PropTypes.shape({
    dateEnd: PropTypes.instanceOf(Date),
    setDateEnd: PropTypes.func.isRequired
  })
}

export default DisplayListEducExpe;