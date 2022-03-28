import React, { useState, useEffect, useRef, useMemo } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../../utils/axiosInstance";
import { apiDomain, apiVersion } from "../../../apiConfig/ApiConfig";
import { checkSuccess, checkErrors } from "../../../utils/checkSuccess";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ActionButtonSubmit from "../../ActionButtonSubmit";
import SelectFontAwesome from "../../ReactSelectComponents/SelectFontAwesome";
import PropTypes from "prop-types";
import fontAwesomeData from "../../../utils/fontAwesomeData";

function FormProfessionTitle({ add, value, professionTitleState }) {
  const successSpanRef = useRef(null);
  const [spanSuccess, setSpanSuccess] = useState(false);
  const loadingRef = useRef(null);
  const [loader, setLoader] = useState(false);
  const errorSpanRef = useRef(null);
  const errorMessageRef = useRef(null);
  const [spanError, setSpanError] = useState(false);
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
      svgIcon: value?.svgIcon,
    };
    reset(formDefaultValueRef.current);
  }, [reset, value]);

  useEffect(() => {
    if (add) {
      formDefaultValueRef.current = {
        fontAwesomeIcon: null,
        nameSkill: null,
        svgIcon: null,
      };
      reset(formDefaultValueRef.current);
    }
  }, [add, reset]);

  useEffect(() => {
    setFontAwesomeIconsSelect(fontAwesomeData);
  }, []);

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
        reset({ fontAwesomeIcon: null });
      })
      .catch(() => {
        checkErrors(setTimeoutLoader, setLoader, setTimeoutError, setSpanError);
      });
  };

  const onClickEdit = async (data) => {
    setLoader(true);
    setSpanError(false);
    const { arrayProfessionTitle, setArrayProfessionTitle } =
      professionTitleState;
    const editSkillEndPoint = `${apiDomain}/api/${apiVersion}/skills/${value._id}`;
    await axiosInstance
      .patch(editSkillEndPoint, data)
      .then((response) => {
        checkSuccess(
          setTimeoutLoader,
          setLoader,
          setTimeoutSuccess,
          setSpanSuccess
        );
        let arrayResponse = [response.data];
        setArrayProfessionTitle(
          [...arrayProfessionTitle].map(
            (obj) => arrayResponse.find((o) => o._id === obj._id) || obj
          )
        );
      })
      .catch(() => {
        checkErrors(setTimeoutLoader, setLoader, setTimeoutError, setSpanError);
      });
  };

  const form = (
    <>
      <div className="input-container">
        <div className="input">
          <label htmlFor="nameProfesionTitle">Titre de la profession *</label>
          <div className="input-block">
            <span>
              <FontAwesomeIcon icon="briefcase" />
            </span>
            <input
              name="nameProfesionTitle"
              type="text"
              id="nameProfesionTitle"
              placeholder="Titre de la profession"
              {...register("nameProfesionTitle", {
                required: true,
              })}
            />
          </div>
          {errors.nameProfesionTitle && (
            <span className="error-message-form">Ce champ est requis</span>
          )}
        </div>

        <SelectFontAwesome
          control={control}
          name="fontAwesomeIcon"
          label="Icône Font Awesome"
          required={false}
          options={fontAwesomeIconsSelect}
          errors={errors}
        />

        <div className="input">
          <label htmlFor="svgIconProfTitle">Icône svg</label>
          <div className="input-block">
            <span>
              <FontAwesomeIcon icon={["fab", "font-awesome"]} />
            </span>
            <input
              name="svgIconProfTitle"
              type="text"
              id="svgIconProfTitle"
              placeholder="Icône svg"
              {...register("svgIconProfTitle")}
            />
          </div>
          {errors.svgIconProfTitle && (
            <span className="error-message-form">Ce champ est requis</span>
          )}
        </div>
      </div>
      <ActionButtonSubmit
        button={value ? "Éditer" : "Ajouter"}
        value={value}
        loadingRef={loadingRef}
        loader={loader}
        successSpanRef={successSpanRef}
        spanSuccess={spanSuccess}
        errorSpanRef={errorSpanRef}
        spanError={spanError}
      />

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

  return (
    <>
      {!value && (
        <>
          <h3>Ajout</h3>
          <form onSubmit={handleSubmit(onSubmitAdd)}>{form}</form>
        </>
      )}
      {value && <form onSubmit={handleSubmit(onClickEdit)}>{form}</form>}
    </>
  );
}

FormProfessionTitle.propTypes = {
  add: PropTypes.bool,
  value: PropTypes.object,
  professionTitleState: PropTypes.shape({
    arrayProfessionTitle: PropTypes.array,
    setArrayProfessionTitle: PropTypes.func,
  }),
};

export default FormProfessionTitle;
