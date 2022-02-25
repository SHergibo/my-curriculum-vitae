import React, { useState, useEffect, useRef, useMemo } from "react";
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
import SelectFontAwesome from "../../ReactSelectComponents/SelectFontAwesome";
import PropTypes from "prop-types";
import fontAwesomeData from "../../../utils/fontAwesomeData";

function FormSkill({
  add,
  value,
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
  const [switchPrevisualisation, setSwitchPrevisualisation] = useState(false);
  const [previsualisationValue, setPrevisualisationValue] = useState([
    {
      _id: 0,
      nameSkill: "default",
      fontAwesomeIcon: "",
      svgIcon: "",
    },
  ]);
  const [fontAwesomeIconsSelect, setFontAwesomeIconsSelect] = useState([]);
  const setTimeoutLoader = useRef();
  const setTimeoutSuccess = useRef();
  const setTimeoutError = useRef();
  const formDefaultValueRef = useRef({});

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      return value;
    }, [value]),
  });

  useEffect(() => {
    formDefaultValueRef.current = {
      fontAwesomeIcon: value?.fontAwesomeIcon,
      nameSkill: value?.nameSkill,
      skillCategory: value?.skillCategory,
      svgIcon: value?.svgIcon,
    };
    reset(formDefaultValueRef.current);
  }, [reset, value]);

  useEffect(() => {
    if (!add && value) {
      setTitleForm("Édition");
      setButton("Éditer");
      setPrevisualisationValue([
        {
          _id: 0,
          nameSkill: value.nameSkill,
          fontAwesomeIcon: value.fontAwesomeIcon,
          svgIcon: value.svgIcon,
        },
      ]);
      if (value.skillCategory !== "codingSkill") {
        setSwitchPrevisualisation(true);
      }
    }
  }, [add, value]);

  useEffect(() => {
    if (add) {
      formDefaultValueRef.current = {
        fontAwesomeIcon: null,
        nameSkill: null,
        skillCategory: "codingSkill",
        svgIcon: null,
      };
      reset(formDefaultValueRef.current);
    }
  }, [add, reset]);

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
        setPrevisualisationValue([
          {
            _id: 0,
            nameSkill: "default",
            fontAwesomeIcon: "",
            svgIcon: "",
          },
        ]);
        setSwitchPrevisualisation(false);
        reset({ skillCategory: "codingSkill" });
        reset({ fontAwesomeIcon: null });
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
    previsualisationValue[0][e.target.name] = e.target.value;
    setPrevisualisationValue([...previsualisationValue]);
  };

  const onChangeFontAwesomeIcon = (e) => {
    if (e?.value) {
      previsualisationValue[0]["fontAwesomeIcon"] = e;
    }
    if (e === null) {
      previsualisationValue[0]["fontAwesomeIcon"] = null;
    }
    setPrevisualisationValue([...previsualisationValue]);
  };

  const onChangePrevisualisation = (e) => {
    e.target.value === "codingSkill"
      ? setSwitchPrevisualisation(false)
      : setSwitchPrevisualisation(true);
  };

  useEffect(() => {
    setFontAwesomeIconsSelect(fontAwesomeData);
  }, []);

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
              {...register("nameSkill", {
                required: true,
                onChange: (e) => {
                  onChangeValue(e);
                },
              })}
            />
          </div>
          {errors.nameSkill && (
            <span className="error-message-form">Ce champ est requis</span>
          )}
        </div>

        <SelectFontAwesome
          control={control}
          name="fontAwesomeIcon"
          label="Icône Font Awesome"
          required={false}
          funcOnChange={onChangeFontAwesomeIcon}
          options={fontAwesomeIconsSelect}
          errors={errors}
        />

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
              {...register("svgIcon", {
                onChange: (e) => {
                  onChangeValue(e);
                },
              })}
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
            name="skillCategory"
            value="codingSkill"
            onChange={onChangePrevisualisation}
            {...register("skillCategory", {
              required: true,
              onChange: (e) => {
                onChangePrevisualisation(e);
              },
            })}
          />
          <span className="checkmark-radio"></span>
        </label>
        <label className="container-radio">
          Compétences générales
          <input
            type="radio"
            name="skillCategory"
            value="generalSkill"
            onChange={onChangePrevisualisation}
            {...register("skillCategory", {
              required: true,
              onChange: (e) => {
                onChangePrevisualisation(e);
              },
            })}
          />
          <span className="checkmark-radio"></span>
        </label>
        <label className="container-radio">
          Langues
          <input
            type="radio"
            name="skillCategory"
            value="language"
            onChange={onChangePrevisualisation}
            {...register("skillCategory", {
              required: true,
              onChange: (e) => {
                onChangePrevisualisation(e);
              },
            })}
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
  value: PropTypes.object,
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
