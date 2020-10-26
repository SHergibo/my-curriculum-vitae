import React, { useEffect, useState} from "react";
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import DatePicker, { registerLocale } from "react-datepicker";
import { parseISO } from 'date-fns';
import { fr } from 'date-fns/locale'
import "react-datepicker/dist/react-datepicker.css";
registerLocale("fr", fr);


function FormGeneralInfo({onSubmitAdd, onSubmitEdit, value, successMessage}) {
  const [dateBirthday, setDateBirthday] = useState(null);
  const [titleForm, setTitleForm] = useState('Ajout');
  const [button, setButton] = useState('Ajouter');
  const { register, handleSubmit, errors, setValue } = useForm({
    mode: "onChange"
  });

  useEffect(() => {
    if(value){
      setTitleForm('Édition');
      setButton('Éditer');
    }
  }, [value]);


  useEffect(() => {
    register({ name: "dateBirthday" }, {required : true});
    if(value && value.isoDate){
      setDateBirthday(parseISO(value.isoDate));
      setValue("dateBirthday", parseISO(value.isoDate));
    }else{
      setDateBirthday(null);
      setValue("dateBirthday", null);
    }
  }, [register, setValue, value]);

  const formGeneralInfo = <>
    <div className="input-container">
      <div className="input">
        <label htmlFor="firstname">Prénom *</label>
        <div className="input-block">
          <span><FontAwesomeIcon icon="user" /></span>
          {!value && <input name="firstname" type="text" id="firstname" placeholder="Prénom" ref={register({ required: true })} />}
          {value && <input name="firstname" type="text" id="firstname" placeholder="Prénom" defaultValue={value.firstname} ref={register({ required: true })} />}
        </div>
        {errors.firstname && <span className="error-message">Ce champ est requis</span>}
      </div>
      <div className="input">
        <label htmlFor="lastname">Nom de famille *</label>
        <div className="input-block">
          <span><FontAwesomeIcon icon="user" /></span>
          {!value && <input name="lastname" type="text" id="lastname" placeholder="Nom de famille" ref={register({ required: true })} />}
          {value && <input name="lastname" type="text" id="lastname" placeholder="Nom de famille" defaultValue={value.lastname} ref={register({ required: true })} />}
        </div>
        {errors.lastname && <span className="error-message">Ce champ est requis</span>}
      </div>
    </div>
    <div className="input-container">
      <div className="input">
        <label htmlFor="email">Email *</label>
        <div className="input-block">
          <span><FontAwesomeIcon icon="at" /></span>
          {!value && <input name="email" id="email" placeholder="Adresse mail" ref={register({ 
            required: 'Ce champ est requis',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Adresse mail invalide"
            }
            })} />}
          {value && <input name="email" id="email" placeholder="Adresse mail" defaultValue={value.email} ref={register({ 
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
          {!value && <input name="phone" type="text" id="phone" placeholder="N° de téléphone" ref={register({ required: true })} />}
          {value && <input name="phone" type="text" id="phone" placeholder="N° de téléphone" defaultValue={value.phone} ref={register({ required: true })} />}
        </div>
        {errors.phone && <span className="error-message">Ce champ est requis</span>}
      </div>
    </div>
    <div className="input-container">
      <div className="input">
        <label htmlFor="street">Rue *</label>
        <div className="input-block">
          <span><FontAwesomeIcon icon="road" /></span>
          {!value && <input name="street" type="text" id="street" placeholder="Rue" ref={register({ required: true })} />}
          {value && <input name="street" type="text" id="street" placeholder="Rue" defaultValue={value.address.street} ref={register({ required: true })} />}
        </div>
        {errors.street && <span className="error-message">Ce champ est requis</span>}
      </div>
      <div className="input">
        <label htmlFor="number">Numéro *</label>
        <div className="input-block">
          <span><FontAwesomeIcon icon="home" /></span>
          {!value && <input name="number" type="text" id="number" placeholder="Numéro" ref={register({ required: true })} />}
          {value && <input name="number" type="text" id="number" placeholder="Numéro" defaultValue={value.address.number} ref={register({ required: true })} />}
        </div>
        {errors.number && <span className="error-message">Ce champ est requis</span>}
      </div>
    </div>
    <div className="input-container">
      <div className="input">
        <label htmlFor="zip">Code postal *</label>
        <div className="input-block">
          <span><FontAwesomeIcon icon="envelope-open-text" /></span>
          {!value && <input name="zip" type="text" id="zip" placeholder="Code postal" ref={register({ required: true })} />}
          {value && <input name="zip" type="text" id="zip" placeholder="Code postal" defaultValue={value.address.zip} ref={register({ required: true })} />}
        </div>
        {errors.zip && <span className="error-message">Ce champ est requis</span>}
      </div>
      <div className="input">
        <label htmlFor="city">Ville *</label>
        <div className="input-block">
          <span><FontAwesomeIcon icon="city" /></span>
          {!value && <input name="city" type="text" id="city" placeholder="Ville" ref={register({ required: true })} />}
          {value && <input name="city" type="text" id="city" placeholder="Ville" defaultValue={value.address.city} ref={register({ required: true })} />}
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
          {!value && <input name="driverLicence" type="text" id="driverLicence" placeholder="Permis de conduire" ref={register({ required: true })} />}
          {value && <input name="driverLicence" type="text" id="driverLicence" placeholder="Permis de conduire" defaultValue={value.licence} ref={register({ required: true })} />}
        </div>
        {errors.driverLicence && <span className="error-message">Ce champ est requis</span>}
      </div>
    </div>
    <div className="text-area">
      <label htmlFor="description">Description*</label>
      <div className="input-block">
        {!value && <textarea name="description" id="description" placeholder="Votre description ici..." ref={register({ required: true })} />}
        {value && <textarea name="description" id="description" placeholder="Votre description ici..." defaultValue={value.description} ref={register({ required: true })} />}
      </div>
      {errors.description && <span className="error-message">Ce champ est requis</span>}
    </div>

    <div className="btn-container">
      <button className="submit-contact" type="submit">
        {button}
        {!value && 
          <FontAwesomeIcon icon="plus" />
        }
        {value && 
          <FontAwesomeIcon icon="edit" />
        }
      </button>
      <span ref={successMessage} className="success-message"><FontAwesomeIcon icon="check" /></span>
    </div>
  </>;


  return (
    <div className="form-container">
      <h3>{titleForm}</h3>
      <form onSubmit={(e) => {
        if(value){
          handleSubmit(onSubmitEdit)(e);
        }else if(!value){
          handleSubmit(onSubmitAdd)(e);
        }
      }}>
        {formGeneralInfo}
      </form>
    </div>
  );
}

FormGeneralInfo.propTypes = {
  onSubmitAdd: PropTypes.func.isRequired,
  onSubmitEdit: PropTypes.func.isRequired,
  value: PropTypes.object,
  successMessage: PropTypes.object.isRequired
}

export default FormGeneralInfo;