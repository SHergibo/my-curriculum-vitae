import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMobileAlt, faMapMarkerAlt, faUser, faAt, faPaperPlane, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import Axios from 'axios';
import { apiDomain, apiVersion } from './../apiConfig/ApiConfig';

function Contact() {
  let [success, setSuccess] = useState(false);
  const onSubmit = async (data) => {
    const registerEndPoint = `${apiDomain}/api/${apiVersion}/mail`;
    await Axios.post(registerEndPoint, data)
      .then((response) => {
        if (response.status === 200) {
          let spanSuccess = document.getElementsByClassName('success-message')[0];
          spanSuccess.style.opacity = 1;
          setSuccess(true);
          setTimeout(() => {
            spanSuccess.style.opacity = 0;
          }, 3000);
          setTimeout(() => {
            setSuccess(false);
          }, 3500);
        }
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
        <div className="contact-title">Contact</div>
        <div className="contact-form">
          <h2>Entrer en contact</h2>
          <p>N'hésitez pas à me contacter</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-container">
              <div className="input">
                <label htmlFor="firstname">Prénom *</label>
                <div>
                  <span><FontAwesomeIcon icon={faUser} /></span>
                  <input name="firstname" type="text" id="firstname" placeholder="Votre prénom ici..." ref={register({ required: true })} />
                </div>
                {errors.firstname && <span className="error-message">Ce champ est requis</span>}
              </div>
              <div className="input">
                <label htmlFor="lastname">Nom *</label>
                <div>
                  <span><FontAwesomeIcon icon={faUser} /></span>
                  <input name="lastname" type="text" id="lastname" placeholder="Votre nom ici..." ref={register({ required: true })} />
                </div>
                {errors.lastname && <span className="error-message">Ce champ est requis</span>}
              </div>
            </div>
            <div className="input-container">
              <div className="input">
                <label htmlFor="email">Email *</label>
                <div>
                  <span><FontAwesomeIcon icon={faAt} /></span>
                  <input name="email" type="text" id="email" placeholder="Votre adresse mail ici..." ref={register({ required: true })} />
                </div>
                {errors.email && <span className="error-message">Ce champ est requis</span>}
              </div>
              <div className="input">
                <label htmlFor="phone">Téléphone *</label>
                <div>
                  <span><FontAwesomeIcon icon={faMobileAlt} /></span>
                  <input name="phone" type="text" id="phone" placeholder="Votre n° de téléphone ici..." ref={register({ required: true })} />
                </div>
                {errors.phone && <span className="error-message">Ce champ est requis</span>}
              </div>
            </div>
            <div className="input-container">
              <div className="input">
                <label htmlFor="subject">Sujet *</label>
                <div>
                  <span><FontAwesomeIcon icon={faEnvelope} /></span>
                  <input name="subject" type="text" id="subject" placeholder="Le sujet du message ici..." ref={register({ required: true })} />
                </div>
                {errors.subject && <span className="error-message">Ce champ est requis</span>}
              </div>
            </div>
            <div className="text-area">
              <label htmlFor="message">Message*</label>
              <div>
                <textarea name="message" id="message" placeholder="Votre message ici..." ref={register({ required: true })} />
              </div>
              {errors.message && <span className="error-message">Ce champ est requis</span>}
            </div>
            <div className="btn-container">
              <button className="submit-contact" type="submit">
                Envoyer maintenant
              <FontAwesomeIcon icon={faPaperPlane} />
              </button>
              <span className="success-message">
                {success && <span ><FontAwesomeIcon icon={faCheck} /></span>}
              </span>
            </div>
          </form>
        </div>
        <div className="contact-info">
          <div className="container-img-contact">
            <img src="./Hergibo_Sacha.jpg" alt="Hergibo Sacha" />
          </div>
          <ul>
            <li><span><FontAwesomeIcon icon={faEnvelope} /></span> sachahergibo@gmail.com</li>
            <li><span><FontAwesomeIcon icon={faMobileAlt} /></span> +32/498643049</li>
            <li>
              <span><FontAwesomeIcon icon={faMapMarkerAlt} /></span>
              <div>
                <div> Route de Velaines, 24A</div>
                <div>7543 Mourcourt</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Contact;