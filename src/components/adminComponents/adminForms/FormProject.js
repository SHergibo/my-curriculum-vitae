import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import axiosInstance from "../../../utils/axiosInstance";
import { apiDomain, apiVersion } from "../../../apiConfig/ApiConfig";
import { useForm } from "react-hook-form";
import { checkSuccess, checkErrors } from "../../../utils/checkSuccess";
import ActionButtonSubmit from "../../ActionButtonSubmit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { closeModal } from "../../../utils/modalDisplay";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

function FormProject({ value, projectState, setDisplayForm }) {
  const successSpanRef = useRef(null);
  const [spanSuccess, setSpanSuccess] = useState(false);
  const loadingRef = useRef(null);
  const [loader, setLoader] = useState(false);
  const errorSpanRef = useRef(null);
  const errorMessageRef = useRef(null);
  const [spanError, setSpanError] = useState(false);
  const [imgProjectName, setImgProjectName] = useState("Image du projet");
  const [titleForm, setTitleForm] = useState("Ajout");
  const [button, setButton] = useState("Ajouter");
  const [imgEdit, setImgEdit] = useState(false);
  const [errorMessageImg, setErrorMessageImg] = useState(false);
  const setTimeoutLoader = useRef();
  const setTimeoutSuccess = useRef();
  const setTimeoutError = useRef();

  useEffect(() => {
    setImgProjectName("Image du projet");
    if (value) {
      setImgEdit(true);
      setTitleForm("Édition");
      setButton("Éditer");
    }
  }, [value]);

  const { register, handleSubmit, errors } = useForm();

  const switchToInput = () => {
    setImgEdit(false);
  };

  const onAddFile = (e) => {
    const file = e.target.files[0];
    if (e.target.files.length === 1) {
      if (file.type === "image/png" || file.type === "image/jpeg") {
        setImgProjectName(e.target.files[0].name);
        setErrorMessageImg(false);
      } else {
        setImgProjectName("Image du projet");
        setErrorMessageImg(true);
      }
    } else {
      setImgProjectName("Image du projet");
    }
  };

  let timeoutLoader = setTimeoutLoader.current;
  let timeoutSuccess = setTimeoutSuccess.current;
  let timeoutError = setTimeoutError.current;
  useEffect(() => {
    return () => {
      clearTimeout(timeoutLoader);
      clearTimeout(timeoutSuccess);
      clearTimeout(timeoutError);
    };
  }, [timeoutLoader, timeoutSuccess, timeoutError]);

  const onSubmitAdd = async (data, e) => {
    setLoader(true);
    setSpanError(false);
    const formData = new FormData();
    formData.append("projectName", data.projectName);
    if (data.projectUrlWeb) formData.append("urlWeb", data.projectUrlWeb);
    formData.append("urlGithub", data.projectUrlGithub);
    formData.append("img", data.projectImg[0]);
    formData.append("altImg", data.projectAltImg);
    formData.append("description", data.descriptionProject);
    formData.append(
      "technoUsedFront",
      JSON.stringify({
        React: data.react,
        Ember: data.ember,
        Angular: data.angular,
      })
    );
    formData.append(
      "technoUsedBack",
      JSON.stringify({
        Express: data.express,
        NodeJs: data.nodejs,
        MongoDB: data.mongodb,
      })
    );
    const getListProjectPoint = `${apiDomain}/api/${apiVersion}/projects`;
    await axios
      .post(getListProjectPoint, formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then(() => {
        checkSuccess(
          setTimeoutLoader,
          setLoader,
          setTimeoutSuccess,
          setSpanSuccess
        );
        e.target.reset();
        setImgProjectName("Image du projet");
      })
      .catch(() => {
        checkErrors(setTimeoutLoader, setLoader, setTimeoutError, setSpanError);
      });
  };

  const onClickEdit = async (data) => {
    setLoader(true);
    setSpanError(false);
    const { arrayProject, setArrayProject } = projectState;
    const formData = new FormData();
    formData.append("projectName", data.projectName);
    formData.append("urlWeb", data.projectUrlWeb);
    formData.append("urlGithub", data.projectUrlGithub);
    if (data.projectImg) formData.append("img", data.projectImg[0]);
    formData.append("altImg", data.projectAltImg);
    formData.append("description", data.descriptionProject);
    formData.append(
      "technoUsedFront",
      JSON.stringify({
        React: data.react,
        Ember: data.ember,
        Angular: data.angular,
      })
    );
    formData.append(
      "technoUsedBack",
      JSON.stringify({
        Express: data.express,
        NodeJs: data.nodejs,
        MongoDB: data.mongodb,
      })
    );
    const editEducExpeEndPoint = `${apiDomain}/api/${apiVersion}/projects/${value._id}`;
    await axiosInstance
      .patch(editEducExpeEndPoint, formData)
      .then((response) => {
        let arrayResponse = [response.data];
        setArrayProject(
          [...arrayProject].map(
            (obj) => arrayResponse.find((o) => o._id === obj._id) || obj
          )
        );
        closeModal(setDisplayForm);
      })
      .catch(() => {
        checkErrors(setTimeoutLoader, setLoader, setTimeoutError, setSpanError);
      });
  };

  const form = (
    <>
      <div className="form-project-admin">
        <div className="project-form-container-first">
          <div className="input-container">
            <div className="input">
              <label htmlFor="projectName">Nom du projet *</label>
              <div className="input-block">
                <span>
                  <FontAwesomeIcon icon="file-signature" />
                </span>
                {!value && (
                  <input
                    name="projectName"
                    type="text"
                    id="projectName"
                    placeholder="Nom du projet"
                    ref={register({ required: true })}
                  />
                )}
                {value && (
                  <input
                    name="projectName"
                    type="text"
                    id="projectName"
                    placeholder="Nom du projet"
                    defaultValue={value.projectName}
                    ref={register({ required: true })}
                  />
                )}
              </div>
              {errors.projectName && (
                <span className="error-message-form">Ce champ est requis</span>
              )}
            </div>
          </div>
          <div className="input-container">
            <div className="input">
              <label htmlFor="projectUrlWeb">Lien vers le site web</label>
              <div className="input-block">
                <span>
                  <FontAwesomeIcon icon="link" />
                </span>
                {!value && (
                  <input
                    name="projectUrlWeb"
                    type="text"
                    id="projectUrlWeb"
                    placeholder="Lien vers le site web"
                    ref={register()}
                  />
                )}
                {value && (
                  <input
                    name="projectUrlWeb"
                    type="text"
                    id="projectUrlWeb"
                    placeholder="Lien vers le site web"
                    defaultValue={value.urlWeb}
                    ref={register()}
                  />
                )}
              </div>
              {errors.projectUrlWeb && (
                <span className="error-message-form">Ce champ est requis</span>
              )}
            </div>
          </div>
          <div className="input-container">
            <div className="input">
              <label htmlFor="projectUrlGithub">Lien vers Github *</label>
              <div className="input-block">
                <span>
                  <FontAwesomeIcon icon={["fab", "github"]} />
                </span>
                {!value && (
                  <input
                    name="projectUrlGithub"
                    type="text"
                    id="projectUrlGithub"
                    placeholder="Lien vers Github"
                    ref={register({ required: true })}
                  />
                )}
                {value && (
                  <input
                    name="projectUrlGithub"
                    type="text"
                    id="projectUrlGithub"
                    placeholder="Lien vers Github"
                    defaultValue={value.urlGithub}
                    ref={register({ required: true })}
                  />
                )}
              </div>
              {errors.projectUrlGithub && (
                <span className="error-message-form">Ce champ est requis</span>
              )}
            </div>
          </div>
          <div>
            <div className="label-checkbox-container code-used-checkbox-container">
              <p>Framework utilisé(s)</p>
              <div>
                <label className="container-checkbox">
                  React
                  {!value && (
                    <input
                      type="checkbox"
                      name="react"
                      ref={register({ required: false })}
                    />
                  )}
                  {value && (
                    <input
                      type="checkbox"
                      name="react"
                      defaultChecked={value.technoUsedFront.React}
                      ref={register({ required: false })}
                    />
                  )}
                  <span className="checkmark-checkbox"></span>
                </label>
                <label className="container-checkbox">
                  Ember
                  {!value && (
                    <input
                      type="checkbox"
                      name="ember"
                      ref={register({ required: false })}
                    />
                  )}
                  {value && (
                    <input
                      type="checkbox"
                      name="ember"
                      defaultChecked={value.technoUsedFront.Ember}
                      ref={register({ required: false })}
                    />
                  )}
                  <span className="checkmark-checkbox"></span>
                </label>
                <label className="container-checkbox">
                  Angular
                  {!value && (
                    <input
                      type="checkbox"
                      name="angular"
                      ref={register({ required: false })}
                    />
                  )}
                  {value && (
                    <input
                      type="checkbox"
                      name="angular"
                      defaultChecked={value.technoUsedFront.Angular}
                      ref={register({ required: false })}
                    />
                  )}
                  <span className="checkmark-checkbox"></span>
                </label>
              </div>
            </div>
            <div className="label-checkbox-container code-used-checkbox-container">
              <p>Technologie(s) utilisée(s) pour le back-office</p>
              <div>
                <label className="container-checkbox">
                  Express
                  {!value && (
                    <input
                      type="checkbox"
                      name="express"
                      ref={register({ required: false })}
                    />
                  )}
                  {value && (
                    <input
                      type="checkbox"
                      name="express"
                      defaultChecked={value.technoUsedBack.Express}
                      ref={register({ required: false })}
                    />
                  )}
                  <span className="checkmark-checkbox"></span>
                </label>
                <label className="container-checkbox">
                  NodeJS
                  {!value && (
                    <input
                      type="checkbox"
                      name="nodejs"
                      ref={register({ required: false })}
                    />
                  )}
                  {value && (
                    <input
                      type="checkbox"
                      name="nodejs"
                      defaultChecked={value.technoUsedBack.NodeJs}
                      ref={register({ required: false })}
                    />
                  )}
                  <span className="checkmark-checkbox"></span>
                </label>
                <label className="container-checkbox">
                  MongoDB
                  {!value && (
                    <input
                      type="checkbox"
                      name="mongodb"
                      ref={register({ required: false })}
                    />
                  )}
                  {value && (
                    <input
                      type="checkbox"
                      name="mongodb"
                      defaultChecked={value.technoUsedBack.MongoDB}
                      ref={register({ required: false })}
                    />
                  )}
                  <span className="checkmark-checkbox"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="project-form-container-last">
          {imgEdit && (
            <div className="container-img-project-edit">
              <p>Image du projet</p>
              <div>
                <button
                  className="switch-to-input-project-img"
                  onClick={switchToInput}
                >
                  X
                </button>
                <img
                  src={`${apiDomain}/api/${apiVersion}/projects/image/${value.img.filename}`}
                  alt={value.altImg}
                />
              </div>
            </div>
          )}
          {!imgEdit && (
            <div className="input-container">
              <div className="input">
                <label htmlFor="projectImg">Image du projet *</label>
                <div className="input-block input-file">
                  <span>
                    <FontAwesomeIcon icon="images" />
                  </span>
                  <div className="container-input-file">
                    <span>{imgProjectName}</span>
                    {!value && (
                      <input
                        name="projectImg"
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        id="projectImg"
                        placeholder="Image du projet"
                        ref={register({ required: true })}
                        onChange={(e) => onAddFile(e)}
                      />
                    )}
                    {value && (
                      <input
                        name="projectImg"
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        id="projectImg"
                        placeholder="Image du projet"
                        ref={register({ required: false })}
                        onChange={(e) => onAddFile(e)}
                      />
                    )}
                  </div>
                  <label htmlFor="projectImg">Ajout</label>
                </div>
                {errors.projectImg && (
                  <span className="error-message-form">
                    Une image est requise
                  </span>
                )}
                {errorMessageImg && (
                  <span className="error-message-form">
                    Seulement une image de type .jpg/.jpeg/.png est autorisée
                  </span>
                )}
              </div>
            </div>
          )}
          <div className="input-container">
            <div className="input">
              <label htmlFor="projectAltImg">
                Description de la l'image du projet *
              </label>
              <div className="input-block">
                <span>
                  <FontAwesomeIcon icon="info-circle" />
                </span>
                {!value && (
                  <input
                    name="projectAltImg"
                    type="text"
                    id="projectAltImg"
                    placeholder="Description de l'image du projet"
                    ref={register({ required: true })}
                  />
                )}
                {value && (
                  <input
                    name="projectAltImg"
                    type="text"
                    id="projectAltImg"
                    placeholder="Description de l'image du projet"
                    defaultValue={value.altImg}
                    ref={register({ required: true })}
                  />
                )}
              </div>
              {errors.projectAltImg && (
                <span className="error-message-form">
                  Une description pour votre image est requise
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="text-area">
        <label htmlFor="descriptionProject">Description du projet*</label>
        <div className="input-block">
          {!value && (
            <textarea
              name="descriptionProject"
              id="descriptionProject"
              placeholder="Votre description ici..."
              ref={register({ required: true })}
            />
          )}
          {value && (
            <textarea
              name="descriptionProject"
              id="descriptionProject"
              placeholder="Votre description ici..."
              defaultValue={value.description}
              ref={register({ required: true })}
            />
          )}
        </div>
        {errors.descriptionProject && (
          <span className="error-message-form">Ce champ est requis</span>
        )}
      </div>

      <ActionButtonSubmit
        button={button}
        value={value}
        loadingRef={loadingRef}
        loader={loader}
        successSpanRef={successSpanRef}
        spanSuccess={spanSuccess}
        errorSpanRef={errorSpanRef}
        spanError={spanError}
      />
    </>
  );

  return (
    <>
      <h3>{titleForm}</h3>
      {!value && <form onSubmit={handleSubmit(onSubmitAdd)}>{form}</form>}
      {value && <form onSubmit={handleSubmit(onClickEdit)}>{form}</form>}

      <CSSTransition
        nodeRef={errorMessageRef}
        in={spanError}
        timeout={1000}
        classNames="btnAnimation"
        unmountOnExit
      >
        <span ref={errorMessageRef} className="error-message">
          Une erreur est survenue, veuillez réessayer plus tard !
        </span>
      </CSSTransition>
    </>
  );
}

FormProject.propTypes = {
  value: PropTypes.object,
  projectState: PropTypes.shape({
    arrayProject: PropTypes.array,
    setArrayProject: PropTypes.func,
  }),
  setDisplayForm: PropTypes.func,
};

export default FormProject;
