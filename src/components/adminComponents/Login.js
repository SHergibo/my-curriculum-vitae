import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { apiDomain, apiVersion } from "../../apiConfig/ApiConfig";
import { useNavigate } from "react-router-dom";
import { loginIn } from "../../utils/Auth";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HomeSection from "../frontComponents/HomeSection";

function Login() {
  const [error, setError] = useState({});
  const [switchForm, setSwitchForm] = useState(false);
  const [emailFormName, setEmailFormName] = useState("");
  let navigate = useNavigate();

  const onSubmitLogin = async (data) => {
    let responseLogin = await loginIn(data);
    if (responseLogin.statusCode === 200) {
      navigate("/admin");
    } else {
      setError(responseLogin);
    }
  };

  const onSubmitEmailAuth = async (data) => {
    const sendEmailAuth = `${apiDomain}/api/${apiVersion}/email-auth`;
    await axiosInstance.post(sendEmailAuth, data);
  };

  const onSubmitResetPasswordMail = async (data) => {};

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    reset: resetEmail,
    formState: { errors: errorsEmail },
  } = useForm({
    mode: "onChange",
  });

  const formLogin = (
    <form onSubmit={handleSubmit(onSubmitLogin)}>
      <div className="input input-login">
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
      <div className="input input-login">
        <label htmlFor="lastname">Mot de passe *</label>
        <div className="input-block">
          <span>
            <FontAwesomeIcon icon="key" />
          </span>
          <input
            name="password"
            type="password"
            id="password"
            placeholder="Mot de passe"
            {...register("password", { required: true })}
          />
        </div>
        {errors.password && (
          <span className="error-message-form">Ce champ est requis</span>
        )}
      </div>
      <div className="btn-container">
        <button className="submit-login" type="submit">
          Connection
        </button>
      </div>
      {error.message && (
        <div className="error-container-interaction">
          <span className="error-message-form">{error.message}</span>
          {error.errorType === "emailAuth" && (
            <button
              onClick={() => {
                setSwitchForm(true);
                setEmailFormName("emailAuth");
                reset();
              }}
            >
              Renvoyer un mail de confirmation
            </button>
          )}
          {error.errorType === "wrongPassword" && (
            <button
              onClick={() => {
                setSwitchForm(true);
                setEmailFormName("emailAuth");
                reset();
              }}
            >
              Mot de passe oublié?
            </button>
          )}
        </div>
      )}
    </form>
  );

  const formEmail = (
    <form
      onSubmit={handleSubmitEmail(
        emailFormName === "emailAuth"
          ? onSubmitEmailAuth
          : onSubmitResetPasswordMail
      )}
    >
      <div className="title-email-form-container">
        <button
          className="returnLogin"
          title="Retour au formulaire de connexion"
          onClick={() => {
            setSwitchForm(false);
            setEmailFormName("");
            resetEmail();
          }}
        >
          <FontAwesomeIcon icon="chevron-left" />
        </button>
        <h3>Renvoyer un mail de confirmation</h3>
      </div>
      <div className="input input-login">
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
            {...registerEmail("email", {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Adresse mail invalide",
              },
            })}
          />
        </div>
        {errorsEmail.email && (
          <span className="error-message-form">Ce champ est requis</span>
        )}
      </div>
      <div className="btn-container">
        <button className="submit-login" type="submit">
          Envoyer
        </button>
      </div>
    </form>
  );

  return (
    <HomeSection
      welcome="Connection"
      name="Bienvenue"
      div={!switchForm ? formLogin : formEmail}
    />
  );
}

export default Login;
