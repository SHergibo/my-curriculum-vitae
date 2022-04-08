import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../../utils/axiosInstance";
import { apiDomain, apiVersion } from "../../../apiConfig/ApiConfig";
import { checkSuccess, checkErrors } from "../../../utils/checkSuccess";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ActionButtonSubmit from "../../ActionButtonSubmit";
import PropTypes from "prop-types";

function FormProfilePicture({ generalInfoState }) {
  const { generalInfo, setGeneralInfo } = generalInfoState;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [imgSrc, setImgSrc] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [errorMessageImg, setErrorMessageImg] = useState("");
  const successSpanRef = useRef(null);
  const [spanSuccess, setSpanSuccess] = useState(false);
  const loadingRef = useRef(null);
  const [loader, setLoader] = useState(false);
  const errorSpanRef = useRef(null);
  const errorMessageRef = useRef(null);
  const [spanError, setSpanError] = useState(false);
  const setTimeoutLoader = useRef();
  const setTimeoutSuccess = useRef();
  const setTimeoutError = useRef();

  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({});

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImgFile(e.target.files[0]);
      setErrorMessageImg("");
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
    e.target.value = "";
  };

  const onSubmitData = async (data) => {
    if (!imgFile) {
      setErrorMessageImg("Ajouter une photo de profile !");
      return;
    }
    setLoader(true);
    setSpanError(false);
    const formData = new FormData();
    formData.append("img", imgFile);
    formData.append("profilePicAlt", JSON.stringify(data.profilePicAlt));
    const profilPicture = `${apiDomain}/api/${apiVersion}/infos/prof-picture/${generalInfo._id}`;
    await axiosInstance
      .patch(profilPicture, formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        checkSuccess(
          setTimeoutLoader,
          setLoader,
          setTimeoutSuccess,
          setSpanSuccess
        );
        reset();
        setImgFile();
        setImgSrc();
        setGeneralInfo({
          ...generalInfo,
          profilePic: response.data,
        });
      })
      .catch(() => {
        checkErrors(setTimeoutLoader, setLoader, setTimeoutError, setSpanError);
      });
  };

  const onClickDelete = async () => {
    const deleteProjectEndPoint = `${apiDomain}/api/${apiVersion}/infos/prof-picture-delete/${generalInfo._id}/${generalInfo.profilePic.id}`;
    await axiosInstance.delete(deleteProjectEndPoint).then(() => {
      setGeneralInfo({
        ...generalInfo,
        profilePic: {},
      });
    });
  };

  const form = (
    <div className="form-two-columns">
      <div className="form-left">
        <div className="input-container">
          <div className="input">
            <label htmlFor="profilePicture">Photo de profil *</label>
            <div className="input-block input-interaction">
              <span>
                <FontAwesomeIcon icon="images" />
              </span>
              <div className="container-input-interaction">
                <span>Photo de profil</span>
                <input
                  name="profilePicture"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  id="profilePicture"
                  placeholder="Photo de profil"
                  onChange={(e) => {
                    onSelectFile(e);
                  }}
                />
              </div>
              <label htmlFor="profilePicture">Chercher</label>
            </div>
            {errorMessageImg && (
              <span className="error-message-form">{errorMessageImg}</span>
            )}
          </div>
        </div>
        <div className="input-container">
          <div className="input">
            <label htmlFor="profilePicAlt">
              Description de la l'image de profil *
            </label>
            <div className="input-block input-interaction">
              <span>
                <FontAwesomeIcon icon="info-circle" />
              </span>
              <div className="container-input-interaction">
                <input
                  name="profilePicAlt"
                  type="text"
                  id="profilePicAlt"
                  placeholder="Description de l'image de profil"
                  {...register("profilePicAlt", { required: true })}
                />
              </div>
            </div>
            {errors.profilePicAlt && (
              <span className="error-message-form">Ce champ est requis</span>
            )}
          </div>
        </div>

        {windowWidth >= 960 && (
          <>
            <ActionButtonSubmit
              button={generalInfo.profilePic.fileName ? "Éditer" : "Ajouter"}
              value={{}}
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
        )}
      </div>

      <div className="form-right">
        {(imgSrc || generalInfo.profilePic.fileName) && (
          <div className="preview-profile-picture-container">
            <p>Prévisualisation</p>
            <div className="preview-profile-picture">
              <button
                title="Supprimer la photo de profil"
                className="delete-preview"
                type="button"
                onClick={(e) => {
                  if (generalInfo.profilePic.fileName) onClickDelete();
                  if (!generalInfo.profilePic.fileName) setImgSrc("");
                  setImgFile(null);
                }}
              >
                <FontAwesomeIcon icon="times" />
              </button>
              {generalInfo.profilePic.fileName && !imgSrc && (
                <img
                  src={`${apiDomain}/api/${apiVersion}/infos/image/${generalInfo.profilePic.fileName}`}
                  alt={generalInfo.profilePic.alt}
                />
              )}
              {imgSrc && <img src={imgSrc} alt="" />}
            </div>
          </div>
        )}

        {windowWidth < 960 && (
          <>
            <ActionButtonSubmit
              button={generalInfo.profilePic.fileName ? "Éditer" : "Ajouter"}
              value={{}}
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
        )}
      </div>
    </div>
  );

  return (
    <>
      <h2>Ajouter une photo de profil</h2>
      <form onSubmit={handleSubmit(onSubmitData)}>{form}</form>
    </>
  );
}

FormProfilePicture.propTypes = {
  generalInfoState: PropTypes.shape({
    generalInfo: PropTypes.object.isRequired,
    setGeneralInfo: PropTypes.func.isRequired,
  }),
};

export default FormProfilePicture;
