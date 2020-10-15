import React, { useState } from 'react';
import { withRouter } from "react-router";
import { loginIn } from './../utils/Auth';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HomeSection from "./HomeSection";
import PropTypes from 'prop-types';

function Login({ history }) {
  const [errorMessage, setErrorMessage] = useState(false);

  const onSubmit = async (data) => {
    let responseLogin = await loginIn(data);
    if (responseLogin !== 401) {
      history.push("/admin");
    }else{
      setErrorMessage(true);
    }

  };
  const { register, handleSubmit, errors } = useForm({
    mode: "onChange"
  });

  const div = <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <div className="input input-login">
                    <label htmlFor="email">Email *</label>
                    <div className="input-block">
                      <span><FontAwesomeIcon icon="at" /></span>
                      <input name="email" type="text" id="email" placeholder="Email" ref={register({ required: true })} />
                    </div>
                    {errors.email && <span className="error-message">Ce champ est requis</span>}
                  </div>
                  <div className="input input-login">
                    <label htmlFor="lastname">Mot de passe *</label>
                    <div className="input-block">
                      <span><FontAwesomeIcon icon="key" /></span>
                      <input name="password" type="password" id="password" placeholder="Mot de passe" ref={register({ required: true })} />
                    </div>
                    {errors.password && <span className="error-message">Ce champ est requis</span>}
                  </div>
                </div>
                <div className="btn-container">
                  <button className="submit-login" type="submit">
                    Connection
                  </button>
                </div>
                {errorMessage && <span className="error-message">Adresse mail ou mot de passe invalide !</span>}
              </form>;

  return (
    <HomeSection welcome="Connection" name="Bienvenue" div={div} />
  )
}


Login.propTypes = {
  history: PropTypes.object,
}


export default withRouter(Login)

