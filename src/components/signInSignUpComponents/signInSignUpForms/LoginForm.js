import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginIn } from "../../../utils/Auth";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LoginForm() {
  const [error, setError] = useState({});
  let navigate = useNavigate();

  const onSubmitLogin = async (data) => {
    let responseLogin = await loginIn(data);
    if (responseLogin.statusCode === 200) {
      navigate("/admin");
    } else {
      setError(responseLogin);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  return (
    <form onSubmit={handleSubmit(onSubmitLogin)}>
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
        <button className="submit-signIn-signUp" type="submit">
          Connexion
        </button>
      </div>
      <div className="error-container-interaction">
        {error.message && (
          <span className="error-message-form">{error.message}</span>
        )}
        {error.errorType !== "emailAuth" && (
          <button
            type="button"
            onClick={() => {
              navigate("/request-reset-password");
            }}
          >
            Mot de passe oublié?
          </button>
        )}
        {error.errorType === "emailAuth" && (
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
        )}
      </div>
    </form>
  );
}

export default LoginForm;
