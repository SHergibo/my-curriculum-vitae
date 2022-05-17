import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../../utils/axiosInstance";
import { apiDomain, apiVersion } from "../../../apiConfig/ApiConfig";
import { checkSuccess, checkErrors } from "../../../utils/checkSuccess";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ActionButtonSubmit from "../../ActionButtonSubmit";

function FormChangeEmail() {
  const successSpanRef = useRef(null);
  const [spanSuccess, setSpanSuccess] = useState(false);
  const loadingRef = useRef(null);
  const [loader, setLoader] = useState(false);
  const errorSpanRef = useRef(null);
  const errorMessageRef = useRef(null);
  const [spanError, setSpanError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const setTimeoutLoader = useRef();
  const setTimeoutSuccess = useRef();
  const setTimeoutError = useRef();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({});

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

  const onClickEdit = async (data) => {
    reset();
    setLoader(true);
    setSpanError(false);
    const editUserEmailEndPoint = `${apiDomain}/api/${apiVersion}/users/updateEmail/${localStorage.getItem(
      "userId"
    )}`;
    await axiosInstance
      .patch(editUserEmailEndPoint, data)
      .then(() => {
        checkSuccess(
          setTimeoutLoader,
          setLoader,
          setTimeoutSuccess,
          setSpanSuccess
        );
        reset();
      })
      .catch((error) => {
        if (error.response.status === 409) {
          setErrorMessage(error.response.data.output.payload.message);
        } else {
          setErrorMessage(
            "Une erreur est survenue, veuillez réessayer plus tard !"
          );
        }
        checkErrors(setTimeoutLoader, setLoader, setTimeoutError, setSpanError);
      });
  };

  const form = (
    <>
      <div className="input-container">
        <div className="input">
          <label htmlFor="changeEmail">Email *</label>
          <div className="input-block">
            <span>
              <FontAwesomeIcon icon="at" />
            </span>
            <input
              name="email"
              type="email"
              id="changeEmail"
              placeholder="Email *"
              {...register("email", {
                required: true,
              })}
            />
          </div>
          {errors.email && (
            <span className="error-message-form">Ce champ est requis</span>
          )}
        </div>
      </div>
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
          {errorMessage}
        </span>
      </CSSTransition>
    </>
  );

  return (
    <>
      <h2>Changer votre email</h2>
      <form onSubmit={handleSubmit(onClickEdit)}>{form}</form>
    </>
  );
}

export default FormChangeEmail;
