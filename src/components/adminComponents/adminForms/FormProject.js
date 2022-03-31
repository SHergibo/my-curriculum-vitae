import React, { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import axiosInstance from "../../../utils/axiosInstance";
import { apiDomain, apiVersion } from "../../../apiConfig/ApiConfig";
import { useForm } from "react-hook-form";
import { checkSuccess, checkErrors } from "../../../utils/checkSuccess";
import ActionButtonSubmit from "../../ActionButtonSubmit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSTransition } from "react-transition-group";
import CreatableSelect from "react-select/creatable";
import PropTypes from "prop-types";

const customStyles = {
  container: (styles) => ({
    ...styles,
    width: "100%",
  }),
  placeholder: (styles) => ({
    ...styles,
    color: "hsla(0, 0%, 100%, 0.5);",
    marginLeft: "0px",
  }),
  input: (styles) => ({
    ...styles,
    color: "hsla(0, 0%, 100%, 0.5);",
    marginLeft: "0px",
  }),
  control: (styles) => ({
    ...styles,
    width: "100%",
    outline: "none",
    boxShadow: "none",
    backgroundColor: "transparent",
    border: "none",
  }),
  clearIndicator: (styles, { isFocused, isSelected }) => ({
    ...styles,
    color:
      isSelected || isFocused
        ? "hsla(0, 0%, 100%, 0.5);"
        : "hsla(0, 0%, 100%, 0.5);",
    "&:hover": {
      color: "hsla(0, 0%, 100%, 0.2)",
    },
  }),
  valueContainer: (styles) => ({
    ...styles,
    paddingLeft: "0px",
    color: "black",
  }),
};

function FormProject({ value, projectState }) {
  const successSpanRef = useRef(null);
  const [spanSuccess, setSpanSuccess] = useState(false);
  const loadingRef = useRef(null);
  const [loader, setLoader] = useState(false);
  const errorSpanRef = useRef(null);
  const errorMessageRef = useRef(null);
  const [spanError, setSpanError] = useState(false);
  const [imgProject, setImgProject] = useState(null);
  const [imgProjectName, setImgProjectName] = useState("Image du projet");
  const [imagesArray, setImagesArray] = useState([]);
  const [altDescImagesArray, setAltDescImagesArray] = useState([]);
  const [errorMessageImg, setErrorMessageImg] = useState("");
  const [errorAltImg, setErrorAltImg] = useState("");
  const [inputFrameworkValue, setInputFrameworkValue] = useState("");
  const [frameworkValueSelect, setFrameworkValueSelect] = useState([]);
  const [inputBackEndValue, setInputBackEndValue] = useState("");
  const [backEndValueSelect, setBackEndValueSelect] = useState([]);
  const setTimeoutLoader = useRef();
  const setTimeoutSuccess = useRef();
  const setTimeoutError = useRef();
  const formDefaultValueRef = useRef({});
  const altImgInputRef = useRef(null);

  useEffect(() => {
    setImgProjectName("Image du projet");
    if (value) {
      setFrameworkValueSelect(value.technoUsedFront);
      setBackEndValueSelect(value.technoUsedBack);
      setImagesArray([]);
      setAltDescImagesArray([]);
      setAltDescImagesArray([]);
      value.images.forEach((images) => {
        setImagesArray((array) => [...array, images.fileName]);
        setAltDescImagesArray((array) => [...array, images.alt]);
      });
    }
  }, [value]);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      return value;
    }, [value]),
  });

  useEffect(() => {
    formDefaultValueRef.current = {
      projectName: value?.projectName,
      projectUrlGithub: value?.urlGithub,
      projectUrlWeb: value?.urlWeb,
      projectDescription: value?.description,
    };
    reset(formDefaultValueRef.current);
  }, [reset, value]);

  const onAddFile = (e) => {
    const file = e.target.files[0];
    if (e.target.files.length === 1) {
      if (file.type === "image/png" || file.type === "image/jpeg") {
        setImgProject(e.target.files[0]);
        setImgProjectName(e.target.files[0].name);
        setErrorMessageImg("");
      } else {
        setImgProject(null);
        setImgProjectName("Image du projet");
        setErrorMessageImg(
          "Seulement une image de type .jpg/.jpeg/.png est autorisée"
        );
      }
    } else {
      setImgProject(null);
      setImgProjectName("Image du projet");
    }
  };

  const addImage = () => {
    if (imagesArray.length === 4) {
      setImgProject(null);
      setImgProjectName("Image du projet");
      altImgInputRef.current.value = null;
      setErrorAltImg("4 images maximum par projet!");
      return;
    }
    if (!altImgInputRef.current.value && !imgProject) {
      setErrorAltImg("Une description pour votre image est requise");
      setErrorMessageImg("Une image est requise");
      return;
    }
    if (!imgProject) {
      setErrorMessageImg("Une image est requise");
      return;
    }
    if (!altImgInputRef.current.value) {
      setErrorAltImg("Une description pour votre image est requise");
      return;
    }
    if (imgProject && altImgInputRef.current.value) {
      let altImgValue = altImgInputRef.current.value;
      setImagesArray((array) => [...array, imgProject]);
      setAltDescImagesArray((array) => [...array, altImgValue]);
      setImgProject();
      setImgProjectName("Image du projet");
      setErrorAltImg("");
      altImgInputRef.current.value = null;
    }
  };

  const deleteImageProject = (index) => {
    setImagesArray([
      ...imagesArray.slice(0, index),
      ...imagesArray.slice(index + 1),
    ]);
    setAltDescImagesArray([
      ...altDescImagesArray.slice(0, index),
      ...altDescImagesArray.slice(index + 1),
    ]);
  };

  const validateSubmit = (e) => {
    e.preventDefault();
    if (imagesArray.length < 1) {
      setErrorMessageImg("Au minimum une image est requise par projet");
    }
    if (!value) handleSubmit(onSubmitAdd)(e);
    if (value) handleSubmit(onSubmitEdit)(e);
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
    if (imagesArray.length < 1) {
      return;
    }
    setLoader(true);
    setSpanError(false);
    const formData = new FormData();
    formData.append("projectName", data.projectName);
    if (data.projectUrlWeb) formData.append("urlWeb", data.projectUrlWeb);
    formData.append("urlGithub", data.projectUrlGithub);
    formData.append("description", data.projectDescription);
    formData.append("technoUsedFront", JSON.stringify(frameworkValueSelect));
    formData.append("technoUsedBack", JSON.stringify(backEndValueSelect));

    for (let i = 0; i < imagesArray.length; i++) {
      formData.append("images", imagesArray[i]);
    }

    formData.append("altDescImages", JSON.stringify(altDescImagesArray));

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
        setImagesArray([]);
        setAltDescImagesArray([]);
        setImgProject();
        altImgInputRef.current.value = null;
        if (frameworkValueSelect.length > 0) setFrameworkValueSelect([]);
        if (backEndValueSelect.length > 0) setBackEndValueSelect([]);
      })
      .catch(() => {
        checkErrors(setTimeoutLoader, setLoader, setTimeoutError, setSpanError);
      });
  };

  const onSubmitEdit = async (data) => {
    setLoader(true);
    setSpanError(false);
    const { arrayProject, setArrayProject } = projectState;
    const formData = new FormData();
    formData.append("projectName", data.projectName);
    formData.append("urlWeb", data.projectUrlWeb);
    formData.append("urlGithub", data.projectUrlGithub);
    formData.append("description", data.projectDescription);
    formData.append("technoUsedFront", JSON.stringify(frameworkValueSelect));
    formData.append("technoUsedBack", JSON.stringify(backEndValueSelect));

    for (let i = 0; i < imagesArray.length; i++) {
      formData.append("images", imagesArray[i]);
    }

    formData.append("altDescImages", JSON.stringify(altDescImagesArray));

    const editEducExpeEndPoint = `${apiDomain}/api/${apiVersion}/projects/${value._id}`;
    await axiosInstance
      .patch(editEducExpeEndPoint, formData)
      .then((response) => {
        checkSuccess(
          setTimeoutLoader,
          setLoader,
          setTimeoutSuccess,
          setSpanSuccess
        );
        let arrayResponse = [response.data];
        setArrayProject(
          [...arrayProject].map(
            (obj) => arrayResponse.find((o) => o._id === obj._id) || obj
          )
        );
      })
      .catch(() => {
        checkErrors(setTimeoutLoader, setLoader, setTimeoutError, setSpanError);
      });
  };

  const handleChangeFramework = (data) => {
    setFrameworkValueSelect(data);
  };
  const handleInputChangeFramework = (inputFrameworkValue) => {
    setInputFrameworkValue(inputFrameworkValue);
  };

  const handleKeyDownFramework = (event) => {
    if (!inputFrameworkValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setFrameworkValueSelect([
          ...frameworkValueSelect,
          { value: inputFrameworkValue, label: inputFrameworkValue },
        ]);
        setInputFrameworkValue("");
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  const handleChangeBackEnd = (data) => {
    setBackEndValueSelect(data);
  };
  const handleInputChangeBackEnd = (inputBackEndValue) => {
    setInputBackEndValue(inputBackEndValue);
  };

  const handleKeyDownBackEnd = (event) => {
    if (!inputBackEndValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setBackEndValueSelect([
          ...backEndValueSelect,
          { value: inputBackEndValue, label: inputBackEndValue },
        ]);
        setInputBackEndValue("");
        event.preventDefault();
        break;
      default:
        break;
    }
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
                <input
                  name="projectName"
                  type="text"
                  id="projectName"
                  placeholder="Nom du projet"
                  {...register("projectName", { required: true })}
                />
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
                <input
                  name="projectUrlWeb"
                  type="text"
                  id="projectUrlWeb"
                  placeholder="Lien vers le site web"
                  {...register("projectUrlWeb")}
                />
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
                <input
                  name="projectUrlGithub"
                  type="text"
                  id="projectUrlGithub"
                  placeholder="Lien vers Github"
                  {...register("projectUrlGithub", { required: true })}
                />
              </div>
              {errors.projectUrlGithub && (
                <span className="error-message-form">Ce champ est requis</span>
              )}
            </div>
          </div>
          <div className="input input-no-error">
            <label htmlFor="framework">Framework utilisé(s)</label>
            <div className="input-block">
              <span>
                <FontAwesomeIcon icon={["fas", "laptop-code"]} />
              </span>
              <CreatableSelect
                name={"framework"}
                styles={customStyles}
                components={{
                  DropdownIndicator: null,
                }}
                inputValue={inputFrameworkValue}
                isClearable
                isMulti
                menuIsOpen={false}
                onChange={handleChangeFramework}
                onInputChange={handleInputChangeFramework}
                onKeyDown={handleKeyDownFramework}
                placeholder="Entrez quelque chose et appuyez sur entrée..."
                value={frameworkValueSelect}
              />
            </div>
          </div>
          <div className="input input-no-error">
            <label htmlFor="back-end">
              Technologie(s) utilisée(s) pour le back-office
            </label>
            <div className="input-block">
              <span>
                <FontAwesomeIcon icon={["fas", "code"]} />
              </span>
              <CreatableSelect
                name={"back-end"}
                styles={customStyles}
                components={{
                  DropdownIndicator: null,
                }}
                inputValue={inputBackEndValue}
                isClearable
                isMulti
                menuIsOpen={false}
                onChange={handleChangeBackEnd}
                onInputChange={handleInputChangeBackEnd}
                onKeyDown={handleKeyDownBackEnd}
                placeholder="Entrez quelque chose et appuyez sur entrée..."
                value={backEndValueSelect}
              />
            </div>
          </div>
        </div>
        <div className="project-form-container-last">
          <div className="input-container">
            <div className="input">
              <label htmlFor="projectImg">Image du projet *</label>
              <div className="input-block input-interaction">
                <span>
                  <FontAwesomeIcon icon="images" />
                </span>
                <div className="container-input-interaction">
                  <span>{imgProjectName}</span>
                  <input
                    name="projectImg"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    id="projectImg"
                    placeholder="Image du projet"
                    onChange={(e) => {
                      onAddFile(e);
                    }}
                  />
                </div>
                <label htmlFor="projectImg">Chercher</label>
              </div>
              {errorMessageImg && (
                <span className="error-message-form">{errorMessageImg}</span>
              )}
            </div>
          </div>
          <div className="input-container">
            <div className="input">
              <label htmlFor="projectAltImg">
                Description de la l'image du projet *
              </label>
              <div className="input-block input-interaction">
                <span>
                  <FontAwesomeIcon icon="info-circle" />
                </span>
                <div className="container-input-interaction">
                  <input
                    name="projectAltImg"
                    type="text"
                    id="projectAltImg"
                    placeholder="Description de l'image du projet"
                    onChange={(e) => {
                      if (errorAltImg && e.target.value) {
                        setErrorAltImg("");
                      }
                    }}
                    ref={altImgInputRef}
                  />
                </div>
                <label htmlFor="projectAltImg" onClick={addImage}>
                  Ajouter
                </label>
              </div>
              {errorAltImg && (
                <span className="error-message-form">{errorAltImg}</span>
              )}
            </div>
          </div>
          {altDescImagesArray.length >= 1 && (
            <ul className="image-project-list">
              <h5>{`Image${
                altDescImagesArray.length > 1 ? "s" : ""
              } du projet :`}</h5>
              {altDescImagesArray.map((descImage, index) => {
                return (
                  <li key={descImage + index}>
                    {descImage}
                    <button
                      className="little-btn-action"
                      onClick={() => {
                        deleteImageProject(index);
                      }}
                    >
                      <FontAwesomeIcon icon="times" />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      <div className="text-area">
        <label htmlFor="projectDescription">Description du projet*</label>
        <div className="input-block">
          <textarea
            name="projectDescription"
            id="projectDescription"
            placeholder="Votre description ici..."
            {...register("projectDescription", { required: true })}
          />
        </div>
        {errors.projectDescription && (
          <span className="error-message-form">Ce champ est requis</span>
        )}
      </div>

      <ActionButtonSubmit
        button={value ? "Éditer" : "Ajouter"}
        value={value}
        loadingRef={loadingRef}
        loader={loader}
        successSpanRef={successSpanRef}
        spanSuccess={spanSuccess}
        errorSpanRef={errorSpanRef}
        spanError={spanError}
      />

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

  return (
    <>
      {!value && <h3>Ajout</h3>}
      <form onSubmit={validateSubmit}>{form}</form>
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
