import React from "react";
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt, faPlus, faRoad, faAt, faHome, faEnvelopeOpenText, faCity, faBirthdayCake, faCheck, faCar, faEdit } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

function FormGeneralInfo({handleFunction, formType, success}) {
  let titleForm = "Ajout";
  let button = "Ajouter";
  let objectInput= {
    "email" : "emailAdd",
    "phone" : "phoneAdd",
    "street" : "streetAdd",
    "number" : "numberAdd",
    "zip" : "zipAdd",
    "city" : "cityAdd",
    "birthdate" : "birthdateAdd",
    "driverLicence" : "driverLicenceAdd",
  };

  if (formType === "edit"){
    titleForm = "Édition";
    button = "Éditer";
    objectInput= {
      "email" : "emailEdit",
      "phone" : "phoneEdit",
      "street" : "streetEdit",
      "number" : "numberEdit",
      "zip" : "zipEdit",
      "city" : "cityEdit",
      "birthdate" : "birthdateEdit",
      "driverLicence" : "driverLicenceEdit",
    };
  }

  const { register, handleSubmit, errors } = useForm({
    mode: "onChange"
  });

  return (
    <div className="form-container">
      <h3>{titleForm}</h3>
      <form onSubmit={handleSubmit(handleFunction)}>
        <div className="input-container">
          <div className="input">
            <label htmlFor={objectInput.email}>Email *</label>
            <div>
              <span><FontAwesomeIcon icon={faAt} /></span>
              <input name={objectInput.email} type="text" id={objectInput.email} placeholder="Adresse mail" ref={register({ required: true })} />
            </div>
            {formType === "add" && <span>{errors.emailAdd && <span className="error-message">Ce champ est requis</span>}</span>}
            {formType === "edit" && <span>{errors.emailEdit && <span className="error-message">Ce champ est requis</span>}</span>}
          </div>
          <div className="input">
            <label htmlFor={objectInput.phone}>Téléphone *</label>
            <div>
              <span><FontAwesomeIcon icon={faMobileAlt} /></span>
              <input name={objectInput.phone} type="text" id={objectInput.phone} placeholder="N° de téléphone" ref={register({ required: true })} />
            </div>
            {formType === "add" && <span>{errors.phoneAdd && <span className="error-message">Ce champ est requis</span>}</span>}
            {formType === "edit" && <span>{errors.phoneEdit && <span className="error-message">Ce champ est requis</span>}</span>}
          </div>
        </div>
        <div className="input-container">
          <div className="input">
            <label htmlFor={objectInput.street}>Rue *</label>
            <div>
              <span><FontAwesomeIcon icon={faRoad} /></span>
              <input name={objectInput.street} type="text" id={objectInput.street} placeholder="Rue" ref={register({ required: true })} />
            </div>
            {formType === "add" && <span>{errors.streetAdd && <span className="error-message">Ce champ est requis</span>}</span>}
            {formType === "edit" && <span>{errors.streetEdit && <span className="error-message">Ce champ est requis</span>}</span>}
          </div>
          <div className="input">
            <label htmlFor={objectInput.number}>Numéro *</label>
            <div>
              <span><FontAwesomeIcon icon={faHome} /></span>
              <input name={objectInput.number} type="text" id={objectInput.number} placeholder="Numéro" ref={register({ required: true })} />
            </div>
            {formType === "add" && <span>{errors.numberAdd && <span className="error-message">Ce champ est requis</span>}</span>}
            {formType === "edit" && <span>{errors.numberEdit && <span className="error-message">Ce champ est requis</span>}</span>}
          </div>
        </div>
        <div className="input-container">
          <div className="input">
            <label htmlFor={objectInput.zip}>Code postal *</label>
            <div>
              <span><FontAwesomeIcon icon={faEnvelopeOpenText} /></span>
              <input name={objectInput.zip} type="text" id={objectInput.zip} placeholder="Code postal" ref={register({ required: true })} />
            </div>
            {formType === "add" && <span>{errors.zipAdd && <span className="error-message">Ce champ est requis</span>}</span>}
            {formType === "edit" && <span>{errors.zipEdit && <span className="error-message">Ce champ est requis</span>}</span>}
          </div>
          <div className="input">
            <label htmlFor={objectInput.city}>Ville *</label>
            <div>
              <span><FontAwesomeIcon icon={faCity} /></span>
              <input name={objectInput.city} type="text" id={objectInput.city} placeholder="Ville" ref={register({ required: true })} />
            </div>
            {formType === "add" && <span>{errors.cityAdd && <span className="error-message">Ce champ est requis</span>}</span>}
            {formType === "edit" && <span>{errors.cityEdit && <span className="error-message">Ce champ est requis</span>}</span>}
          </div>
        </div>
        <div className="input-container">
          <div className="input">
            <label htmlFor={objectInput.birthdate}>Date de naissance *</label>
            <div>
              <span><FontAwesomeIcon icon={faBirthdayCake} /></span>
              <input name={objectInput.birthdate} type="date" id={objectInput.birthdate} placeholder="Date de naissance" ref={register({ required: true })} />
            </div>
            {formType === "add" && <span>{errors.birthdateAdd && <span className="error-message">Ce champ est requis</span>}</span>}
            {formType === "edit" && <span>{errors.birthdateEdit && <span className="error-message">Ce champ est requis</span>}</span>}
          </div>
        </div>
        <div className="input-container">
          <div className="input">
            <label htmlFor={objectInput.driverLicence}>Permis de conduire *</label>
            <div>
              <span><FontAwesomeIcon icon={faCar} /></span>
              <input name={objectInput.driverLicence} type="text" id={objectInput.driverLicence} placeholder="Permis de conduire" ref={register({ required: true })} />
            </div>
            {formType === "add" && <span>{errors.driverLicenceAdd && <span className="error-message">Ce champ est requis</span>}</span>}
            {formType === "edit" && <span>{errors.driverLicenceEdit && <span className="error-message">Ce champ est requis</span>}</span>}
          </div>
        </div>

        <div className="btn-container">
          <button className="submit-contact" type="submit">
            {button}
            {formType === "add" && 
              <FontAwesomeIcon icon={faPlus} />
            }
            {formType === "edit" && 
              <FontAwesomeIcon icon={faEdit} />
            }
          </button>
          <span className="success-message">
            {{success} && <span ><FontAwesomeIcon icon={faCheck} /></span>}
          </span>
        </div>
      </form>
    </div>
  );
}

FormGeneralInfo.propTypes = {
  handleFunction: PropTypes.func.isRequired,
  formType: PropTypes.string.isRequired,
  success: PropTypes.bool.isRequired,
}

export default FormGeneralInfo;