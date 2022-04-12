import React, { useState, useEffect, useRef, useMemo } from "react";
import { useInfosData } from "../../../App";
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

function FormProfessionTitle({ add, value, setArrayProfessionTitle }) {
  const { generalInfo, setGeneralInfo } = useInfosData();
  const successSpanRef = useRef(null);
  const [spanSuccess, setSpanSuccess] = useState(false);
  const loadingRef = useRef(null);
  const [loader, setLoader] = useState(false);
  const errorSpanRef = useRef(null);
  const errorMessageRef = useRef(null);
  const [spanError, setSpanError] = useState(false);
  const [fontAwesomeIconsSelect, setFontAwesomeIconsSelect] = useState([]);
  const [errorMessageProfTitle, setErrorMessageProfTitle] = useState();
  const [errorTwoIcons, setErrorTwoIcons] = useState("");
  const [checkMultipleIcons, setCheckMultipleIcons] = useState([
    {
      fontAwesomeIcon: "",
      svgIconProfTitle: "",
    },
  ]);
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
    if (value) {
      setCheckMultipleIcons([
        {
          fontAwesomeIcon: value.fontAwesomeIcon,
          svgIconProfTitle: value.svgIconProfTitle,
        },
      ]);
    }
  }, [value]);

  useEffect(() => {
    formDefaultValueRef.current = {
      fontAwesomeIcon: value?.fontAwesomeIcon,
      nameProfessionTitle: value?.nameProfessionTitle,
      svgIconProfTitle: value?.svgIconProfTitle,
    };
    reset(formDefaultValueRef.current);
  }, [reset, value]);

  useEffect(() => {
    if (add) {
      formDefaultValueRef.current = {
        fontAwesomeIcon: null,
        nameProfessionTitle: null,
        svgIconProfTitle: null,
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
    if (data.fontAwesomeIcon?.value && data.svgIconProfTitle) {
      return;
    }
    if (generalInfo.professionTitles.length >= 4) {
      setErrorMessageProfTitle(
        "Vous ne pouvez pas avoir plus de 4 titres de profession !"
      );
      return;
    }
    setLoader(true);
    setSpanError(false);
    const addProfTitleEndPoint = `${apiDomain}/api/${apiVersion}/infos/prof-title/${generalInfo._id}`;
    await axiosInstance
      .patch(addProfTitleEndPoint, data)
      .then((response) => {
        checkSuccess(
          setTimeoutLoader,
          setLoader,
          setTimeoutSuccess,
          setSpanSuccess
        );
        setGeneralInfo({
          ...generalInfo,
          professionTitles: response.data,
        });
        e.target.reset();
        reset({ fontAwesomeIcon: null });
      })
      .catch(() => {
        checkErrors(setTimeoutLoader, setLoader, setTimeoutError, setSpanError);
      });
  };

  const onClickEdit = async (data) => {
    if (data.fontAwesomeIcon?.value && data.svgIconProfTitle) {
      return;
    }
    setLoader(true);
    setSpanError(false);
    const editProfTitleEndPoint = `${apiDomain}/api/${apiVersion}/infos/prof-title-edit/${generalInfo._id}/${value.id}`;
    await axiosInstance
      .patch(editProfTitleEndPoint, data)
      .then((response) => {
        checkSuccess(
          setTimeoutLoader,
          setLoader,
          setTimeoutSuccess,
          setSpanSuccess
        );
        setArrayProfessionTitle(response.data);
        setGeneralInfo({
          ...generalInfo,
          professionTitles: response.data,
        });
      })
      .catch(() => {
        checkErrors(setTimeoutLoader, setLoader, setTimeoutError, setSpanError);
      });
  };

  const onChangeValue = (e) => {
    if (checkMultipleIcons[0].fontAwesomeIcon && e.target.value) {
      setErrorTwoIcons("Vous ne pouvez pas avoir deux icônes à la fois !");
    } else {
      if (errorTwoIcons) setErrorTwoIcons("");
    }
    checkMultipleIcons[0][e.target.name] = e.target.value;
    setCheckMultipleIcons([...checkMultipleIcons]);
  };

  const onChangeFontAwesomeIcon = (e) => {
    if (checkMultipleIcons[0].svgIconProfTitle && e) {
      setErrorTwoIcons("Vous ne pouvez pas avoir deux icônes à la fois !");
    } else {
      if (errorTwoIcons) setErrorTwoIcons("");
    }
    if (e?.value) {
      checkMultipleIcons[0]["fontAwesomeIcon"] = e;
    }
    if (e === null) {
      checkMultipleIcons[0]["fontAwesomeIcon"] = null;
    }
    setCheckMultipleIcons([...checkMultipleIcons]);
  };

  const form = (
    <>
      <div className="input-container">
        <div className="input">
          <label htmlFor="nameProfessionTitle">Titre de la profession *</label>
          <div className="input-block">
            <span>
              <FontAwesomeIcon icon="briefcase" />
            </span>
            <input
              name="nameProfessionTitle"
              type="text"
              id="nameProfessionTitle"
              placeholder="Titre de la profession"
              {...register("nameProfessionTitle", {
                required: true,
              })}
            />
          </div>
          {errors.nameProfessionTitle && (
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
          funcOnChange={onChangeFontAwesomeIcon}
          errorsMessage={errorTwoIcons}
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
              {...register("svgIconProfTitle", {
                onChange: (e) => {
                  onChangeValue(e);
                },
              })}
            />
          </div>
          {errorTwoIcons && (
            <span className="error-message-form">{errorTwoIcons}</span>
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

      {errorMessageProfTitle && (
        <span className="error-message">{errorMessageProfTitle}</span>
      )}
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
  setArrayProfessionTitle: PropTypes.func,
};

export default FormProfessionTitle;
