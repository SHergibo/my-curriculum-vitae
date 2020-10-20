import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from "./Modal";
import { displayModal } from './../utils/modalDisplay';
import FormSkill from "./FormSkill";
import PropTypes from 'prop-types';

function DisplayListSkill({arrayCodingSkill, arrayGeneralSkill, arrayLanguage, submit, setIdItem, funcDelete, successMessage, displayFormState }) {
  const { displayForm, setDisplayForm } = displayFormState;
  const [value, setValue] = useState({});

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
                <button className="btn-list-edit" title="Éditer" onClick={() => displayModal(item, setDisplayForm, setValue)}><FontAwesomeIcon icon="edit" /></button>
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
                    <button className="btn-list-edit" title="Éditer" onClick={() => displayModal(item, setDisplayForm, setValue)}><FontAwesomeIcon icon="edit" /></button>
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
                <button className="btn-list-edit" title="Éditer" onClick={() => displayModal(item, setDisplayForm, setValue)}><FontAwesomeIcon icon="edit" /></button>
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
          successMessage={successMessage} />
        } 
        setDisplayForm={setDisplayForm}/>
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
  successMessage: PropTypes.object.isRequired,
  displayFormState: PropTypes.shape({
    displayForm: PropTypes.bool.isRequired,
    setDisplayForm: PropTypes.func.isRequired
  })
}

export default DisplayListSkill;