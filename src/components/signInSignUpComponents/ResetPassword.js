import React, { useState, useRef, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { apiDomain, apiVersion } from "../../apiConfig/ApiConfig";
import HomeSection from "../frontComponents/HomeSection";
import { checkSuccess, checkErrors } from "../../utils/checkSuccess";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSTransition } from "react-transition-group";
import PuffLoader from "react-spinners/PuffLoader";

function ResetPassword() {
  let { resetPasswordAuthToken } = useParams();
  let navigate = useNavigate();

  const loadingRef = useRef(null);
  const [loader, setLoader] = useState(true);
  const successSpanRef = useRef(null);
  const [spanSuccess, setSpanSuccess] = useState(false);
  const errorSpanRef = useRef(null);
  const [spanError, setSpanError] = useState(false);
  const [success, setSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

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

  const resetPassword = async (data) => {
    setSpanError(false);
    const resetPasswordRoute = `${apiDomain}/api/${apiVersion}/email-request-reset-password/${emailAuthToken}`;
    await axiosInstance
      .patch(resetPasswordRoute, data)
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
        checkErrors(setTimeoutLoader, setLoader, setTimeoutError, setSpanError);
        if (error.response.status === 401) {
          setSuccess(false);
        } else if (error.response.status === 404) {
          setErrorMessage("Ce token de vérification n'existe pas !");
        } else {
          setErrorMessage(
            "Une erreur est survenue, veuillez réessayer plus tard !"
          );
        }
      });
  };

  const container = <div></div>;

  return (
    <HomeSection
      welcome="Changemet de mot de passe"
      name="Changemet de mot de passe"
      div={container}
    />
  );
}

export default ResetPassword;
