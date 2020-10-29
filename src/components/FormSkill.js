import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import { useForm } from 'react-hook-form';
import axiosInstance from './../utils/axiosInstance';
import { apiDomain, apiVersion } from './../apiConfig/ApiConfig';
import checkSuccess from './../utils/checkSuccess';
import { closeModal } from './../utils/modalDisplay';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ActionButtonSubmit from './ActionButtonSubmit';
import PropTypes from 'prop-types';

function FormEducExpe({ value, codingSkillState, generalSkillState, languageState, setDisplayForm }) {
  const successSpanRef = useRef(null);
  const [spanSuccess, setSpanSuccess] = useState(false);
  const loadingRef = useRef(null);
  const [loader, setLoader] = useState(false);
  const errorSpanRef = useRef(null);
  const errorMessageRef = useRef(null);
  const [spanError, setSpanError] = useState(false);
  const [titleForm, setTitleForm] = useState('Ajout');
  const [button, setButton] = useState('Ajouter');
  const [checkboxCodingSkill, setCheckboxCodingSkill] = useState();
  const [checkboxGeneralSkill, setCheckboxGeneralSkill] = useState();
  const [checkboxLanguage, setCheckboxLanguage] = useState();
  const setTimeoutLoader = useRef();
  const setTimeoutSuccess = useRef();
  const setTimeoutError = useRef();

  const { register, handleSubmit, errors, setValue } = useForm({
    mode: "onChange"
  });

  useEffect(() => {
    if(value){
      setTitleForm('Édition');
      setButton('Éditer');
    }
  }, [value]);

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

  let timeoutLoader = setTimeoutLoader.current;
  let timeoutSuccess = setTimeoutSuccess.current;
  let timeoutError = setTimeoutError.current;
  useEffect(() => {
    return () => {
      clearTimeout(timeoutLoader);
      clearTimeout(timeoutSuccess);
      clearTimeout(timeoutError);
    }
  }, [timeoutLoader, timeoutSuccess, timeoutError]);

  const onSubmitAdd = async (data, e) => {
    setLoader(true);
    setSpanError(false);
    const addSkillEndPoint = `${apiDomain}/api/${apiVersion}/skill`;
    await axiosInstance.post(addSkillEndPoint, data)
      .then(async (response) => {
        checkSuccess(response.status, setTimeoutLoader, setLoader, setTimeoutSuccess, setSpanSuccess, setTimeoutError, setSpanError);
        e.target.reset();
        
      });
  };

  const onClickEdit = async (data) => {
    const {arrayCodingSkill, setArrayCodingSkill} = codingSkillState;
    const {arrayGeneralSkill, setArrayGeneralSkill} = generalSkillState;
    const {arrayLanguage, setArrayLanguage} = languageState;
    const editSkillEndPoint = `${apiDomain}/api/${apiVersion}/skill/${value._id}`;
    await axiosInstance.patch(editSkillEndPoint, data)
    .then((response) => {

      let arrayResponse = [response.data];
      if(data.skillCategory === "codingSkill"){
        let dataInArrayGeneralSkill = arrayGeneralSkill.find(v => v._id === response.data._id);
        let dataInArrayLanguage = arrayLanguage.find(v => v._id === response.data._id);

        if(!dataInArrayGeneralSkill && !dataInArrayLanguage){
          setArrayCodingSkill([...arrayCodingSkill].map(obj => arrayResponse.find(o => o._id === obj._id) || obj));
        } else {
          if(dataInArrayGeneralSkill){
            setArrayGeneralSkill([...arrayGeneralSkill].filter(item => item._id !== value._id));
          } else if(dataInArrayLanguage){
            setArrayLanguage([...arrayLanguage].filter(item => item._id !== value._id));
          }
          setArrayCodingSkill(arrayCodingSkill => [...arrayCodingSkill, response.data]);
        }
      }

      if(data.skillCategory === "generalSkill"){
        let dataInArrayCodingSkill = arrayCodingSkill.find(v => v._id === response.data._id);
        let dataInArrayLanguage = arrayLanguage.find(v => v._id === response.data._id);

        if(!dataInArrayCodingSkill && !dataInArrayLanguage){
          setArrayGeneralSkill([...arrayGeneralSkill].map(obj => arrayResponse.find(o => o._id === obj._id) || obj));
        } else {
          if(dataInArrayCodingSkill){
            setArrayCodingSkill([...arrayCodingSkill].filter(item => item._id !== value._id));
          } else if(dataInArrayLanguage){
            setArrayLanguage([...arrayLanguage].filter(item => item._id !== value._id));
          }
          setArrayGeneralSkill(arrayGeneralSkill => [...arrayGeneralSkill, response.data]);
        }
      }

      if(data.skillCategory === "language"){
        let dataInArrayCodingSkill = arrayCodingSkill.find(v => v._id === response.data._id);
        let dataInGeneralSkill = arrayGeneralSkill.find(v => v._id === response.data._id);

        if(!dataInArrayCodingSkill && !dataInGeneralSkill){
          setArrayLanguage([...arrayLanguage].map(obj => arrayResponse.find(o => o._id === obj._id) || obj));
        } else {
          if(dataInArrayCodingSkill){
            setArrayCodingSkill([...arrayCodingSkill].filter(item => item._id !== value._id));
          } else if(dataInGeneralSkill){
            setArrayGeneralSkill([...arrayGeneralSkill].filter(item => item._id !== value._id));
          }
          setArrayLanguage(arrayLanguage => [...arrayLanguage, response.data]);
        }
      }
      closeModal(setDisplayForm);
    });
  };

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
        <form onSubmit={handleSubmit(onSubmitAdd)}>
          {form}
        </form>
      }
      {value &&
        <form onSubmit={handleSubmit(onClickEdit)}>
          {form}
        </form>
      }

      <CSSTransition
        nodeRef={errorMessageRef}
        in={spanError}
        timeout={1000}
        classNames="btnAnimation"
        unmountOnExit
      >
        <span ref={errorMessageRef} className="error-message">
          Une erreur est survenue, veuillez réessayer plus tard !
        </span>
      </CSSTransition>
    </>
  );
}

FormEducExpe.propTypes = {
  value: PropTypes.object,
  codingSkillState: PropTypes.shape({
    arrayCodingSkill: PropTypes.array,
    setArrayCodingSkill: PropTypes.func
  }),
  generalSkillState: PropTypes.shape({
    arrayGeneralSkill: PropTypes.array,
    setArrayGeneralSkill: PropTypes.func
  }),
  languageState: PropTypes.shape({
    arrayLanguage: PropTypes.array,
    setArrayLanguage: PropTypes.func
  }),
  setDisplayForm: PropTypes.func,
}

export default FormEducExpe;