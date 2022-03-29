import React, { useState, useEffect, useRef, useMemo } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../../utils/axiosInstance";
import { apiDomain, apiVersion } from "../../../apiConfig/ApiConfig";
import { checkSuccess, checkErrors } from "../../../utils/checkSuccess";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ActionButtonSubmit from "../../ActionButtonSubmit";
import PropTypes from "prop-types";

function FormResetPassword({ userId }) {
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

  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({});

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

  const onClickEdit = async (data) => {
    if (data.newPassword && data.confirmPassword) {
      if (data.newPassword !== data.confirmPassword) {
        setError("confirmPassword", {
          type: "manual",
          message: "Mauvais mot de passe!",
        });
        return;
      }
    }
    reset();
    setLoader(true);
    setSpanError(false);
    const editPasswordUser = `${apiDomain}/api/${apiVersion}/users/${userId}`;
    await axiosInstance
      .patch(editPasswordUser, data)
      .then(() => {
        checkSuccess(
          setTimeoutLoader,
          setLoader,
          setTimeoutSuccess,
          setSpanSuccess
        );
        reset();
      })
      .catch(() => {
        checkErrors(setTimeoutLoader, setLoader, setTimeoutError, setSpanError);
      });
  };

  const form = (
    <>
      <div className="input-container">
        <div className="input">
          <label htmlFor="actualPassword">Ancien mot de passe *</label>
          <div className="input-block">
            <span>
              <FontAwesomeIcon icon="lock-open" />
            </span>
            <input
              name="actualPassword"
              type="password"
              id="actualPassword"
              placeholder="Ancien mot de passe *"
              {...register("actualPassword", {
                required: true,
              })}
            />
          </div>
          {errors.actualPassword && (
            <span className="error-message-form">Ce champ est requis</span>
          )}
        </div>

        <div className="input">
          <label htmlFor="newPassword">Nouveau mot de passe *</label>
          <div className="input-block">
            <span>
              <FontAwesomeIcon icon="key" />
            </span>
            <input
              name="newPassword"
              type="password"
              id="newPassword"
              placeholder="Nouveau mot de passe *"
              {...register("newPassword", {
                required: "Ce champ est requis",
                minLength: {
                  value: 6,
                  message:
                    "Votre mot de passe doit contenir au minimum 6 caractères!",
                },
              })}
            />
          </div>
          {errors.newPassword && (
            <span className="error-message-form">
              {errors.newPassword.message}
            </span>
          )}
        </div>

        <div className="input">
          <label htmlFor="confirmPassword">Confirmer mot de passe *</label>
          <div className="input-block">
            <span>
              <FontAwesomeIcon icon="lock" />
            </span>
            <input
              name="confirmPassword"
              type="password"
              id="confirmPassword"
              placeholder="Confirmer mot de passe *"
              {...register("confirmPassword", {
                required: "Ce champ est requis",
                minLength: {
                  value: 6,
                  message:
                    "Votre mot de passe doit contenir au minimum 6 caractères!",
                },
              })}
            />
          </div>
          {errors.confirmPassword && (
            <span className="error-message-form">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
      </div>
      <ActionButtonSubmit
        button={"Changer"}
        value={{}}
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
      <h2>Changer votre mot de passe</h2>
      <form onSubmit={handleSubmit(onClickEdit)}>{form}</form>
    </>
  );
}

FormResetPassword.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default FormResetPassword;
