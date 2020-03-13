import React from "react";
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faLink, faImages, faInfoCircle, faFileSignature, faEdit } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

function FormProject({ handleFunction, setId, formType, value, success }) {
  const { register, handleSubmit, errors } = useForm({
    mode: "onChange"
  });

  let titleForm = "Ajout";
  let button = "Ajouter";

  if (formType === "edit") {
    titleForm = "Édition";
    button = "Éditer";
  }

  const form = <div>
    <div className="form-project-admin">
      <div className="project-from-container-first">
        <div className="input-container">
          <div className="input">
            <label htmlFor="projectName">Nom du projet *</label>
            <div className="input-block">
              <span><FontAwesomeIcon icon={faFileSignature} /></span>
              {formType === "add" && <input name="projectName" type="text" id="projectName" placeholder="Nom du projet" ref={register({ required: true })} />}
              {formType === "edit" && <input name="projectName" type="text" id="projectName" placeholder="Nom du projet" defaultValue={value.projectName} ref={register({ required: true })} />}
            </div>
            {errors.projectName && <span className="error-message">Ce champ est requis</span>}
          </div>
        </div>
        <div className="input-container">
          <div className="input">
            <label htmlFor="projectUrl">Lien du projet *</label>
            <div className="input-block">
              <span><FontAwesomeIcon icon={faLink} /></span>
              {formType === "add" && <input name="projectUrl" type="text" id="projectUrl" placeholder="Lien du projet" ref={register({ required: true })} />}
              {formType === "edit" && <input name="projectUrl" type="text" id="projectUrl" placeholder="Lien du projet" defaultValue={value.url} ref={register({ required: true })} />}
            </div>
            {errors.projectUrl && <span className="error-message">Ce champ est requis</span>}
          </div>
        </div>
        <div>Used Technology</div>
      </div>
      <div className="project-from-container-last">
        <div className="input-container">
          <div className="input">
            <label htmlFor="projectImg">Image du projet *</label>
            <div className="input-block">
              <span><FontAwesomeIcon icon={faImages} /></span>
              {formType === "add" && <input name="projectImg" type="text" id="projectImg" placeholder="Image du projet" ref={register({ required: true })} />}
              {formType === "edit" && <input name="projectImg" type="text" id="projectImg" placeholder="Image du projet" defaultValue={value.img} ref={register({ required: true })} />}
            </div>
            {errors.projectImg && <span className="error-message">Une image est requise</span>}
          </div>
        </div>
        <div className="input-container">
          <div className="input">
            <label htmlFor="projectAltImg">Description de la l'image du projet *</label>
            <div className="input-block">
              <span><FontAwesomeIcon icon={faInfoCircle} /></span>
              {formType === "add" && <input name="projectAltImg" type="text" id="projectAltImg" placeholder="Description de l'image du projet" ref={register({ required: true })} />}
              {formType === "edit" && <input name="projectAltImg" type="text" id="projectAltImg" placeholder="Description de l'image du projet" defaultValue={value.altImg} ref={register({ required: true })} />}
            </div>
            {errors.projectAltImg && <span className="error-message">Une description pour votre image est requise</span>}
          </div>
        </div>
      </div>
    </div>

    <div className="text-area">
      <label htmlFor="descriptionProject">Description du projet*</label>
      <div className="input-block">
        {formType === "add" && <textarea name="descriptionProject" id="descriptionProject" placeholder="Votre description ici..." ref={register({ required: true })} />}
        {formType === "edit" && <textarea name="descriptionProject" id="descriptionProject" placeholder="Votre description ici..." defaultValue={value.description} ref={register({ required: true })} />}
      </div>
      {errors.descriptionProject && <span className="error-message">Ce champ est requis</span>}
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
        {success && <span ><FontAwesomeIcon icon={faCheck} /></span>}
      </span>
    </div>
  </div>;

  return (
    <div>
      <h3>{titleForm}</h3>
      {formType === "add" &&
        <form onSubmit={handleSubmit(handleFunction)}>
          {form}
        </form>
      }
      {formType === "edit" &&
        <form onSubmit={handleSubmit(handleFunction, setId(value._id))}>
          {form}
        </form>
      }
    </div>
  );
}

FormProject.propTypes = {
  handleFunction: PropTypes.func.isRequired,
  formType: PropTypes.string.isRequired,
  value: PropTypes.object,
  success: PropTypes.bool.isRequired,
}

export default FormProject;