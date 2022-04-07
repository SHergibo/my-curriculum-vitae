import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../../utils/axiosInstance";
import { apiDomain, apiVersion } from "../../../apiConfig/ApiConfig";
import { checkSuccess, checkErrors } from "../../../utils/checkSuccess";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ActionButtonSubmit from "../../ActionButtonSubmit";

function FormProfilePicture() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [imgSrc, setImgSrc] = useState("");

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
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
    e.target.value = "";
  };

  const onSubmitData = async (data) => {
    // if (data.newPassword && data.confirmPassword) {
    //   if (data.newPassword !== data.confirmPassword) {
    //     setError("confirmPassword", {
    //       type: "manual",
    //       message: "Mauvais mot de passe!",
    //     });
    //     return;
    //   }
    // }
    // reset();
    // setLoader(true);
    // setSpanError(false);
    // const editPasswordUser = `${apiDomain}/api/${apiVersion}/users/${localStorage.getItem(
    //   "userId"
    // )}`;
    // await axiosInstance
    //   .patch(editPasswordUser, data)
    //   .then(() => {
    //     checkSuccess(
    //       setTimeoutLoader,
    //       setLoader,
    //       setTimeoutSuccess,
    //       setSpanSuccess
    //     );
    //     reset();
    //   })
    //   .catch(() => {
    //     checkErrors(setTimeoutLoader, setLoader, setTimeoutError, setSpanError);
    //   });
  };

  const form = (
    <div className="form-two-columns">
      <div className="form-left">
        <div className="input-container">
          <div className="input">
            <label htmlFor="profilePicture">Photo de profil</label>
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
              button={"Changer"}
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
        {imgSrc && (
          <div className="preview-profile-picture-container">
            <p>Prévisualisation</p>
            <div className="preview-profile-picture">
              <button
                title="Supprimer la photo de profil"
                className="delete-preview"
                onClick={() => setImgSrc("")}
              >
                <FontAwesomeIcon icon="times" />
              </button>
              <img src={imgSrc} />
            </div>
          </div>
        )}

        {windowWidth < 960 && (
          <>
            <ActionButtonSubmit
              button={"Changer"}
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

export default FormProfilePicture;
