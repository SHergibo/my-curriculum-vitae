import React, { useLayoutEffect, useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faHourglassStart, faHourglassEnd, faUserGraduate, faSchool, faEdit } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import DatePicker, { registerLocale } from "react-datepicker";
import { parseISO } from 'date-fns';
import { fr } from 'date-fns/locale'
import "react-datepicker/dist/react-datepicker.css";
registerLocale("fr", fr);

function FormEducExpe({ handleFunction, setId, formType, value, success, dateStart, setDateStart, dateEnd, setDateEnd }) {
  const [checkboxExpe, setCheckboxExpe] = useState();
  const [checkboxEduc, setCheckboxEduc] = useState();

  const { register, handleSubmit, errors, setValue, setError, clearError } = useForm({
    mode: "onChange"
  });

  useEffect(() => {
    register({ name: "dateStart" }, {required : true});
    register({ name: "dateEnd" }, {required : true});
  }, [register]);

  useLayoutEffect(() => {
    setCheckboxExpe("checked");
    setCheckboxEduc("");
    if(formType === "edit"){
      setDateStart(parseISO(value.dateStart));
      setValue("dateStart", parseISO(value.dateStart));
      setDateEnd(parseISO(value.dateEnd));
      setValue("dateEnd", parseISO(value.dateEnd));
      if(value.educExpe === "education"){
        setCheckboxExpe("");
        setCheckboxEduc("checked");
      }
    }
  }, [register, setValue, value, formType, setCheckboxExpe, checkboxEduc]);

  let titleForm = "Ajout";
  let button = "Ajouter";

  if (formType === "edit"){
    titleForm = "Édition";
    button = "Éditer";
  }

  const form = <div>
                <div className="input-container">
                  <div className="input">
                    <label htmlFor="dateStart">Date de début *</label>
                    <div className="input-block">
                      <span><FontAwesomeIcon icon={faHourglassStart} /></span>
                      <DatePicker
                      id="dateStart"
                      isClearable
                      placeholderText="Date de début"
                      dateFormat="MM/yyyy"
                      locale="fr"
                      selected={dateStart}
                      onChange={val => {
                        setDateStart(val); 
                        setValue("dateStart", val);
                        }} 
                      />
                    </div>
                    {errors.dateStart && <span className="error-message">Ce champ est requis</span>}
                  </div>
                  <div className="input">
                    <label htmlFor="dateEnd">Date de fin *</label>
                    <div className="input-block">
                      <span><FontAwesomeIcon icon={faHourglassEnd} /></span>
                      <DatePicker
                      id="dateEnd"
                      isClearable
                      placeholderText="Date de fin"
                      dateFormat="MM/yyyy"
                      locale="fr"
                      selected={dateEnd}
                      onChange={val => {
                          if(val && dateStart){
                            if((dateStart.getYear() + (dateStart.getMonth() + 1)) <= (val.getYear() + (val.getMonth() + 1))){
                              clearError("lowerDateEnd");
                              setDateEnd(val); 
                              setValue("dateEnd", val);
                            } else {
                              setError(
                                "lowerDateEnd",
                              );
                            }
                          }else{
                            setDateEnd(val); 
                            setValue("dateEnd", val);
                          }
                        }} 
                      />
                    </div>
                    {errors.dateEnd && <span className="error-message">Ce champ est requis</span>}
                    {errors.lowerDateEnd && <span className="error-message">La date de fin ne peut pas être antérieur à la date de début</span>}
                  </div>
                </div>
                <div className="input-container">
                  <div className="input">
                    <label htmlFor="titleEducExpe">Titre du diplôme / formation *</label>
                    <div className="input-block">
                      <span><FontAwesomeIcon icon={faUserGraduate} /></span>
                      {formType === "add" && <input name="titleEducExpe" type="text" id="titleEducExpe" placeholder="Titre du diplôme / formation" ref={register({ required: true })} />}
                      {formType === "edit" && <input name="titleEducExpe" type="text" id="titleEducExpe" placeholder="Titre du diplôme / formation" defaultValue={value.titleEducExpe} ref={register({ required: true })} />}
                    </div>
                    {errors.titleEducExpe && <span className="error-message">Ce champ est requis</span>}
                  </div>
                  <div className="input">
                    <label htmlFor="placeEducExpe">Nom du centre de formation / école *</label>
                    <div className="input-block">
                      <span><FontAwesomeIcon icon={faSchool} /></span>
                      {formType === "add" && <input name="placeEducExpe" type="text" id="placeEducExpe" placeholder="Nom du centre de formation / école" ref={register({ required: true })} />}
                      {formType === "edit" && <input name="placeEducExpe" type="text" id="placeEducExpe" placeholder="Nom du centre de formation / école" defaultValue={value.placeEducExpe} ref={register({ required: true })} />}
                    </div>
                    {errors.placeEducExpe && <span className="error-message">Ce champ est requis</span>}
                  </div>
                </div>
                <div className="label-checkbox-container">
                  <label className="container-radio">Expérience
                    <input type="radio" defaultChecked={checkboxExpe} name="educExpe" value="experience" ref={register({ required: true })} />
                    <span className="checkmark-radio"></span>
                  </label>
                  <label className="container-radio">Éducation
                    <input type="radio" defaultChecked={checkboxEduc} name="educExpe" value="education" ref={register({ required: true })} />
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