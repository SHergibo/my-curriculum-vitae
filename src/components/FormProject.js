import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { apiDomain, apiVersion } from './../apiConfig/ApiConfig';
import PropTypes from 'prop-types';

function FormProject({ handleFunction, setIdItem, value, successMessage, imgProjectState, }) {
  const { imgProjectName, setImgProjectName } = imgProjectState;
  const [titleForm, setTitleForm] = useState('Ajout');
  const [button, setButton] = useState('Ajouter');
  const [imgEdit, setImgEdit] = useState(false);
  const [errorMessageImg, setErrorMessageImg] = useState(false);

  useEffect(() => {
    if(value){
      setImgEdit(true);
      setIdItem(value._id);
      setTitleForm('Édition');
      setButton('Éditer');
    }
  }, [value, setIdItem]);

  const { register, handleSubmit, errors } = useForm();

  const switchToInput = () =>{
    setImgEdit(false);
  };

  const onAddFile = (e) =>{
    const file = e.target.files[0];
    if(e.target.files.length === 1){
      if(file.type === "image/png" || file.type === "image/jpeg"){
        setImgProjectName(e.target.files[0].name);
        setErrorMessageImg(false);
      }else{
        setImgProjectName("Image du projet");
        setErrorMessageImg(true);
      }
    }else{
      setImgProjectName("Image du projet");
    }
  };

  const form = <>
                <div className="form-project-admin">
                  <div className="project-form-container-first">
                    <div className="input-container">
                      <div className="input">
                        <label htmlFor="projectName">Nom du projet *</label>
                        <div className="input-block">
                          <span><FontAwesomeIcon icon="file-signature" /></span>
                          {!value && <input name="projectName" type="text" id="projectName" placeholder="Nom du projet" ref={register({ required: true })} />}
                          {value && <input name="projectName" type="text" id="projectName" placeholder="Nom du projet" defaultValue={value.projectName} ref={register({ required: true })} />}
                        </div>
                        {errors.projectName && <span className="error-message-form">Ce champ est requis</span>}
                      </div>
                    </div>
                    <div className="input-container">
                      <div className="input">
                        <label htmlFor="projectUrl">Lien du projet *</label>
                        <div className="input-block">
                          <span><FontAwesomeIcon icon="link" /></span>
                          {!value && <input name="projectUrl" type="text" id="projectUrl" placeholder="Lien du projet" ref={register({ required: true })} />}
                          {value && <input name="projectUrl" type="text" id="projectUrl" placeholder="Lien du projet" defaultValue={value.url} ref={register({ required: true })} />}
                        </div>
                        {errors.projectUrl && <span className="error-message-form">Ce champ est requis</span>}
                      </div>
                    </div>
                    <div>
                    <div className="label-checkbox-container code-used-checkbox-container">
                      <p>Framework utilisé(s)</p>
                      <div>
                        <label className="container-checkbox">React
                          {!value && <input type="checkbox" name="react" ref={register({ required: false })} />}
                          {value && <input type="checkbox" name="react" defaultChecked={value.technoUsedFront.react} ref={register({ required: false })} />}
                          <span className="checkmark-checkbox"></span>
                        </label>
                        <label className="container-checkbox">Ember
                          {!value && <input type="checkbox" name="ember" ref={register({ required: false })} />}
                          {value && <input type="checkbox" name="ember" defaultChecked={value.technoUsedFront.ember} ref={register({ required: false })} />}
                          <span className="checkmark-checkbox"></span>
                        </label>
                        <label className="container-checkbox">Angular
                          {!value && <input type="checkbox" name="angular" ref={register({ required: false })} />}
                          {value && <input type="checkbox" name="angular" defaultChecked={value.technoUsedFront.angular} ref={register({ required: false })} />}
                          <span className="checkmark-checkbox"></span>
                        </label>
                      </div>
                    </div>
                    <div className="label-checkbox-container code-used-checkbox-container">
                      <p>Technologie(s) utilisée(s) pour le back-office</p>
                      <div>
                        <label className="container-checkbox">Express
                          {!value && <input type="checkbox" name="express" ref={register({ required: false })} />}
                          {value && <input type="checkbox" name="express" defaultChecked={value.technoUsedBack.express} ref={register({ required: false })} />}
                          <span className="checkmark-checkbox"></span>
                        </label>
                        <label className="container-checkbox">NodeJS
                          {!value && <input type="checkbox" name="nodejs" ref={register({ required: false })} />}
                          {value && <input type="checkbox" name="nodejs" defaultChecked={value.technoUsedBack.nodejs} ref={register({ required: false })} />}
                          <span className="checkmark-checkbox"></span>
                        </label>
                        <label className="container-checkbox">MongoDB
                          {!value && <input type="checkbox" name="mongodb" ref={register({ required: false })} />}
                          {value && <input type="checkbox" name="mongodb" defaultChecked={value.technoUsedBack.mongodb} ref={register({ required: false })} />}
                          <span className="checkmark-checkbox"></span>
                        </label>
                      </div>
                    </div>
                    </div>
                  </div>
                  <div className="project-form-container-last">
                    { imgEdit && 
                      <div className="container-img-project-edit">
                        <p>Image du projet</p>
                        <div>
                          <button className="switch-to-input-project-img" onClick={switchToInput}>X</button>
                          <img src={`${apiDomain}/api/${apiVersion}/project/image/${value.img.filename}`} alt={value.altImg}/>
                        </div>
                      </div>
                    }
                    { !imgEdit &&
                      <div className="input-container">
                        <div className="input">
                          <label htmlFor="projectImg">Image du projet *</label>
                          <div className="input-block input-file">
                            <span><FontAwesomeIcon icon="images" /></span>
                            <div className="container-input-file">
                              <span>{imgProjectName}</span>
                              {!value && <input name="projectImg" type="file" accept=".jpg,.jpeg,.png" id="projectImg" placeholder="Image du projet" ref={register({ required: true })} onChange={(e) => onAddFile(e)} />}
                              {value && <input name="projectImg" type="file" accept=".jpg,.jpeg,.png" id="projectImg" placeholder="Image du projet" ref={register({ required: false })} onChange={(e) => onAddFile(e)} />}
                            </div>
                            <label htmlFor="projectImg">Ajout</label>
                          </div>
                          {errors.projectImg && <span className="error-message-form">Une image est requise</span>}
                          {errorMessageImg && <span className="error-message-form">Seulement une image de type .jpg/.jpeg/.png est autorisée</span>}
                        </div>
                      </div>
                    }
                    <div className="input-container">
                      <div className="input">
                        <label htmlFor="projectAltImg">Description de la l'image du projet *</label>
                        <div className="input-block">
                          <span><FontAwesomeIcon icon="info-circle" /></span>
                          {!value && <input name="projectAltImg" type="text" id="projectAltImg" placeholder="Description de l'image du projet" ref={register({ required: true })} />}
                          {value && <input name="projectAltImg" type="text" id="projectAltImg" placeholder="Description de l'image du projet" defaultValue={value.altImg} ref={register({ required: true })} />}
                        </div>
                        {errors.projectAltImg && <span className="error-message-form">Une description pour votre image est requise</span>}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-area">
                  <label htmlFor="descriptionProject">Description du projet*</label>
                  <div className="input-block">
                    {!value && <textarea name="descriptionProject" id="descriptionProject" placeholder="Votre description ici..." ref={register({ required: true })} />}
                    {value && <textarea name="descriptionProject" id="descriptionProject" placeholder="Votre description ici..." defaultValue={value.description} ref={register({ required: true })} />}
                  </div>
                  {errors.descriptionProject && <span className="error-message-form">Ce champ est requis</span>}
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
    <>
      <h3>{titleForm}</h3>
      {!value &&
        <form onSubmit={handleSubmit(handleFunction)}>
          {form}
        </form>
      }
      {value &&
        <form onSubmit={handleSubmit(handleFunction)}>
          {form}
        </form>
      }
    </>
  );
}

FormProject.propTypes = {
  handleFunction: PropTypes.func.isRequired,
  setIdItem: PropTypes.func,
  value: PropTypes.object,
  successMessage: PropTypes.object.isRequired,
  imgProjectState: PropTypes.shape({
    imgProjectName: PropTypes.string.isRequired,
    setImgProjectName: PropTypes.func.isRequired
  })
}

export default FormProject;