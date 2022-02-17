import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../../utils/axiosInstance";
import { apiDomain, apiVersion } from "../../../apiConfig/ApiConfig";
import { checkSuccess, checkErrors } from "../../../utils/checkSuccess";
import { closeModal } from "../../../utils/modalDisplay";
import CanvasResume from "../../frontComponents/resumeComponents/CanvasResume";
import SkillBarResume from "../../frontComponents/resumeComponents/SkillBarResume";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ActionButtonSubmit from "../../ActionButtonSubmit";
import PropTypes from "prop-types";

function FormSkill({
  add,
  value,
  setValue,
  codingSkillState,
  generalSkillState,
  languageState,
  setDisplayForm,
}) {
  const successSpanRef = useRef(null);
  const [spanSuccess, setSpanSuccess] = useState(false);
  const loadingRef = useRef(null);
  const [loader, setLoader] = useState(false);
  const errorSpanRef = useRef(null);
  const errorMessageRef = useRef(null);
  const [spanError, setSpanError] = useState(false);
  const [titleForm, setTitleForm] = useState("Ajout");
  const [button, setButton] = useState("Ajouter");
  const [checkboxCodingSkill, setCheckboxCodingSkill] = useState();
  const [checkboxGeneralSkill, setCheckboxGeneralSkill] = useState();
  const [checkboxLanguage, setCheckboxLanguage] = useState();
  const [switchPrevisualisation, setSwitchPrevisualisation] = useState(false);
  const [previsualisationValue, setPrevisualisationValue] = useState([
    {
      _id: "0",
      nameSkill: "default",
      percentage: 100,
      skillCategory: "codingSkill",
      fontAwesomeIcon: "",
      svgIcon: "",
    },
  ]);
  const setTimeoutLoader = useRef();
  const setTimeoutSuccess = useRef();
  const setTimeoutError = useRef();

  const { register, handleSubmit, errors } = useForm({});

  useEffect(() => {
    if (!add && value) {
      setTitleForm("Édition");
      setButton("Éditer");
      setPrevisualisationValue([
        {
          _id: value._id,
          nameSkill: value.nameSkill,
          percentage: value.percentage,
          skillCategory: value.skillCategory,
          fontAwesomeIcon: value.fontAwesomeIcon,
          svgIcon: value.svgIcon,
        },
      ]);
      if (value.skillCategory !== "codingSkill") {
        setSwitchPrevisualisation(true);
      }
    }
  }, [add, value]);

  useLayoutEffect(() => {
    setCheckboxCodingSkill("checked");
    setCheckboxGeneralSkill("");
    setCheckboxLanguage("");
    if (value) {
      if (value.skillCategory === "generalSkill") {
        setCheckboxCodingSkill("");
        setCheckboxGeneralSkill("checked");
        setCheckboxLanguage("");
      } else if (value.skillCategory === "language") {
        setCheckboxCodingSkill("");
        setCheckboxGeneralSkill("");
        setCheckboxLanguage("checked");
      }
    }
  }, [value]);

  let timeoutLoader = setTimeoutLoader.current;
  let timeoutSuccess = setTimeoutSuccess.current;
  let timeoutError = setTimeoutError.current;
  useEffect(() => {
    return () => {
      clearTimeout(timeoutLoader);
      clearTimeout(timeoutSuccess);
      clearTimeout(timeoutError);
    };
  }, [timeoutLoader, timeoutSuccess, timeoutError]);

  const onSubmitAdd = async (data, e) => {
    setLoader(true);
    setSpanError(false);
    const addSkillEndPoint = `${apiDomain}/api/${apiVersion}/skills`;
    await axiosInstance
      .post(addSkillEndPoint, data)
      .then(() => {
        checkSuccess(
          setTimeoutLoader,
          setLoader,
          setTimeoutSuccess,
          setSpanSuccess
        );
        e.target.reset();
        let dataValue = {
          _id: "0",
          nameSkill: "",
          percentage: 100,
          skillCategory: "codingSkill",
          fontAwesomeIcon: "",
          svgIcon: "",
        };
        setValue(dataValue);
        setPrevisualisationValue([dataValue]);
        setSwitchPrevisualisation(false);
      })
      .catch(() => {
        checkErrors(setTimeoutLoader, setLoader, setTimeoutError, setSpanError);
      });
  };

  const onClickEdit = async (data) => {
    setLoader(true);
    setSpanError(false);
    const { arrayCodingSkill, setArrayCodingSkill } = codingSkillState;
    const { arrayGeneralSkill, setArrayGeneralSkill } = generalSkillState;
    const { arrayLanguage, setArrayLanguage } = languageState;
    const editSkillEndPoint = `${apiDomain}/api/${apiVersion}/skills/${value._id}`;
    await axiosInstance
      .patch(editSkillEndPoint, data)
      .then((response) => {
        let arrayResponse = [response.data];
        if (data.skillCategory === "codingSkill") {
          let dataInArrayGeneralSkill = arrayGeneralSkill.find(
            (v) => v._id === response.data._id
          );
          let dataInArrayLanguage = arrayLanguage.find(
            (v) => v._id === response.data._id
          );

          if (!dataInArrayGeneralSkill && !dataInArrayLanguage) {
            setArrayCodingSkill(
              [...arrayCodingSkill].map(
                (obj) => arrayResponse.find((o) => o._id === obj._id) || obj
              )
            );
          } else {
            if (dataInArrayGeneralSkill) {
              setArrayGeneralSkill(
                [...arrayGeneralSkill].filter((item) => item._id !== value._id)
              );
            } else if (dataInArrayLanguage) {
              setArrayLanguage(
                [...arrayLanguage].filter((item) => item._id !== value._id)
              );
            }
            setArrayCodingSkill((arrayCodingSkill) => [
              ...arrayCodingSkill,
              response.data,
            ]);
          }
        }

        if (data.skillCategory === "generalSkill") {
          let dataInArrayCodingSkill = arrayCodingSkill.find(
            (v) => v._id === response.data._id
          );
          let dataInArrayLanguage = arrayLanguage.find(
            (v) => v._id === response.data._id
          );

          if (!dataInArrayCodingSkill && !dataInArrayLanguage) {
            setArrayGeneralSkill(
              [...arrayGeneralSkill].map(
                (obj) => arrayResponse.find((o) => o._id === obj._id) || obj
              )
            );
          } else {
            if (dataInArrayCodingSkill) {
              setArrayCodingSkill(
                [...arrayCodingSkill].filter((item) => item._id !== value._id)
              );
            } else if (dataInArrayLanguage) {
              setArrayLanguage(
                [...arrayLanguage].filter((item) => item._id !== value._id)
              );
            }
            setArrayGeneralSkill((arrayGeneralSkill) => [
              ...arrayGeneralSkill,
              response.data,
            ]);
          }
        }

        if (data.skillCategory === "language") {
          let dataInArrayCodingSkill = arrayCodingSkill.find(
            (v) => v._id === response.data._id
          );
          let dataInGeneralSkill = arrayGeneralSkill.find(
            (v) => v._id === response.data._id
          );

          if (!dataInArrayCodingSkill && !dataInGeneralSkill) {
            setArrayLanguage(
              [...arrayLanguage].map(
                (obj) => arrayResponse.find((o) => o._id === obj._id) || obj
              )
            );
          } else {
            if (dataInArrayCodingSkill) {
              setArrayCodingSkill(
                [...arrayCodingSkill].filter((item) => item._id !== value._id)
              );
            } else if (dataInGeneralSkill) {
              setArrayGeneralSkill(
                [...arrayGeneralSkill].filter((item) => item._id !== value._id)
              );
            }
            setArrayLanguage((arrayLanguage) => [
              ...arrayLanguage,
              response.data,
            ]);
          }
        }
        closeModal(setDisplayForm);
      })
      .catch(() => {
        checkErrors(setTimeoutLoader, setLoader, setTimeoutError, setSpanError);
      });
  };

  const onChangeValue = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
    setPrevisualisationValue([
      {
        ...value,
        [e.target.name]: e.target.value,
      },
    ]);
  };

  const onChangePrevisualisation = (e) => {
    e.target.value === "codingSkill"
      ? setSwitchPrevisualisation(false)
      : setSwitchPrevisualisation(true);
  };

  const form = (
    <>
      <div className="input-container">
        <div className="input">
          <label htmlFor="nameSkill">Nom de la compétences *</label>
          <div className="input-block">
            <span>
              <FontAwesomeIcon icon="graduation-cap" />
            </span>
            <input
              name="nameSkill"
              type="text"
              id="nameSkill"
              placeholder="Nom de la compétences"
              value={value.nameSkill}
              onChange={onChangeValue}
              ref={register({ required: true })}
            />
          </div>
          {errors.nameSkill && (
            <span className="error-message-form">Ce champ est requis</span>
          )}
        </div>
        <div className="input">
          <label htmlFor="fontAwesomeIcon">Icône Font Awesome</label>
          <div className="input-block">
            <span>
              <FontAwesomeIcon icon={["fab", "font-awesome"]} />
            </span>
            <input
              name="fontAwesomeIcon"
              type="text"
              id="fontAwesomeIcon"
              placeholder="Icône Font Awesome"
              value={value.fontAwesomeIcon}
              onChange={onChangeValue}
              ref={register()}
            />
          </div>
          {errors.fontAwesomeIcon && (
            <span className="error-message-form">Ce champ est requis</span>
          )}
        </div>
        <div className="input">
          <label htmlFor="svgIcon">Icône svg</label>
          <div className="input-block">
            <span>
              <FontAwesomeIcon icon={["fab", "font-awesome"]} />
            </span>
            <input
              name="svgIcon"
              type="text"
              id="svgIcon"
              placeholder="Icône svg"
              value={value.svgIcon}
              onChange={onChangeValue}
              ref={register()}
            />
          </div>
          {errors.svgIcon && (
            <span className="error-message-form">Ce champ est requis</span>
          )}
        </div>
      </div>
      <div>
        <h4>Pré-visualisation de l'icône :</h4>
        {!switchPrevisualisation ? (
          <CanvasResume data={previsualisationValue} />
        ) : (
          <SkillBarResume data={previsualisationValue} />
        )}
      </div>
      <div className="label-checkbox-container skills-checkbox-container">
        <label className="container-radio">
          Compétences code
          <input
            type="radio"
            defaultChecked={checkboxCodingSkill}
            name="skillCategory"
            value="codingSkill"
            onChange={onChangePrevisualisation}
            ref={register({ required: true })}
          />
          <span className="checkmark-radio"></span>
        </label>
        <label className="container-radio">
          Compétences générales
          <input
            type="radio"
            defaultChecked={checkboxGeneralSkill}
            name="skillCategory"
            value="generalSkill"
            onChange={onChangePrevisualisation}
            ref={register({ required: true })}
          />
          <span className="checkmark-radio"></span>
        </label>
        <label className="container-radio">
          Langues
          <input
            type="radio"
            defaultChecked={checkboxLanguage}
            name="skillCategory"
            value="language"
            onChange={onChangePrevisualisation}
            ref={register({ required: true })}
          />
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
    </>
  );

  return (
    <>
      <h3>{titleForm}</h3>
      {add && <form onSubmit={handleSubmit(onSubmitAdd)}>{form}</form>}
      {!add && <form onSubmit={handleSubmit(onClickEdit)}>{form}</form>}

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

FormSkill.propTypes = {
  add: PropTypes.bool,
  value: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  codingSkillState: PropTypes.shape({
    arrayCodingSkill: PropTypes.array,
    setArrayCodingSkill: PropTypes.func,
  }),
  generalSkillState: PropTypes.shape({
    arrayGeneralSkill: PropTypes.array,
    setArrayGeneralSkill: PropTypes.func,
  }),
  languageState: PropTypes.shape({
    arrayLanguage: PropTypes.array,
    setArrayLanguage: PropTypes.func,
  }),
  setDisplayForm: PropTypes.func,
};

export default FormSkill;