import React, { useLayoutEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faGraduationCap, faPercentage, faEdit } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

function FormEducExpe({ handleFunction, setId, formType, value, success }) {
  const [checkboxCodingSkill, setCheckboxCodingSkill] = useState();
  const [checkboxGeneralSkill, setCheckboxGeneralSkill] = useState();
  const [checkboxLanguage, setCheckboxLanguage] = useState();

  const { register, handleSubmit, errors, setValue } = useForm({
    mode: "onChange"
  });

  useLayoutEffect(() => {
    setCheckboxCodingSkill("checked");
    setCheckboxGeneralSkill("");
    setCheckboxLanguage("");
    if (formType === "edit") {
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
  }, [register, setValue, value, formType]);

  let titleForm = "Ajout";
  let button = "Ajouter";

  if (formType === "edit") {
    titleForm = "Édition";
    button = "Éditer";
  }

  const form = <div>
                  <div className="input-container">
                    <div className="input">
                      <label htmlFor="nameSkill">Nom de la compétences *</label>
                      <div className="input-block">
                        <span><FontAwesomeIcon icon={faGraduationCap} /></span>
                        {formType === "add" && <input name="nameSkill" type="text" id="nameSkill" placeholder="Nom de la compétences" ref={register({ required: true })} />}
                        {formType === "edit" && <input name="nameSkill" type="text" id="nameSkill" placeholder="Nom de la compétences" defaultValue={value.nameSkill} ref={register({ required: true })} />}
                      </div>
                      {errors.nameSkill && <span className="error-message">Ce champ est requis</span>}
                    </div>
                    <div className="input">
                      <label htmlFor="percentage">Pourcentage *</label>
                      <div className="input-block">
                        <span><FontAwesomeIcon icon={faPercentage} /></span>
                        {formType === "add" && <input name="percentage" id="percentage" placeholder="Pourcentage" ref={register({
                          required: "Ce champ est requis",
                          pattern: {
                            value: /^[0-9]+$/,
                            message: "Entrez un nombre entre 0 et 100"
                          }
                        })} />}
                        {formType === "edit" && <input name="percentage" id="percentage" placeholder="Pourcentage" defaultValue={value.percentage} ref={register({ 
                          required: "Ce champ est requis",
                          pattern: {
                            value: /^[0-9]+$/,
                            message: "Entrez un nombre"
                          }
                        })} />}
                      </div>
                      <span className="error-message">{errors.percentage && errors.percentage.message}</span>
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
                  <div className="btn-container">
                    <button className="submit-contact" type="submit">
                      {button}
                      {formType === "add" && 
                        <FontAwesomeIcon icon={faPlus} />
                      }
                      {formType === "edit" && 
                        <FontAwesomeIcon icon={faEdit} />
                      }
                    </button>
                    <span className="success-message">
                      {success && <span ><FontAwesomeIcon icon={faCheck} /></span>}
                    </span>
                  </div>
                </div>;

  return (
    <div>
      <h3>{titleForm}</h3>
      {formType === "add" &&
        <form onSubmit={handleSubmit(handleFunction)}>
          {form}
        </form>
      }
      {formType === "edit" &&
        <form onSubmit={handleSubmit(handleFunction, setId(value._id))}>
          {form}
        </form>
      }
    </div>
  );
}

FormEducExpe.propTypes = {
  handleFunction: PropTypes.func.isRequired,
  formType: PropTypes.string.isRequired,
  value: PropTypes.object,
  success: PropTypes.bool.isRequired,
}

export default FormEducExpe;