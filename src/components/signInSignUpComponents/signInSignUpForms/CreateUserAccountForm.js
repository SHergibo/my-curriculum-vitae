import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { apiDomain, apiVersion } from "../../../apiConfig/ApiConfig";
import { useForm } from "react-hook-form";
import ActionInsideButtonSubmit from "../../ActionInsideButtonSubmit";
import { checkSuccess, checkErrors } from "../../../utils/checkSuccess";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CreateUserAccountForm() {
  let navigate = useNavigate();
  const loadingRef = useRef(null);
  const [loader, setLoader] = useState(false);
  const successSpanRef = useRef(null);
  const [spanSuccess, setSpanSuccess] = useState(false);
  const errorSpanRef = useRef(null);
  const [spanError, setSpanError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccesMessage] = useState("");

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

  const onSubmitCreateUserAccount = async (data) => {
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
    setSuccesMessage("");
    const createUserAccountRoute = `${apiDomain}/api/${apiVersion}/users`;
    await axiosInstance
      .post(createUserAccountRoute, data)
      .then((response) => {
        if (response.status === 204) {
          reset();
          setSuccesMessage(
            "Votre compte a bien été créée, un mail d'authentification a été envoyé sur votre boîte mail, vous devez authentifier votre compte avant de pouvoir vous connectez !"
          );
          checkSuccess(
            setTimeoutLoader,
            setLoader,
            setTimeoutSuccess,
            setSpanSuccess
          );
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setErrorMessage(error.response.data.output.payload.message);
        } else {
          setErrorMessage(
            "Une erreur est survenue, veuillez réessayer plus tard !"
          );
        }
        checkErrors(setTimeoutLoader, setLoader, setTimeoutError, setSpanError);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitCreateUserAccount)}>
      <div className="title-email-form-container">
        <h3>Création d'un nouveau compte</h3>
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
        buttonTxt={"Créer vote compte"}
        icon={"user"}
        loadingRef={loadingRef}
        loader={loader}
        successSpanRef={successSpanRef}
        spanSuccess={spanSuccess}
        errorSpanRef={errorSpanRef}
        spanError={spanError}
      />
      <div className="error-container-interaction">
        {errorMessage && !loader && (
          <span className="error-message-signIn-signUp">{errorMessage}</span>
        )}
        {successMessage && !loader && (
          <span className="success-message-signIn-signUp">
            {successMessage}
          </span>
        )}
        <div>
          <button
            type="button"
            onClick={() => {
              navigate("/send-back-email-auth");
            }}
          >
            Renvoyer un mail d'authentification
          </button>
        </div>
      </div>
    </form>
  );
}

export default CreateUserAccountForm;
