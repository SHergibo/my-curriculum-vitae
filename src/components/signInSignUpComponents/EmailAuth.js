import React, { useState, useRef, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { apiDomain, apiVersion } from "./../../apiConfig/ApiConfig";
import HomeSection from "../frontComponents/HomeSection";
import { checkSuccess, checkErrors } from "../../utils/checkSuccess";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSTransition } from "react-transition-group";
import PuffLoader from "react-spinners/PuffLoader";

function EmailAuth() {
  let { emailAuthToken } = useParams();
  let navigate = useNavigate();

  const loadingRef = useRef(null);
  const [loader, setLoader] = useState(true);
  const successSpanRef = useRef(null);
  const [spanSuccess, setSpanSuccess] = useState(false);
  const errorSpanRef = useRef(null);
  const [spanError, setSpanError] = useState(false);
  const [success, setSuccess] = useState(null);

  const setTimeoutLoader = useRef();
  const setTimeoutSuccess = useRef();
  const setTimeoutError = useRef();

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

  const sendEmailAuthToken = useCallback(async () => {
    setSpanError(false);
    const sendEmailAuth = `${apiDomain}/api/${apiVersion}/email-auth/${emailAuthToken}`;
    await axiosInstance
      .patch(sendEmailAuth)
      .then((response) => {
        if (response.status === 204) {
          setSuccess(true);
          checkSuccess(
            setTimeoutLoader,
            setLoader,
            setTimeoutSuccess,
            setSpanSuccess
          );
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setSuccess(false);
          checkErrors(
            setTimeoutLoader,
            setLoader,
            setTimeoutError,
            setSpanError
          );
        }
      });
  }, [emailAuthToken]);

  useEffect(() => {
    sendEmailAuthToken();
  }, [sendEmailAuthToken]);

  const container = (
    <div className="loading-email-auth">
      {!loader && !spanSuccess && success && (
        <>
          <p>Votre adresse mail a bien été authentifié !</p>
          <div className="btn-container">
            <button
              className="submit-signIn-signUp"
              type="button"
              onClick={() => {
                navigate("/login");
              }}
            >
              Retour vers la page de connexion
            </button>
          </div>
        </>
      )}
      {!loader && !spanError && !success && (
        <>
          <p>Ce lien d'authentification a expiré !</p>
          <div className="btn-container">
            <button
              className="submit-signIn-signUp"
              type="button"
              onClick={() => {
                navigate("/form-email-auth");
              }}
            >
              Renvoyer un mail d'authentification
            </button>
          </div>
        </>
      )}
      <CSSTransition
        nodeRef={loadingRef}
        in={loader}
        timeout={500}
        classNames="btnAnimation"
        unmountOnExit
      >
        <div ref={loadingRef} className="loading-action">
          <PuffLoader color={"#ffffff"} size={50} loading={loader} />
        </div>
      </CSSTransition>
      <CSSTransition
        nodeRef={successSpanRef}
        in={spanSuccess}
        timeout={2900}
        classNames="btnAnimation"
        unmountOnExit
      >
        <span ref={successSpanRef} className="success-svg">
          <FontAwesomeIcon icon="check" />
        </span>
      </CSSTransition>
      <CSSTransition
        nodeRef={errorSpanRef}
        in={spanError}
        timeout={2900}
        classNames="btnAnimation"
        unmountOnExit
      >
        <span ref={errorSpanRef} className="error-svg">
          <FontAwesomeIcon icon="times" />
        </span>
      </CSSTransition>
    </div>
  );

  return (
    <HomeSection
      welcome="Authentification"
      name="Authentification"
      div={container}
    />
  );
}

export default EmailAuth;
