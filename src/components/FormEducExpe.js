import React, { useLayoutEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faHourglassStart, faHourglassEnd, faUserGraduate, faSchool, faEdit } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

function FormEducExpe({ handleFunction, setId, formType, value, success }) {
  const [checkboxExpe, setCheckboxExpe] = useState();
  const [checkboxEduc, setCheckboxEduc] = useState();

  useLayoutEffect(() => {
    setCheckboxExpe("checked");
    setCheckboxEduc("");
    if(formType === "edit"){
      if(value.educExpe === "education"){
        setCheckboxExpe("");
        setCheckboxEduc("checked");
      }
    }
  }, [value, formType, setCheckboxExpe, checkboxEduc]);

  let titleForm = "Ajout";
  let button = "Ajouter";

  if (formType === "edit"){
    titleForm = "Édition";
    button = "Éditer";
  }

  const { register, handleSubmit, errors } = useForm({
    mode: "onChange"
  });

  const form = <div>
                <div className="input-container">
                      <div className="input">
                        <label htmlFor="dateStart">Date de début *</label>
                        <div>
                          <span><FontAwesomeIcon icon={faHourglassStart} /></span>
                          {formType === "add" && <input name="dateStart" type="text" id="dateStart" placeholder="Date de début" ref={register({ required: true })} />}
                          {formType === "edit" && <input name="dateStart" type="text" id="dateStart" placeholder="Date de début" defaultValue={value.dateStart} ref={register({ required: true })} />}
                        </div>
                        {errors.dateStart && <span className="error-message">Ce champ est requis</span>}
                      </div>
                      <div className="input">
                        <label htmlFor="dateEnd">Date de fin *</label>
                        <div>
                          <span><FontAwesomeIcon icon={faHourglassEnd} /></span>
                          {formType === "add" && <input name="dateEnd" type="text" id="dateEnd" placeholder="Date de fin" ref={register({ required: true })} />}
                          {formType === "edit" && <input name="dateEnd" type="text" id="dateEnd" placeholder="Date de fin" defaultValue={value.dateEnd} ref={register({ required: true })} />}
                        </div>
                        {errors.dateEnd && <span className="error-message">Ce champ est requis</span>}
                      </div>
                    </div>
                    <div className="input-container">
                      <div className="input">
                        <label htmlFor="titleEducExpe">Titre du diplôme / formation *</label>
                        <div>
                          <span><FontAwesomeIcon icon={faUserGraduate} /></span>
                          {formType === "add" && <input name="titleEducExpe" type="text" id="titleEducExpe" placeholder="Titre du diplôme / formation" ref={register({ required: true })} />}
                          {formType === "edit" && <input name="titleEducExpe" type="text" id="titleEducExpe" placeholder="Titre du diplôme / formation" defaultValue={value.titleEducExpe} ref={register({ required: true })} />}
                        </div>
                        {errors.titleEducExpe && <span className="error-message">Ce champ est requis</span>}
                      </div>
                      <div className="input">
                        <label htmlFor="placeEducExpe">Nom du centre de formation / école *</label>
                        <div>
                          <span><FontAwesomeIcon icon={faSchool} /></span>
                          {formType === "add" && <input name="placeEducExpe" type="text" id="placeEducExpe" placeholder="Nom du centre de formation / école" ref={register({ required: true })} />}
                          {formType === "edit" && <input name="placeEducExpe" type="text" id="placeEducExpe" placeholder="Nom du centre de formation / école" defaultValue={value.placeEducExpe} ref={register({ required: true })} />}
                        </div>
                        {errors.placeEducExpe && <span className="error-message">Ce champ est requis</span>}
                      </div>
                    </div>
                    <div className="label-checkbox-container">
                      <label className="container-checkbox">Éxperience
                        <input type="radio" defaultChecked={checkboxExpe} name="educExpe" value="experience" ref={register({ required: true })} />
                        <span className="checkmark"></span>
                      </label>
                      <label className="container-checkbox">Éducation
                        <input type="radio" defaultChecked={checkboxEduc} name="educExpe" value="education" ref={register({ required: true })} />
                        <span className="checkmark"></span>
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