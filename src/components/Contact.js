import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import Axios from 'axios';
import { apiDomain, apiVersion } from './../apiConfig/ApiConfig';
import checkSuccess from './../utils/checkSuccess';
import PropTypes from 'prop-types';

function Contact({ generalInfo }) {
  const successMessage = useRef(null);
  const onSubmit = async (data, e) => {
    const registerEndPoint = `${apiDomain}/api/${apiVersion}/mail`;
    await Axios.post(registerEndPoint, data)
      .then((response) => {
        checkSuccess(response.status, successMessage);
        e.target.reset();
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  const { register, handleSubmit, errors } = useForm({
    mode: "onChange"
  });
  
  return (
    <div className="contact-container">
      <div id="contact" className="wrapper contact">
        <div className="title-left">Contact</div>
        <div className="contact-form">
          <h2>Entrer en contact</h2>
          <p>N'hésitez pas à me contacter</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-container">
              <div className="input">
                <label htmlFor="firstname">Prénom *</label>
                <div className="input-block">
                  <span><FontAwesomeIcon icon="user" /></span>
                  <input name="firstname" type="text" id="firstname" placeholder="Votre prénom ici..." ref={register({ required: true })} />
                </div>
                {errors.firstname && <span className="error-message-form">Ce champ est requis</span>}
              </div>
              <div className="input">
                <label htmlFor="lastname">Nom *</label>
                <div className="input-block">
                  <span><FontAwesomeIcon icon="user" /></span>
                  <input name="lastname" type="text" id="lastname" placeholder="Votre nom ici..." ref={register({ required: true })} />
                </div>
                {errors.lastname && <span className="error-message-form">Ce champ est requis</span>}
              </div>
            </div>
            <div className="input-container">
              <div className="input">
                <label htmlFor="email">Email *</label>
                <div className="input-block">
                  <span><FontAwesomeIcon icon="at" /></span>
                  <input name="email" id="email" placeholder="Votre adresse mail ici..." ref={register({ 
                  required: 'Ce champ est requis',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Adresse mail invalide"
                  }
                  })} />
                </div>
                <span className="error-message-form">{errors.email && errors.email.message}</span>
              </div>
              <div className="input">
                <label htmlFor="phone">Téléphone *</label>
                <div className="input-block">
                  <span><FontAwesomeIcon icon="mobile-alt" /></span>
                  <input name="phone" type="text" id="phone" placeholder="Votre n° de téléphone ici..." ref={register({ required: true })} />
                </div>
                {errors.phone && <span className="error-message-form">Ce champ est requis</span>}
              </div>
            </div>
            <div className="input-container">
              <div className="input">
                <label htmlFor="subject">Sujet *</label>
                <div className="input-block">
                  <span><FontAwesomeIcon icon="envelope" /></span>
                  <input name="subject" type="text" id="subject" placeholder="Le sujet du message ici..." ref={register({ required: true })} />
                </div>
                {errors.subject && <span className="error-message-form">Ce champ est requis</span>}
              </div>
            </div>
            <div className="text-area">
              <label htmlFor="message">Message*</label>
              <div className="input-block">
                <textarea name="message" id="message" placeholder="Votre message ici..." ref={register({ required: true })} />
              </div>
              {errors.message && <span className="error-message-form">Ce champ est requis</span>}
            </div>
            <div className="btn-container">
              <button className="submit-contact" type="submit">
                Envoyer maintenant
              <FontAwesomeIcon icon="paper-plane" />
              </button>
              <span ref={successMessage} className="success-message"><FontAwesomeIcon icon="check" /></span>
            </div>
          </form>
        </div>
        <div className="contact-info">
          <div className="container-img-contact">
            <img src="./Hergibo_Sacha.jpg" alt="Hergibo Sacha" />
          </div>
          <ul>
            <li><span><FontAwesomeIcon icon="envelope" /></span> {generalInfo.email}</li>
            <li><span><FontAwesomeIcon icon="mobile-alt" /></span> {generalInfo.phone}</li>
            <li>
              <span><FontAwesomeIcon icon="map-marker-alt" /></span>
              <div>
                <div> {generalInfo.address.street}, {generalInfo.address.number}</div>
                <div>{generalInfo.address.zip} {generalInfo.address.city}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

Contact.propTypes = {
  generalInfo: PropTypes.object.isRequired,
}

export default Contact;