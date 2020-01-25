import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function DisplayListEducExpe({array, submit}) {
  let liList;

  if(array){
  liList = array.map((item) => {
    return <li key={item._id}>
            <div className="div-list-container">
              <div className="date-list">{item.dateStart} - {item.dateEnd}</div> 
              <div className="title-list">{item.titleEducExpe}</div> 
            </div>
            <div className="div-list-btn-container">
              <button className="btn-list-edit" title="Éditer" onClick={() => submit(item._id)}><FontAwesomeIcon icon={faEdit} /></button>
              <button className="btn-list-delete" title="Supprimer"><FontAwesomeIcon icon={faTrashAlt} /></button>
            </div>
          </li>
    });
  }

  return (
    <div>{liList}</div>
  );
}

export default DisplayListEducExpe;