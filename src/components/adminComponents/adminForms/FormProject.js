import React, { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import axiosInstance from "../../../utils/axiosInstance";
import { apiDomain, apiVersion } from "../../../apiConfig/ApiConfig";
import { useForm } from "react-hook-form";
import { checkSuccess, checkErrors } from "../../../utils/checkSuccess";
import ActionButtonSubmit from "../../ActionButtonSubmit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { closeModal } from "../../../utils/modalDisplay";
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
  }),
};

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
  const [inputFrameworkValue, setInputFrameworkValue] = useState("");
  const [frameworkValueSelect, setFrameworkValueSelect] = useState([]);
  const [inputBackEndValue, setInputBackEndValue] = useState("");
  const [backEndValueSelect, setBackEndValueSelect] = useState([]);
  const setTimeoutLoader = useRef();
  const setTimeoutSuccess = useRef();
  const setTimeoutError = useRef();
  const formDefaultValueRef = useRef({});

  useEffect(() => {
    setImgProjectName("Image du projet");
    if (value) {
      setImgEdit(true);
      setTitleForm("Édition");
      setButton("Éditer");
      setFrameworkValueSelect(value.technoUsedFront);
      setBackEndValueSelect(value.technoUsedBack);
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
      projectAltImg: value?.altImg,
      projectDescription: value?.description,
    };
    reset(formDefaultValueRef.current);
  }, [reset, value]);

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
    formData.append("description", data.projectDescription);
    formData.append("technoUsedFront", JSON.stringify(frameworkValueSelect));
    formData.append("technoUsedBack", JSON.stringify(backEndValueSelect));
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
        if (frameworkValueSelect.length > 0) setFrameworkValueSelect([]);
        if (backEndValueSelect.length > 0) setBackEndValueSelect([]);
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
    formData.append("description", data.projectDescription);
    formData.append("technoUsedFront", JSON.stringify(frameworkValueSelect));
    formData.append("technoUsedBack", JSON.stringify(backEndValueSelect));
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
                    <input
                      name="projectImg"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      id="projectImg"
                      placeholder="Image du projet"
                      {...register("projectImg", {
                        required: true,
                        onChange: (e) => {
                          onAddFile(e);
                        },
                      })}
                    />
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
                <input
                  name="projectAltImg"
                  type="text"
                  id="projectAltImg"
                  placeholder="Description de l'image du projet"
                  {...register("projectAltImg", { required: true })}
                />
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
