import React from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { apiDomain, apiVersion } from "../../../apiConfig/ApiConfig";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function EmailAuthForm({ setSwitchForm, emailFormNameState }) {
  const { emailFormName, setEmailFormName } = emailFormNameState;

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
          onClick={() => {
            setSwitchForm(false);
            setEmailFormName("");
            reset();
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
      <div className="btn-container">
        <button className="submit-login" type="submit">
          <span>Envoyer</span> <FontAwesomeIcon icon="envelope" />
        </button>
      </div>
    </form>
  );
}

export default EmailAuthForm;
