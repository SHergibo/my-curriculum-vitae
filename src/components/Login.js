import React from 'react';
import { withRouter } from "react-router";
import { loginIn } from './../utils/Auth';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faAt } from '@fortawesome/free-solid-svg-icons';

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

  return (
    <div>
      <h3>Formulaire de connection</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-container">
          <div className="input">
            <label htmlFor="email">Email *</label>
            <div>
              <span><FontAwesomeIcon icon={faAt} /></span>
              <input name="email" type="text" id="email" placeholder="Email" ref={register({ required: true })} />
            </div>
            {errors.email && <span className="error-message">Ce champ est requis</span>}
          </div>
          <div className="input">
            <label htmlFor="lastname">Mot de passe *</label>
            <div>
              <span><FontAwesomeIcon icon={faUser} /></span>
              <input name="password" type="password" id="password" placeholder="Mot de passe" ref={register({ required: true })} />
            </div>
            {errors.password && <span className="error-message">Ce champ est requis</span>}
          </div>
        </div>
        <div className="btn-container">
              <button className="submit-contact" type="submit">
                Connection
              </button>
            </div>
      </form>
    </div>
  )
}

export default withRouter(Login)

