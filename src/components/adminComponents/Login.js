import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginIn } from "../../utils/Auth";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HomeSection from "../frontComponents/HomeSection";

function Login() {
  const [errorMessage, setErrorMessage] = useState(false);
  let navigate = useNavigate();

  const onSubmit = async (data) => {
    let responseLogin = await loginIn(data);
    if (responseLogin !== 401) {
      navigate("/admin");
    } else {
      setErrorMessage(true);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const div = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
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
      </div>
      <div className="btn-container">
        <button className="submit-login" type="submit">
          Connection
        </button>
      </div>
      {errorMessage && (
        <span className="error-message-form">
          Adresse mail ou mot de passe invalide !
        </span>
      )}
    </form>
  );

  return <HomeSection welcome="Connection" name="Bienvenue" div={div} />;
}

export default Login;
