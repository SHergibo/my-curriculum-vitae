import React, { useEffect, useState, useRef, useMemo } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { apiDomain, apiVersion } from "../../../apiConfig/ApiConfig";
import { checkSuccess, checkErrors } from "../../../utils/checkSuccess";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSTransition } from "react-transition-group";
import ActionButtonSubmit from "../../ActionButtonSubmit";
import PropTypes from "prop-types";
import DatePicker, { registerLocale } from "react-datepicker";
import { parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
registerLocale("fr", fr);

function FormGeneralInfo({ generalInfoState }) {
  const { generalInfo, setGeneralInfo } = generalInfoState;
  const value = generalInfo;
  const [dateBirthday, setDateBirthday] = useState(null);
  const [titleForm, setTitleForm] = useState("Ajout");
  const [button, setButton] = useState("Ajouter");
  const successSpanRef = useRef(null);
  const [spanSuccess, setSpanSuccess] = useState(false);
  const loadingRef = useRef(null);
  const [loader, setLoader] = useState(false);
  const errorSpanRef = useRef(null);
  const errorMessageRef = useRef(null);
  const [spanError, setSpanError] = useState(false);
  const setTimeoutLoader = useRef();
  const setTimeoutSuccess = useRef();
  const setTimeoutError = useRef();
  const datePickerRef = useRef();
  const formDefaultValueRef = useRef({});

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: useMemo(() => {
      return generalInfo;
    }, [generalInfo]),
  });

  useEffect(() => {
    formDefaultValueRef.current = {
      firstname: generalInfo?.firstname,
      lastname: generalInfo?.lastname,
      email: generalInfo?.email,
      description: generalInfo?.description,
      licence: generalInfo?.licence,
      phone: generalInfo?.phone,
      city: generalInfo?.address?.city,
      number: generalInfo?.address?.number,
      street: generalInfo?.address?.street,
      zip: generalInfo?.address?.zip,
    };
    reset(formDefaultValueRef.current);
  }, [reset, generalInfo]);

  useEffect(() => {
    if (value?.firstname) {
      setTitleForm("Édition");
      setButton("Éditer");
    }
  }, [value]);

  useEffect(() => {
    if (generalInfo && generalInfo.isoDate) {
      setDateBirthday(parseISO(generalInfo.isoDate));
      setValue("dateBirthday", parseISO(generalInfo.isoDate));
    } else {
      setDateBirthday(null);
      setValue("dateBirthday", null);
    }
  }, [setValue, generalInfo]);

  const workingData = (data) => {
    return {
      firstname: data.firstname,
      lastname: data.lastname,
      phone: data.phone,
      email: data.email,
      address: {
        street: data.street,
        number: data.number,
        zip: data.zip,
        city: data.city,
      },
      birthdate: data.dateBirthday,
      licence: data.licence,
      description: data.description,
    };
  };

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
    e.preventDefault();
    const addGenerelInfoEndPoint = `${apiDomain}/api/${apiVersion}/infos`;
    await axiosInstance
      .post(addGenerelInfoEndPoint, workingData(data))
      .then((response) => {
        checkSuccess(
          setTimeoutLoader,
          setLoader,
          setTimeoutSuccess,
          setSpanSuccess
        );
        response.data.isoDate = response.data.birthdate;
        setGeneralInfo(response.data);
      })
      .catch(() => {
        checkErrors(setTimeoutLoader, setLoader, setTimeoutError, setSpanError);
      });
  };

  const onSubmitEdit = async (data, e) => {
    setLoader(true);
    setSpanError(false);
    e.preventDefault();
    const editGeneralInfoEndPoint = `${apiDomain}/api/${apiVersion}/infos/${generalInfo._id}`;
    await axiosInstance
      .patch(editGeneralInfoEndPoint, workingData(data))
      .then((response) => {
        checkSuccess(
          setTimeoutLoader,
          setLoader,
          setTimeoutSuccess,
          setSpanSuccess
        );
        response.data.isoDate = response.data.birthdate;
        setGeneralInfo(response.data);
      })
      .catch(() => {
        checkSuccess(
          setTimeoutLoader,
          setLoader,
          setTimeoutError,
          setSpanError
        );
      });
  };

  const formGeneralInfo = (
    <>
      <div className="input-container">
        <div className="input">
          <label htmlFor="firstname">Prénom *</label>
          <div className="input-block">
            <span>
              <FontAwesomeIcon icon="user" />
            </span>
            <input
              name="firstname"
              type="text"
              id="firstname"
              placeholder="Prénom"
              {...register("firstname", { required: true })}
            />
          </div>
          {errors.firstname && (
            <span className="error-message-form">Ce champ est requis</span>
          )}
        </div>
        <div className="input">
          <label htmlFor="lastname">Nom de famille *</label>
          <div className="input-block">
            <span>
              <FontAwesomeIcon icon="user" />
            </span>
            <input
              name="lastname"
              type="text"
              id="lastname"
              placeholder="Nom de famille"
              {...register("lastname", { required: true })}
            />
          </div>
          {errors.lastname && (
            <span className="error-message-form">Ce champ est requis</span>
          )}
        </div>
      </div>
      <div className="input-container">
        <div className="input">
          <label htmlFor="email">Email *</label>
          <div className="input-block">
            <span>
              <FontAwesomeIcon icon="at" />
            </span>
            <input
              name="email"
              id="email"
              placeholder="Adresse mail"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Adresse mail invalide",
                },
              })}
            />
          </div>
          <span className="error-message-form">
            {errors.email && errors.email.message}
          </span>
        </div>
        <div className="input">
          <label htmlFor="phone">Téléphone *</label>
          <div className="input-block">
            <span>
              <FontAwesomeIcon icon="mobile-alt" />
            </span>
            <input
              name="phone"
              type="text"
              id="phone"
              placeholder="N° de téléphone"
              {...register("phone", { required: true })}
            />
          </div>
          {errors.phone && (
            <span className="error-message-form">Ce champ est requis</span>
          )}
        </div>
      </div>
      <div className="input-container">
        <div className="input">
          <label htmlFor="street">Rue *</label>
          <div className="input-block">
            <span>
              <FontAwesomeIcon icon="road" />
            </span>
            <input
              name="street"
              type="text"
              id="street"
              placeholder="Rue"
              {...register("street", { required: true })}
            />
          </div>
          {errors.street && (
            <span className="error-message-form">Ce champ est requis</span>
          )}
        </div>
        <div className="input">
          <label htmlFor="number">Numéro *</label>
          <div className="input-block">
            <span>
              <FontAwesomeIcon icon="home" />
            </span>
            <input
              name="number"
              type="text"
              id="number"
              placeholder="Numéro"
              {...register("number", { required: true })}
            />
          </div>
          {errors.number && (
            <span className="error-message-form">Ce champ est requis</span>
          )}
        </div>
      </div>
      <div className="input-container">
        <div className="input">
          <label htmlFor="zip">Code postal *</label>
          <div className="input-block">
            <span>
              <FontAwesomeIcon icon="envelope-open-text" />
            </span>
            <input
              name="zip"
              type="text"
              id="zip"
              placeholder="Code postal"
              {...register("zip", { required: true })}
            />
          </div>
          {errors.zip && (
            <span className="error-message-form">Ce champ est requis</span>
          )}
        </div>
        <div className="input">
          <label htmlFor="city">Ville *</label>
          <div className="input-block">
            <span>
              <FontAwesomeIcon icon="city" />
            </span>
            <input
              name="city"
              type="text"
              id="city"
              placeholder="Ville"
              onKeyUp={(e) => {
                if (e.key === "Tab") datePickerRef.current.setOpen(false);
              }}
              {...register("city", { required: true })}
            />
          </div>
          {errors.city && (
            <span className="error-message-form">Ce champ est requis</span>
          )}
        </div>
      </div>
      <div className="input-container">
        <div className="input">
          <label htmlFor="birthDate">Date de naissance *</label>
          <div className="input-block">
            <span>
              <FontAwesomeIcon icon="birthday-cake" />
            </span>
            <DatePicker
              ref={datePickerRef}
              id="birthDate"
              isClearable
              placeholderText="Date de naissance"
              dateFormat="dd/MM/yyyy"
              locale="fr"
              selected={dateBirthday}
              enableTabLoop={false}
              onChange={(val) => {
                setDateBirthday(val);
                setValue("dateBirthday", val);
              }}
            />
          </div>
          {errors.dateBirthday && (
            <span className="error-message-form">Ce champ est requis</span>
          )}
        </div>
        <div className="input">
          <label htmlFor="licence">Permis de conduire *</label>
          <div className="input-block">
            <span>
              <FontAwesomeIcon icon="car" />
            </span>
            <input
              name="licence"
              type="text"
              id="licence"
              placeholder="Permis de conduire"
              onKeyUp={(e) => {
                if (e.key === "Tab") datePickerRef.current.setOpen(false);
              }}
              {...register("licence", { required: true })}
            />
          </div>
          {errors.licence && (
            <span className="error-message-form">Ce champ est requis</span>
          )}
        </div>
      </div>
      <div className="text-area">
        <label htmlFor="description">Description*</label>
        <div className="input-block">
          <textarea
            name="description"
            id="description"
            placeholder="Votre description ici..."
            {...register("description", { required: true })}
          />
        </div>
        {errors.description && (
          <span className="error-message-form">Ce champ est requis</span>
        )}
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
    <div className="form-container">
      <h3>{titleForm}</h3>
      <form
        onSubmit={(e) => {
          if (value?.firstname) {
            handleSubmit(onSubmitEdit)(e);
          } else if (!value?.firstname) {
            handleSubmit(onSubmitAdd)(e);
          }
        }}
      >
        {formGeneralInfo}
      </form>
    </div>
  );
}

FormGeneralInfo.propTypes = {
  generalInfoState: PropTypes.shape({
    generalInfo: PropTypes.object,
    setGeneralInfo: PropTypes.func,
  }),
};

export default FormGeneralInfo;
