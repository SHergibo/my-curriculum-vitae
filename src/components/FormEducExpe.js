import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import DatePicker, { registerLocale } from "react-datepicker";
import { parseISO } from 'date-fns';
import { fr } from 'date-fns/locale'
import "react-datepicker/dist/react-datepicker.css";
registerLocale("fr", fr);

function FormEducExpe({ handleFunction, setIdItem, value, successMessage, dateStartState, dateEndState}) {
  const { dateStart, setDateStart } = dateStartState;
  const { dateEnd, setDateEnd } = dateEndState;
  const [titleForm, setTitleForm] = useState('Ajout');
  const [button, setButton] = useState('Ajouter');
  const [checkboxExpe, setCheckboxExpe] = useState();
  const [checkboxEduc, setCheckboxEduc] = useState();

  const { register, handleSubmit, errors, setValue, setError, clearError } = useForm({
    mode: "onChange"
  });

  useEffect(() => {
    if(value){
      setIdItem(value._id);
      setTitleForm('Édition');
      setButton('Éditer');
    }
  }, [value, setIdItem]);

  useEffect(() => {
    register({ name: "dateStart" }, {required : true});
    register({ name: "dateEnd" }, {required : true});
  }, [register]);

  useEffect(() => {
    setCheckboxExpe("checked");
    setCheckboxEduc("");
    if(value){
      setDateStart(parseISO(value.dateStart));
      setValue("dateStart", parseISO(value.dateStart));
      setDateEnd(parseISO(value.dateEnd));
      setValue("dateEnd", parseISO(value.dateEnd));
      if(value.educExpe === "education"){
        setCheckboxExpe("");
        setCheckboxEduc("checked");
      }
    }else if (!value){
      setDateStart(null);
      setDateEnd(null);
    }
  }, [register, setValue, value, setCheckboxExpe, checkboxEduc, setDateStart, setDateEnd]);

  const form = <>
                <div className="input-container">
                  <div className="input">
                    <label htmlFor="dateStart">Date de début *</label>
                    <div className="input-block">
                      <span><FontAwesomeIcon icon="hourglass-start" /></span>
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
                    {errors.dateStart && <span className="error-message-form">Ce champ est requis</span>}
                  </div>
                  <div className="input">
                    <label htmlFor="dateEnd">Date de fin *</label>
                    <div className="input-block">
                      <span><FontAwesomeIcon icon="hourglass-end" /></span>
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
                    {errors.dateEnd && <span className="error-message-form">Ce champ est requis</span>}
                    {errors.lowerDateEnd && <span className="error-message-form">La date de fin ne peut pas être antérieur à la date de début</span>}
                  </div>
                </div>
                <div className="input-container">
                  <div className="input">
                    <label htmlFor="titleEducExpe">Titre du diplôme / formation *</label>
                    <div className="input-block">
                      <span><FontAwesomeIcon icon="user-graduate" /></span>
                      {!value && <input name="titleEducExpe" type="text" id="titleEducExpe" placeholder="Titre du diplôme / formation" ref={register({ required: true })} />}
                      {value && <input name="titleEducExpe" type="text" id="titleEducExpe" placeholder="Titre du diplôme / formation" defaultValue={value.titleEducExpe} ref={register({ required: true })} />}
                    </div>
                    {errors.titleEducExpe && <span className="error-message-form">Ce champ est requis</span>}
                  </div>
                  <div className="input">
                    <label htmlFor="placeEducExpe">Nom du centre de formation / école *</label>
                    <div className="input-block">
                      <span><FontAwesomeIcon icon="school" /></span>
                      {!value && <input name="placeEducExpe" type="text" id="placeEducExpe" placeholder="Nom du centre de formation / école" ref={register({ required: true })} />}
                      {value && <input name="placeEducExpe" type="text" id="placeEducExpe" placeholder="Nom du centre de formation / école" defaultValue={value.placeEducExpe} ref={register({ required: true })} />}
                    </div>
                    {errors.placeEducExpe && <span className="error-message-form">Ce champ est requis</span>}
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
                    {!value && 
                      <FontAwesomeIcon icon="plus" />
                    }
                    {value && 
                      <FontAwesomeIcon icon="edit" />
                    }
                  </button> 
                  <span ref={successMessage} className="success-message" ><FontAwesomeIcon icon="check" /></span>
                </div>
              </>;

  return (
    <>
      <h3>{titleForm}</h3>
      {!value && 
        <form onSubmit={async (e)=> {
          await handleSubmit(handleFunction)(e);
          setValue("dateStart", null);
          setValue("dateEnd", null);
          }}>
          {form}
        </form>
      }
      {value && 
        <form onSubmit={handleSubmit(handleFunction)}>
          {form}
        </form>
      }
    </>
  );
}

FormEducExpe.propTypes = {
  handleFunction: PropTypes.func.isRequired,
  setIdItem: PropTypes.func,
  value: PropTypes.object,
  successMessage: PropTypes.object.isRequired,
  dateStartState: PropTypes.shape({
    dateStart: PropTypes.instanceOf(Date),
    setDateStart: PropTypes.func.isRequired
  }),
  dateEndState: PropTypes.shape({
    dateEnd: PropTypes.instanceOf(Date),
    setDateEnd: PropTypes.func.isRequired
  })
}

export default FormEducExpe;