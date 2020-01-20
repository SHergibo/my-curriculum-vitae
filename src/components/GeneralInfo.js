import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt, faPlus, faRoad, faAt, faHome, faEnvelopeOpenText, faCity, faBirthdayCake, faCheck, faCar, faEdit } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import { apiDomain, apiVersion } from './../apiConfig/ApiConfig';
import { CSSTransition } from 'react-transition-group';

function GeneralInfo() {
  const [success, setSuccess] = useState(false);
  const [addBtn, setAddBtn] = useState(true);
  const [editbtn, setEditBtn] = useState(false);
  const onSubmit = async (data) => {
    // const registerEndPoint = `${apiDomain}/api/${apiVersion}/mail`;
    // await Axios.post(registerEndPoint, data)
    //   .then((response) => {
    //     if (response.status === 200) {
    //       let spanSuccess = document.getElementsByClassName('success-message')[0];
    //       spanSuccess.style.opacity = 1;
    //       setSuccess(true);
    //       setTimeout(() => {
    //         spanSuccess.style.opacity = 0;
    //       }, 3000);
    //       setTimeout(() => {
    //         setSuccess(false);
    //       }, 3500);
    //     }
    //   })
    //   .catch(err => {
    //     console.log("err", err);
    //   });
  };

  const { register, handleSubmit, errors } = useForm({
    mode: "onChange"
  });

  return (
    <div id="infos" className="wrapper info-section">
      <div className="title-right">
        Infos générales
      </div>
      <div className="info-container">
        <div className="title-container">
          <h2>Infos générales</h2>
          <button title="Éditer" onClick={()=> setEditBtn(true)}><FontAwesomeIcon icon={faEdit} /></button>
          <button title="Éditer" onClick={()=> setEditBtn(false)}><FontAwesomeIcon icon={faEdit} /></button>
          
        </div>
        <CSSTransition
          in={editbtn}
          timeout={300}
          classNames="alert"
          unmountOnExit
          onEnter={() => setAddBtn(false)}
          onExited={() => setAddBtn(true)}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
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
                  <input name="phone" type="text" id="phone" placeholder="N° de téléphone" ref={register({ required: true })} />
                </div>
                {errors.phone && <span className="error-message">Ce champ est requis</span>}
              </div>
            </div>
            <div className="input-container">
              <div className="input">
                <label htmlFor="street">Rue *</label>
                <div>
                  <span><FontAwesomeIcon icon={faRoad} /></span>
                  <input name="street" type="text" id="street" placeholder="Rue" ref={register({ required: true })} />
                </div>
                {errors.street && <span className="error-message">Ce champ est requis</span>}
              </div>
              <div className="input">
                <label htmlFor="number">Numéro *</label>
                <div>
                  <span><FontAwesomeIcon icon={faHome} /></span>
                  <input name="number" type="text" id="number" placeholder="Numéro" ref={register({ required: true })} />
                </div>
                {errors.number && <span className="error-message">Ce champ est requis</span>}
              </div>
            </div>
            <div className="input-container">
              <div className="input">
                <label htmlFor="zip">Code postal *</label>
                <div>
                  <span><FontAwesomeIcon icon={faEnvelopeOpenText} /></span>
                  <input name="zip" type="text" id="zip" placeholder="Code postal" ref={register({ required: true })} />
                </div>
                {errors.zip && <span className="error-message">Ce champ est requis</span>}
              </div>
              <div className="input">
                <label htmlFor="city">Ville *</label>
                <div>
                  <span><FontAwesomeIcon icon={faCity} /></span>
                  <input name="city" type="text" id="city" placeholder="Ville" ref={register({ required: true })} />
                </div>
                {errors.city && <span className="error-message">Ce champ est requis</span>}
              </div>
            </div>
            <div className="input-container">
              <div className="input">
                <label htmlFor="birthdate">Date de naissance *</label>
                <div>
                  <span><FontAwesomeIcon icon={faBirthdayCake} /></span>
                  <input name="birthdate" type="date" id="birthdate" placeholder="Date de naissance" ref={register({ required: true })} />
                </div>
                {errors.birthdate && <span className="error-message">Ce champ est requis</span>}
              </div>
            </div>
            <div className="input-container">
              <div className="input">
                <label htmlFor="driverLicence">Permis de conduire *</label>
                <div>
                  <span><FontAwesomeIcon icon={faCar} /></span>
                  <input name="driverLicence" type="text" id="driverLicence" placeholder="Permis de conduire" ref={register({ required: true })} />
                </div>
                {errors.driverLicence && <span className="error-message">Ce champ est requis</span>}
              </div>
            </div>

            <div className="btn-container">
              <button className="submit-contact" type="submit">
                Ajouter
                <FontAwesomeIcon icon={faPlus} />
              </button>
              <span className="success-message">
                {success && <span ><FontAwesomeIcon icon={faCheck} /></span>}
              </span>
            </div>
          </form>
        </CSSTransition>
      </div>
    </div>
  )
}

export default GeneralInfo;