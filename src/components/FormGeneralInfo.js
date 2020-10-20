import React, { useLayoutEffect, useState} from "react";
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import DatePicker, { registerLocale } from "react-datepicker";
import { parseISO } from 'date-fns';
import { fr } from 'date-fns/locale'
import "react-datepicker/dist/react-datepicker.css";
registerLocale("fr", fr);


function FormGeneralInfo({handleFunction, formType, value, successMessage}) {
  const [dateBirthday, setDateBirthday] = useState(null);
  const { register, handleSubmit, errors, setValue } = useForm({
    mode: "onChange"
  });


  useLayoutEffect(() => {
    register({ name: "dateBirthday" }, {required : true});
    if(formType === "edit"){
      setDateBirthday(parseISO(value.birthdate));
      setValue("dateBirthday", parseISO(value.birthdate));
    }
  }, [register, setValue, value, formType]);

  let titleForm = "Ajout";
  let button = "Ajouter";

  if (formType === "edit"){
    titleForm = "Édition";
    button = "Éditer";
  }

  return (
    <div className="form-container">
      <h3>{titleForm}</h3>
      <form onSubmit={handleSubmit(handleFunction)}>
      <div className="input-container">
          <div className="input">
            <label htmlFor="firstname">Prénom *</label>
            <div className="input-block">
              <span><FontAwesomeIcon icon="user" /></span>
              {formType === "add" && <input name="firstname" type="text" id="firstname" placeholder="Prénom" ref={register({ required: true })} />}
              {formType === "edit" && <input name="firstname" type="text" id="firstname" placeholder="Prénom" defaultValue={value.firstname} ref={register({ required: true })} />}
            </div>
            {errors.firstname && <span className="error-message">Ce champ est requis</span>}
          </div>
          <div className="input">
            <label htmlFor="lastname">Nom de famille *</label>
            <div className="input-block">
              <span><FontAwesomeIcon icon="user" /></span>
              {formType === "add" && <input name="lastname" type="text" id="lastname" placeholder="Nom de famille" ref={register({ required: true })} />}
              {formType === "edit" && <input name="lastname" type="text" id="lastname" placeholder="Nom de famille" defaultValue={value.lastname} ref={register({ required: true })} />}
            </div>
            {errors.lastname && <span className="error-message">Ce champ est requis</span>}
          </div>
        </div>
        <div className="input-container">
          <div className="input">
            <label htmlFor="email">Email *</label>
            <div className="input-block">
              <span><FontAwesomeIcon icon="at" /></span>
              {formType === "add" && <input name="email" id="email" placeholder="Adresse mail" ref={register({ 
                required: 'Ce champ est requis',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Adresse mail invalide"
                }
                })} />}
              {formType === "edit" && <input name="email" id="email" placeholder="Adresse mail" defaultValue={value.email} ref={register({ 
                required: 'Ce champ est requis',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Adresse mail invalide"
                }
                })} />}
            </div>
            <span className="error-message">{errors.email && errors.email.message}</span>
          </div>
          <div className="input">
            <label htmlFor="phone">Téléphone *</label>
            <div className="input-block">
              <span><FontAwesomeIcon icon="mobile-alt" /></span>
              {formType === "add" && <input name="phone" type="text" id="phone" placeholder="N° de téléphone" ref={register({ required: true })} />}
              {formType === "edit" && <input name="phone" type="text" id="phone" placeholder="N° de téléphone" defaultValue={value.phone} ref={register({ required: true })} />}
            </div>
            {errors.phone && <span className="error-message">Ce champ est requis</span>}
          </div>
        </div>
        <div className="input-container">
          <div className="input">
            <label htmlFor="street">Rue *</label>
            <div className="input-block">
              <span><FontAwesomeIcon icon="road" /></span>
              {formType === "add" && <input name="street" type="text" id="street" placeholder="Rue" ref={register({ required: true })} />}
              {formType === "edit" && <input name="street" type="text" id="street" placeholder="Rue" defaultValue={value.address.street} ref={register({ required: true })} />}
            </div>
            {errors.street && <span className="error-message">Ce champ est requis</span>}
          </div>
          <div className="input">
            <label htmlFor="number">Numéro *</label>
            <div className="input-block">
              <span><FontAwesomeIcon icon="home" /></span>
              {formType === "add" && <input name="number" type="text" id="number" placeholder="Numéro" ref={register({ required: true })} />}
              {formType === "edit" && <input name="number" type="text" id="number" placeholder="Numéro" defaultValue={value.address.number} ref={register({ required: true })} />}
            </div>
            {errors.number && <span className="error-message">Ce champ est requis</span>}
          </div>
        </div>
        <div className="input-container">
          <div className="input">
            <label htmlFor="zip">Code postal *</label>
            <div className="input-block">
              <span><FontAwesomeIcon icon="envelope-open-text" /></span>
              {formType === "add" && <input name="zip" type="text" id="zip" placeholder="Code postal" ref={register({ required: true })} />}
              {formType === "edit" && <input name="zip" type="text" id="zip" placeholder="Code postal" defaultValue={value.address.zip} ref={register({ required: true })} />}
            </div>
            {errors.zip && <span className="error-message">Ce champ est requis</span>}
          </div>
          <div className="input">
            <label htmlFor="city">Ville *</label>
            <div className="input-block">
              <span><FontAwesomeIcon icon="city" /></span>
              {formType === "add" && <input name="city" type="text" id="city" placeholder="Ville" ref={register({ required: true })} />}
              {formType === "edit" && <input name="city" type="text" id="city" placeholder="Ville" defaultValue={value.address.city} ref={register({ required: true })} />}
            </div>
            {errors.city && <span className="error-message">Ce champ est requis</span>}
          </div>
        </div>
        <div className="input-container">
          <div className="input">
            <label htmlFor="birthDate">Date de naissance *</label>
            <div className="input-block">
              <span><FontAwesomeIcon icon='birthday-cake' /></span>
              <DatePicker
                id="birthDate"
                isClearable
                placeholderText="Date de naissance"
                dateFormat="dd/MM/yyyy"
                locale="fr"
                selected={dateBirthday}
                onChange={val => {
                  setDateBirthday(val); 
                  setValue("dateBirthday", val);
                  }} 
                />
            </div>
            {errors.birthDate && <span className="error-message">Ce champ est requis</span>}
          </div>
          <div className="input">
            <label htmlFor="driverLicence">Permis de conduire *</label>
            <div className="input-block">
              <span><FontAwesomeIcon icon="car" /></span>
              {formType === "add" && <input name="driverLicence" type="text" id="driverLicence" placeholder="Permis de conduire" ref={register({ required: true })} />}
              {formType === "edit" && <input name="driverLicence" type="text" id="driverLicence" placeholder="Permis de conduire" defaultValue={value.licence} ref={register({ required: true })} />}
            </div>
            {errors.driverLicence && <span className="error-message">Ce champ est requis</span>}
          </div>
        </div>
        <div className="text-area">
          <label htmlFor="description">Description*</label>
          <div className="input-block">
            {formType === "add" && <textarea name="description" id="description" placeholder="Votre description ici..." ref={register({ required: true })} />}
            {formType === "edit" && <textarea name="description" id="description" placeholder="Votre description ici..." defaultValue={value.description} ref={register({ required: true })} />}
          </div>
          {errors.description && <span className="error-message">Ce champ est requis</span>}
        </div>

        <div className="btn-container">
          <button className="submit-contact" type="submit">
            {button}
            {formType === "add" && 
              <FontAwesomeIcon icon="plus" />
            }
            {formType === "edit" && 
              <FontAwesomeIcon icon="edit" />
            }
          </button>
          <span ref={successMessage} className="success-message"><FontAwesomeIcon icon="check" /></span>
        </div>
      </form>
    </div>
  );
}

FormGeneralInfo.propTypes = {
  handleFunction: PropTypes.func.isRequired,
  value: PropTypes.object,
  formType: PropTypes.string.isRequired,
  successMessage: PropTypes.object.isRequired
}

export default FormGeneralInfo;