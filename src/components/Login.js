import React from 'react';
import { withRouter } from "react-router";
import { loginIn } from './../utils/Auth';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faAt } from '@fortawesome/free-solid-svg-icons';
import HomeSection from "./HomeSection";
import PropTypes from 'prop-types';

function Login({ history }) {

  const onSubmit = async (data) => {
    let responseLogin = await loginIn(data);
    if (!responseLogin) {
      history.push("/admin");
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
                      <span><FontAwesomeIcon icon={faAt} /></span>
                      <input name="email" type="text" id="email" placeholder="Email" ref={register({ required: true })} />
                    </div>
                    {errors.email && <span className="error-message">Ce champ est requis</span>}
                  </div>
                  <div className="input input-login">
                    <label htmlFor="lastname">Mot de passe *</label>
                    <div className="input-block">
                      <span><FontAwesomeIcon icon={faKey} /></span>
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
              </form>;

  return (
    <HomeSection welcome="Connection" name="Bienvenue" div={div} />
  )
}


Login.propTypes = {
  history: PropTypes.object,
}


export default withRouter(Login)

