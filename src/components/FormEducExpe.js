import React, { useEffect, useState, useRef } from "react";
import axiosInstance from './../utils/axiosInstance';
import { apiDomain, apiVersion } from './../apiConfig/ApiConfig';
import { useForm } from 'react-hook-form';
import checkSuccess from './../utils/checkSuccess';
import ActionButtonSubmit from './ActionButtonSubmit';
import { closeModal } from './../utils/modalDisplay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import DatePicker, { registerLocale } from "react-datepicker";
import { parseISO } from 'date-fns';
import { fr } from 'date-fns/locale'
import "react-datepicker/dist/react-datepicker.css";
registerLocale("fr", fr);

function FormEducExpe({ value, setDisplayForm, educState, expeState }) {
  const successSpanRef = useRef(null);
  const [spanSuccess, setSpanSuccess] = useState(false);
  const loadingRef = useRef(null);
  const [loader, setLoader] = useState(false);
  const errorSpanRef = useRef(null);
  const errorMessageRef = useRef(null);
  const [spanError, setSpanError] = useState(false);
  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);
  const [titleForm, setTitleForm] = useState('Ajout');
  const [button, setButton] = useState('Ajouter');
  const [checkboxExpe, setCheckboxExpe] = useState();
  const [checkboxEduc, setCheckboxEduc] = useState();

  const { register, handleSubmit, errors, setValue, setError, clearError } = useForm({
    mode: "onChange"
  });

  useEffect(() => {
    if(value){
      setTitleForm('Édition');
      setButton('Éditer');
    }
  }, [value]);

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

  const onSubmitAdd = async (data, e) => {
    setLoader(true);
    setSpanError(false);
    const addEducExpeEndPoint = `${apiDomain}/api/${apiVersion}/educExpe`;
    await axiosInstance.post(addEducExpeEndPoint, data)
      .then((response) => {
        checkSuccess(response.status, loadingRef, setLoader, successSpanRef, setSpanSuccess, errorSpanRef, errorMessageRef, setSpanError);
        e.target.reset();
        setDateStart(null);
        setDateEnd(null);
      });
  };

  const onClickEdit = async (data) => {
    const {arrayEduc, setArrayEduc} = educState;
    const {arrayExpe, setArrayExpe} = expeState;
    const editEducExpeEndPoint = `${apiDomain}/api/${apiVersion}/educExpe/${value._id}`;
    await axiosInstance.patch(editEducExpeEndPoint, data)
    .then((response) => {

      let arrayResponse = [response.data];
      if(data.educExpe === "experience"){
        let dataInArrayEduc = arrayEduc.find(v => v._id === response.data._id);

        if(!dataInArrayEduc){
          if(arrayExpe.find(v => v._id === response.data._id).dateStart === response.data.dateStart){
            setArrayExpe([...arrayExpe].map(obj => arrayResponse.find(o => o._id === obj._id) || obj));
          }else{
            let arrayAfterEdit = [...arrayExpe].map(obj => arrayResponse.find(o => o._id === obj._id) || obj);
            let sortArrayByDate = arrayAfterEdit.slice().sort((a, b) => new Date(b.dateStart) - new Date(a.dateStart));
            setArrayExpe(sortArrayByDate);
          }
        } else {
          setArrayEduc([...arrayEduc].filter(item => item._id !== value._id));
          setArrayExpe(arrayExpe => [...arrayExpe, response.data]);
        }
      }

      if(data.educExpe === "education"){
        let dataInArrayExpe = arrayExpe.find(v => v._id === response.data._id);

        if(!dataInArrayExpe){
          if(arrayEduc.find(v => v._id === response.data._id).dateStart === response.data.dateStart){
            setArrayEduc([...arrayEduc].map(obj => arrayResponse.find(o => o._id === obj._id) || obj));
          }else{
            let arrayAfterEdit = [...arrayEduc].map(obj => arrayResponse.find(o => o._id === obj._id) || obj);
            let sortArrayByDate = arrayAfterEdit.slice().sort((a, b) => new Date(b.dateStart) - new Date(a.dateStart));
            setArrayEduc(sortArrayByDate);
          }
        } else {
          setArrayExpe([...arrayExpe].filter(item => item._id !== value._id));
          setArrayEduc(arrayEduc => [...arrayEduc, response.data]);
        }
      }
      closeModal(setDisplayForm);
    });
  };

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
        <form onSubmit={handleSubmit(onSubmitAdd)}>
          {form}
        </form>
      }
      {value && 
        <form onSubmit={handleSubmit(onClickEdit)}>
          {form}
        </form>
      }
    </>
  );
}

FormEducExpe.propTypes = {
  value: PropTypes.object,
  setDisplayForm: PropTypes.func,
  educState: PropTypes.shape({
    arrayEduc: PropTypes.array,
    setArrayEduc: PropTypes.func
  }),
  expeState: PropTypes.shape({
    arrayExpe: PropTypes.array,
    setArrayExpe: PropTypes.func
  })
}

export default FormEducExpe;