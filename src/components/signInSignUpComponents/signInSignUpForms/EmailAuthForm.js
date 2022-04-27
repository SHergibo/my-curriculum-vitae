import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { apiDomain, apiVersion } from "../../../apiConfig/ApiConfig";
import { useForm } from "react-hook-form";
import { checkSuccess, checkErrors } from "../../../utils/checkSuccess";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ActionInsideButtonSubmit from "../../ActionInsideButtonSubmit";

function EmailAuthForm({ emailFormName }) {
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

  const onSubmitEmailAuth = async (data) => {
    setLoader(true);
    setSpanError(false);
    setErrorMessage("");
    const sendEmailAuth = `${apiDomain}/api/${apiVersion}/email-auth`;
    await axiosInstance
      .post(sendEmailAuth, data)
      .then((res) => {
        if (res.status === 204) {
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

  const onSubmitResetPasswordMail = async (data) => {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  return (
    <form
      onSubmit={handleSubmit(
        emailFormName === "emailAuth"
          ? onSubmitEmailAuth
          : onSubmitResetPasswordMail
      )}
    >
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
        <h3>Renvoyer un mail d'authentification</h3>
      </div>
      <div className="input input-signIn-signUp">
        <label htmlFor="email">Email *</label>
        <div className="input-block">
          <span>
            <FontAwesomeIcon icon="at" />
          </span>
          <input
            name="email"
            type="text"
            id="email"
            placeholder="Email"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Adresse mail invalide",
              },
            })}
          />
        </div>
        {errors.email && (
          <span className="error-message-form">Ce champ est requis</span>
        )}
      </div>

      <ActionInsideButtonSubmit
        buttonTxt={"Envoyer"}
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
}

export default EmailAuthForm;
