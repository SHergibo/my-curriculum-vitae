import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import ModalEditAdmin from "./ModalEditAdmin";
import PropTypes from 'prop-types';

function DisplayListEducExpe({array, submit, setId, funcDelete, success}) {
  const [dislayForm, setDisplayForm] = useState(false);
  const [value, setValue] = useState({});
  let body = document.getElementsByTagName("body")[0];
  
  const displayModal = (value) => {
    body.setAttribute('style', 'overflow : hidden;');
    setDisplayForm(true);
    setValue(value);
  }

  const closeModal = () => {
    body.removeAttribute('style');
    setDisplayForm(false);
    setValue({});
  }

  let liList;

  if(array){
  liList = array.map((item) => {
    return <li key={item._id}>
            <div className="div-list-container">
              <div className="date-list">{item.dateStart} - {item.dateEnd}</div> 
              <div className="title-list">{item.titleEducExpe}</div> 
            </div>
            <div className="div-list-btn-container">
              <button className="btn-list-edit" title="Éditer" onClick={() => displayModal(item)}><FontAwesomeIcon icon={faEdit} /></button>
              <button className="btn-list-delete" title="Supprimer" onClick={() => funcDelete(item)}><FontAwesomeIcon icon={faTrashAlt} /></button>
            </div>
          </li>
    });
  }

  return (
    <div>
      <div>{liList}</div>
      {dislayForm  && 
        <ModalEditAdmin value={value} submit={submit} setId={setId} success={success} closeModal={closeModal}/>
      }
    </div>
  );
}

DisplayListEducExpe.propTypes = {
  array: PropTypes.array.isRequired,
  submit: PropTypes.func.isRequired,
  funcDelete: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired,
}

export default DisplayListEducExpe;