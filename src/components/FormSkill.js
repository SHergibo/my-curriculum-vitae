import React, { useLayoutEffect, useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ActionButtonSubmit from './ActionButtonSubmit';
import PropTypes from 'prop-types';

function FormEducExpe({ handleFunction, setIdItem, value, successSpanRef, spanSuccess, loadingRef, loader, errorSpanRef, errorMessageRef, spanError }) {
  const [titleForm, setTitleForm] = useState('Ajout');
  const [button, setButton] = useState('Ajouter');
  const [checkboxCodingSkill, setCheckboxCodingSkill] = useState();
  const [checkboxGeneralSkill, setCheckboxGeneralSkill] = useState();
  const [checkboxLanguage, setCheckboxLanguage] = useState();

  const { register, handleSubmit, errors, setValue } = useForm({
    mode: "onChange"
  });

  useEffect(() => {
    if(value){
      setIdItem(value._id);
      setTitleForm('Édition');
      setButton('Éditer');
    }
  }, [value, setIdItem]);

  useLayoutEffect(() => {
    setCheckboxCodingSkill("checked");
    setCheckboxGeneralSkill("");
    setCheckboxLanguage("");
    if (value) {
      if (value.skillCategory === "generalSkill") {
        setCheckboxCodingSkill("");
        setCheckboxGeneralSkill("checked");
        setCheckboxLanguage("");
      } else if(value.skillCategory === "language"){
        setCheckboxCodingSkill("");
        setCheckboxGeneralSkill("");
        setCheckboxLanguage("checked");
      }
    }
  }, [register, setValue, value]);

  const form = <>
                  <div className="input-container">
                    <div className="input">
                      <label htmlFor="nameSkill">Nom de la compétences *</label>
                      <div className="input-block">
                        <span><FontAwesomeIcon icon="graduation-cap" /></span>
                        {!value && <input name="nameSkill" type="text" id="nameSkill" placeholder="Nom de la compétences" ref={register({ required: true })} />}
                        {value && <input name="nameSkill" type="text" id="nameSkill" placeholder="Nom de la compétences" defaultValue={value.nameSkill} ref={register({ required: true })} />}
                      </div>
                      {errors.nameSkill && <span className="error-message-form">Ce champ est requis</span>}
                    </div>
                    <div className="input">
                      <label htmlFor="percentage">Pourcentage *</label>
                      <div className="input-block">
                        <span><FontAwesomeIcon icon="percentage" /></span>
                        {!value && <input name="percentage" id="percentage" placeholder="Pourcentage" ref={register({
                          required: "Ce champ est requis",
                          pattern: {
                            value: /^[0-9]+$/,
                            message: "Entrez un nombre entre 0 et 100"
                          }
                        })} />}
                        {value && <input name="percentage" id="percentage" placeholder="Pourcentage" defaultValue={value.percentage} ref={register({ 
                          required: "Ce champ est requis",
                          pattern: {
                            value: /^[0-9]+$/,
                            message: "Entrez un nombre"
                          }
                        })} />}
                      </div>
                      <span className="error-message-form">{errors.percentage && errors.percentage.message}</span>
                    </div>
                  </div>
                  <div className="label-checkbox-container skills-checkbox-container">
                    <label className="container-radio">Compétences code
                      <input type="radio" defaultChecked={checkboxCodingSkill} name="skillCategory" value="codingSkill" ref={register({ required: true })} />
                      <span className="checkmark-radio"></span>
                    </label>
                    <label className="container-radio">Compétences générales
                      <input type="radio" defaultChecked={checkboxGeneralSkill} name="skillCategory" value="generalSkill" ref={register({ required: true })} />
                      <span className="checkmark-radio"></span>
                    </label>
                    <label className="container-radio">Langues
                      <input type="radio" defaultChecked={checkboxLanguage} name="skillCategory" value="language" ref={register({ required: true })} />
                      <span className="checkmark-radio"></span>
                    </label>
                  </div>
                  <ActionButtonSubmit 
                    button={button}
                    value={value}
                    loadingRef={loadingRef}
                    loader={loader}
                    successSpanRef={successSpanRef}
                    spanSuccess={spanSuccess}
                    errorSpanRef={errorSpanRef}
                    spanError={spanError}
                  />
                </>;

  return (
    <>
      <h3>{titleForm}</h3>
      {!value &&
        <form onSubmit={handleSubmit(handleFunction)}>
          {form}
        </form>
      }
      {value &&
        <form onSubmit={handleSubmit(handleFunction)}>
          {form}
        </form>
      }
      <span ref={errorMessageRef} className="error-message">
        {spanError && <>Une erreur est survenue, veuillez réessayer plus tard !</>}
      </span>
    </>
  );
}

FormEducExpe.propTypes = {
  handleFunction: PropTypes.func.isRequired,
  setIdItem: PropTypes.func,
  value: PropTypes.object,
  successSpanRef: PropTypes.object.isRequired,
}

export default FormEducExpe;