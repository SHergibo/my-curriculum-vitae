import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { apiDomain, apiVersion } from "../../../apiConfig/ApiConfig";
import { useForm, Controller } from "react-hook-form";
import { checkSuccess, checkErrors } from "../../../utils/checkSuccess";
import { CSSTransition } from "react-transition-group";
import ActionButtonSubmit from "../../ActionButtonSubmit";
import { closeModal } from "../../../utils/modalDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import DatePicker, { registerLocale } from "react-datepicker";
import { parseISO } from "date-fns";
import { fr } from "date-fns/locale";
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
  const [titleForm, setTitleForm] = useState("Ajout");
  const [button, setButton] = useState("Ajouter");
  const setTimeoutLoader = useRef();
  const setTimeoutSuccess = useRef();
  const setTimeoutError = useRef();
  const formDefaultValueRef = useRef({});

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    clearErrors,
  } = useForm({});

  useEffect(() => {
    formDefaultValueRef.current = {
      dateEnd: value?.dateEnd ? parseISO(value.dateEnd) : null,
      dateStart: value?.dateStart ? parseISO(value.dateStart) : null,
      educExpe: value?.educExpe ? value?.educExpe : "education",
      placeEducExpe: value?.placeEducExpe,
      titleEducExpe: value?.titleEducExpe,
    };
    reset(formDefaultValueRef.current);
  }, [reset, value]);

  useEffect(() => {
    if (value) {
      setTitleForm("Édition");
      setButton("Éditer");
    }
  }, [value]);

  useEffect(() => {
    if (value) {
      setDateStart(parseISO(value.dateStart));
      setDateEnd(parseISO(value.dateEnd));
    } else if (!value) {
      setDateStart(null);
      setDateEnd(null);
    }
  }, [value, setDateStart, setDateEnd]);

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
    const addEducExpeEndPoint = `${apiDomain}/api/${apiVersion}/educs-exps`;
    await axiosInstance
      .post(addEducExpeEndPoint, data)
      .then(() => {
        checkSuccess(
          setTimeoutLoader,
          setLoader,
          setTimeoutSuccess,
          setSpanSuccess
        );
        e.target.reset();
        setDateStart(null);
        setDateEnd(null);
        reset({ dateStart: null });
        reset({ dateEnd: null });
        reset({ educExpe: "education" });
      })
      .catch(() => {
        checkErrors(setTimeoutLoader, setLoader, setTimeoutError, setSpanError);
      });
  };

  const onClickEdit = async (data) => {
    setLoader(true);
    setSpanError(false);
    const { arrayEduc, setArrayEduc } = educState;
    const { arrayExpe, setArrayExpe } = expeState;
    const editEducExpeEndPoint = `${apiDomain}/api/${apiVersion}/educs-exps/${value._id}`;
    await axiosInstance
      .patch(editEducExpeEndPoint, data)
      .then((response) => {
        let arrayResponse = [response.data];
        if (data.educExpe === "experience") {
          let dataInArrayEduc = arrayEduc.find(
            (v) => v._id === response.data._id
          );

          if (!dataInArrayEduc) {
            if (
              arrayExpe.find((v) => v._id === response.data._id).dateStart ===
              response.data.dateStart
            ) {
              setArrayExpe(
                [...arrayExpe].map(
                  (obj) => arrayResponse.find((o) => o._id === obj._id) || obj
                )
              );
            } else {
              let arrayAfterEdit = [...arrayExpe].map(
                (obj) => arrayResponse.find((o) => o._id === obj._id) || obj
              );
              let sortArrayByDate = arrayAfterEdit
                .slice()
                .sort((a, b) => new Date(b.dateStart) - new Date(a.dateStart));
              setArrayExpe(sortArrayByDate);
            }
          } else {
            setArrayEduc(
              [...arrayEduc].filter((item) => item._id !== value._id)
            );
            setArrayExpe((arrayExpe) => [...arrayExpe, response.data]);
          }
        }

        if (data.educExpe === "education") {
          let dataInArrayExpe = arrayExpe.find(
            (v) => v._id === response.data._id
          );

          if (!dataInArrayExpe) {
            if (
              arrayEduc.find((v) => v._id === response.data._id).dateStart ===
              response.data.dateStart
            ) {
              setArrayEduc(
                [...arrayEduc].map(
                  (obj) => arrayResponse.find((o) => o._id === obj._id) || obj
                )
              );
            } else {
              let arrayAfterEdit = [...arrayEduc].map(
                (obj) => arrayResponse.find((o) => o._id === obj._id) || obj
              );
              let sortArrayByDate = arrayAfterEdit
                .slice()
                .sort((a, b) => new Date(b.dateStart) - new Date(a.dateStart));
              setArrayEduc(sortArrayByDate);
            }
          } else {
            setArrayExpe(
              [...arrayExpe].filter((item) => item._id !== value._id)
            );
            setArrayEduc((arrayEduc) => [...arrayEduc, response.data]);
          }
        }
        closeModal(setDisplayForm);
      })
      .catch(() => {
        checkErrors(setTimeoutLoader, setLoader, setTimeoutError, setSpanError);
      });
  };

  const form = (
    <>
      <div className="input-container">
        <div className="input">
          <label htmlFor="dateStart">Date de début *</label>
          <div className="input-block">
            <span>
              <FontAwesomeIcon icon="hourglass-start" />
            </span>
            <Controller
              control={control}
              rules={{ required: true }}
              name="dateStart"
              render={({ field }) => (
                <DatePicker
                  id="dateStart"
                  isClearable
                  placeholderText="Date de début"
                  dateFormat="MM/yyyy"
                  locale="fr"
                  selected={field.value}
                  onChange={(val) => {
                    setDateStart(val);
                    setValue("dateStart", val);
                    clearErrors("dateStart");
                    if (
                      (!val && setDateEnd) ||
                      (val && dateEnd && val.getTime() > dateEnd.getTime())
                    ) {
                      setDateEnd(null);
                      setValue("dateEnd", null);
                    }
                  }}
                />
              )}
            />
          </div>
          {errors.dateStart && (
            <span className="error-message-form">Ce champ est requis</span>
          )}
        </div>
        <div className="input">
          <label htmlFor="dateEnd">Date de fin *</label>
          <div className="input-block">
            <span>
              <FontAwesomeIcon icon="hourglass-end" />
            </span>
            <Controller
              control={control}
              rules={{ required: true }}
              name="dateEnd"
              render={({ field }) => (
                <DatePicker
                  id="dateEnd"
                  title={dateStart ? "" : "Veuillez ajouter une date de début"}
                  className={dateStart ? "" : "disabled-datePicker"}
                  isClearable
                  placeholderText="Date de fin"
                  dateFormat="MM/yyyy"
                  locale="fr"
                  minDate={dateStart}
                  disabled={dateStart ? false : true}
                  selected={field.value}
                  onChange={(val) => {
                    setDateEnd(val);
                    setValue("dateEnd", val);
                    clearErrors("dateEnd");
                  }}
                />
              )}
            />
          </div>
          {errors.dateEnd && (
            <span className="error-message-form">Ce champ est requis</span>
          )}
        </div>
      </div>
      <div className="input-container">
        <div className="input">
          <label htmlFor="titleEducExpe">Titre du diplôme / formation *</label>
          <div className="input-block">
            <span>
              <FontAwesomeIcon icon="user-graduate" />
            </span>
            <input
              name="titleEducExpe"
              type="text"
              id="titleEducExpe"
              placeholder="Titre du diplôme / formation"
              {...register("titleEducExpe", { required: true })}
            />
          </div>
          {errors.titleEducExpe && (
            <span className="error-message-form">Ce champ est requis</span>
          )}
        </div>
        <div className="input">
          <label htmlFor="placeEducExpe">
            Nom du centre de formation / école *
          </label>
          <div className="input-block">
            <span>
              <FontAwesomeIcon icon="school" />
            </span>
            <input
              name="placeEducExpe"
              type="text"
              id="placeEducExpe"
              placeholder="Nom du centre de formation / école"
              {...register("placeEducExpe", { required: true })}
            />
          </div>
          {errors.placeEducExpe && (
            <span className="error-message-form">Ce champ est requis</span>
          )}
        </div>
      </div>
      <div className="label-checkbox-container">
        <label className="container-radio">
          Éducation
          <input
            type="radio"
            name="educExpe"
            value="education"
            {...register("educExpe", { required: true })}
          />
          <span className="checkmark-radio"></span>
        </label>
        <label className="container-radio">
          Expérience
          <input
            type="radio"
            name="educExpe"
            value="experience"
            {...register("educExpe", { required: true })}
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
      {!value && <form onSubmit={handleSubmit(onSubmitAdd)}>{form}</form>}
      {value && <form onSubmit={handleSubmit(onClickEdit)}>{form}</form>}

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
  setDisplayForm: PropTypes.func,
  educState: PropTypes.shape({
    arrayEduc: PropTypes.array,
    setArrayEduc: PropTypes.func,
  }),
  expeState: PropTypes.shape({
    arrayExpe: PropTypes.array,
    setArrayExpe: PropTypes.func,
  }),
};

export default FormEducExpe;
