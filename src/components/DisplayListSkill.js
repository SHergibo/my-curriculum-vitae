import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from "./Modal";
import FormSkill from "./FormSkill";
import PropTypes from 'prop-types';

function DisplayListSkill({arrayCodingSkill, arrayGeneralSkill, arrayLanguage, submit, setIdItem, funcDelete, success, successMessage, displayForm, setDisplayForm, closeModal }) {
  const [value, setValue] = useState({});
  let body = document.getElementsByTagName("body")[0];

  const displayModal = (value) => {
    body.setAttribute('style', 'overflow : hidden;');
    setDisplayForm(true);
    setValue(value);
  }

  let liListCodingSkill;
  let liListGeneralSkill;
  let liListLanguage;

  if (arrayCodingSkill) {
    liListCodingSkill = arrayCodingSkill.map((item) => {
      return <li key={item._id}>
              <div className="div-list-container">
                <div className="skill-list">{item.nameSkill} - {item.percentage}%</div>
              </div>
              <div className="div-list-btn-container">
                <button className="btn-list-edit" title="Éditer" onClick={() => displayModal(item)}><FontAwesomeIcon icon="edit" /></button>
                <button className="btn-list-delete" title="Supprimer" onClick={() => funcDelete(item)}><FontAwesomeIcon icon="trash-alt" /></button>
              </div>
            </li>
    });
  }

  if (arrayGeneralSkill) {
    liListGeneralSkill = arrayGeneralSkill.map((item) => {
      return <li key={item._id}>
                  <div className="div-list-container">
                    <div className="skill-list">{item.nameSkill} - {item.percentage}%</div>
                  </div>
                  <div className="div-list-btn-container">
                    <button className="btn-list-edit" title="Éditer" onClick={() => displayModal(item)}><FontAwesomeIcon icon="edit" /></button>
                    <button className="btn-list-delete" title="Supprimer" onClick={() => funcDelete(item)}><FontAwesomeIcon icon="trash-alt" /></button>
                  </div>
              </li>
    });
  }

  if (arrayLanguage) {
    liListLanguage = arrayLanguage.map((item) => {
      return <li key={item._id}>
              <div className="div-list-container">
                <div className="skill-list">{item.nameSkill} - {item.percentage}%</div>
              </div>
              <div className="div-list-btn-container">
                <button className="btn-list-edit" title="Éditer" onClick={() => displayModal(item)}><FontAwesomeIcon icon="edit" /></button>
                <button className="btn-list-delete" title="Supprimer" onClick={() => funcDelete(item)}><FontAwesomeIcon icon="trash-alt" /></button>
              </div>
            </li>
      });
  }

  return (
  <>
      <div>
        <h4>Compétences</h4>
        <ul>
          {liListCodingSkill}
        </ul>
      </div>
      <div>
        <h4>Compétences générales</h4>
        <ul>
          {liListGeneralSkill}
        </ul>
      </div>
      <div>
        <h4>Langues</h4>
        <ul>
          {liListLanguage}
        </ul>
      </div>
      {displayForm &&
        <Modal div={
          <FormSkill 
          handleFunction={submit} 
          setIdItem={setIdItem} 
          formType="edit" 
          value={value} 
          success={success}
          successMessage={successMessage} />
        } 
        closeModal={closeModal}/>
      }
    </>
  );
}

DisplayListSkill.propTypes = {
  arrayCodingSkill: PropTypes.array.isRequired,
  arrayGeneralSkill: PropTypes.array.isRequired,
  arrayLanguage: PropTypes.array.isRequired,
  submit: PropTypes.func.isRequired,
  setIdItem: PropTypes.func,
  funcDelete: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired,
  successMessage: PropTypes.object.isRequired,
}

export default DisplayListSkill;