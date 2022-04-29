import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { apiDomain, apiVersion } from "../../apiConfig/ApiConfig";
import { useForm } from "react-hook-form";
import ActionInsideButtonSubmit from "../ActionInsideButtonSubmit";
import HomeSection from "../frontComponents/HomeSection";
import { checkSuccess, checkErrors } from "../../utils/checkSuccess";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ResetPassword() {
  let { resetPasswordAuthToken } = useParams();
  let navigate = useNavigate();

  const loadingRef = useRef(null);
  const [loader, setLoader] = useState(false);
  const successSpanRef = useRef(null);
  const [spanSuccess, setSpanSuccess] = useState(false);
  const errorSpanRef = useRef(null);
  const [spanError, setSpanError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const setTimeoutLoader = useRef();
  const setTimeoutSuccess = useRef();
  const setTimeoutError = useRef();

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    mode: "onChange",
  });

  const onSubmitResetPassword = async (data) => {
    if (data.password && data.confirmPwd) {
      if (data.password !== data.confirmPwd) {
        setError("confirmPwd", {
          type: "manual",
          message: "Mauvais mot de passe!",
        });
        return;
      }
    }
    delete data.confirmPwd;
    setLoader(true);
    setSpanError(false);
    setErrorMessage("");
    const resetPasswordRoute = `${apiDomain}/api/${apiVersion}/email-request-reset-password/${resetPasswordAuthToken}`;
    await axiosInstance
      .patch(resetPasswordRoute, data)
      .then((response) => {
        if (response.status === 204) {
          reset();
          checkSuccess(
            setTimeoutLoader,
            setLoader,
            setTimeoutSuccess,
            setSpanSuccess
          );
        }
      })
      .catch((error) => {
        setErrorMessage(error.response.data.output.payload.message);
        checkErrors(setTimeoutLoader, setLoader, setTimeoutError, setSpanError);
      });
  };

  const form = (
    <form onSubmit={handleSubmit(onSubmitResetPassword)}>
      <div className="title-email-form-container">
        <button
          className="returnLogin"
          title="Retour au formulaire de connexion"
          type="button"
          onClick={() => {
            navigate("/login");
          }}
        >
          <FontAwesomeIcon icon="chevron-left" />
        </button>
        <h3>Changement de mot de passe</h3>
      </div>
      <div className="input input-signIn-signUp">
        <label htmlFor="password">Mot de passe *</label>
        <div className="input-block">
          <span>
            <FontAwesomeIcon icon="key" />
          </span>
          <input
            name="password"
            type="password"
            id="password"
            placeholder="Mot de passe"
            {...register("password", {
              required: "Ce champ est requis",
              minLength: {
                value: 6,
                message:
                  "Votre mot de passe doit contenir au minimum 6 caractères!",
              },
            })}
          />
        </div>
        {errors.password && (
          <span className="error-message-form">{errors.password.message}</span>
        )}
      </div>
      <div className="input input-signIn-signUp">
        <label htmlFor="confirmPwd">Confirmer mot de passe *</label>
        <div className="input-block">
          <span>
            <FontAwesomeIcon icon="key" />
          </span>
          <input
            name="confirmPwd"
            type="password"
            id="confirmPwd"
            placeholder="Confirmer mot de passe"
            {...register("confirmPwd", {
              required: "Ce champ est requis",
              minLength: {
                value: 6,
                message:
                  "Votre mot de passe doit contenir au minimum 6 caractères!",
              },
            })}
          />
        </div>
        {errors.confirmPwd && (
          <span className="error-message-form">
            {errors.confirmPwd.message}
          </span>
        )}
      </div>
      <ActionInsideButtonSubmit
        buttonTxt={"Changer de mot de passe"}
        icon={"key"}
        loadingRef={loadingRef}
        loader={loader}
        successSpanRef={successSpanRef}
        spanSuccess={spanSuccess}
        errorSpanRef={errorSpanRef}
        spanError={spanError}
      />
      {errorMessage && !loader && (
        <span className="error-message-signIn-signUp">{errorMessage}</span>
      )}
    </form>
  );

  return (
    <HomeSection
      welcome="Changemet de mot de passe"
      name="Bienvenue"
      div={form}
    />
  );
}

export default ResetPassword;
