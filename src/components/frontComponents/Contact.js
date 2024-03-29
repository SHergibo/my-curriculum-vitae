import React, { useRef, useState, useEffect } from "react";
import { useInfosData } from "../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import Axios from "axios";
import { apiDomain, apiVersion } from "../../apiConfig/ApiConfig";
import { checkSuccess, checkErrors } from "../../utils/checkSuccess";
import ActionButtonSubmit from "../ActionButtonSubmit";
import { CSSTransition } from "react-transition-group";

function Contact() {
  const { generalInfo } = useInfosData();
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

  const onSubmit = async (data, e) => {
    setLoader(true);
    setSpanError(false);
    const registerEndPoint = `${apiDomain}/api/${apiVersion}/mails`;
    await Axios.post(registerEndPoint, data)
      .then(() => {
        checkSuccess(
          setTimeoutLoader,
          setLoader,
          setTimeoutSuccess,
          setSpanSuccess
        );
        e.target.reset();
      })
      .catch(() => {
        checkErrors(setTimeoutLoader, setLoader, setTimeoutError, setSpanError);
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  return (
    <div id="contact" className="wrapper contact">
      <div className="title-left">Contact</div>
      <div className="contact-form">
        <h2>Entrer en contact</h2>
        <p>N'hésitez pas à me contacter</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-container">
            <div className="input">
              <label htmlFor="firstname">Prénom *</label>
              <div className="input-block">
                <span>
                  <FontAwesomeIcon icon="user" />
                </span>
                <input
                  name="firstname"
                  type="text"
                  id="firstname"
                  placeholder="Votre prénom ici..."
                  {...register("firstname", { required: true })}
                />
              </div>
              {errors.firstname && (
                <span className="error-message-form">Ce champ est requis</span>
              )}
            </div>
            <div className="input">
              <label htmlFor="lastname">Nom *</label>
              <div className="input-block">
                <span>
                  <FontAwesomeIcon icon="user" />
                </span>
                <input
                  name="lastname"
                  type="text"
                  id="lastname"
                  placeholder="Votre nom ici..."
                  {...register("lastname", { required: true })}
                />
              </div>
              {errors.lastname && (
                <span className="error-message-form">Ce champ est requis</span>
              )}
            </div>
          </div>
          <div className="input-container">
            <div className="input">
              <label htmlFor="email">Email *</label>
              <div className="input-block">
                <span>
                  <FontAwesomeIcon icon="at" />
                </span>
                <input
                  name="email"
                  id="email"
                  placeholder="Votre adresse mail ici..."
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Adresse mail invalide",
                    },
                  })}
                />
              </div>
              <span className="error-message-form">
                {errors.email && errors.email.message}
              </span>
            </div>
            <div className="input">
              <label htmlFor="phone">Téléphone *</label>
              <div className="input-block">
                <span>
                  <FontAwesomeIcon icon="mobile-alt" />
                </span>
                <input
                  name="phone"
                  type="text"
                  id="phone"
                  placeholder="Votre n° de téléphone ici..."
                  {...register("phone", { required: true })}
                />
              </div>
              {errors.phone && (
                <span className="error-message-form">Ce champ est requis</span>
              )}
            </div>
          </div>
          <div className="input-container">
            <div className="input">
              <label htmlFor="subject">Sujet *</label>
              <div className="input-block">
                <span>
                  <FontAwesomeIcon icon="envelope" />
                </span>
                <input
                  name="subject"
                  type="text"
                  id="subject"
                  placeholder="Le sujet du message ici..."
                  {...register("subject", { required: true })}
                />
              </div>
              {errors.subject && (
                <span className="error-message-form">Ce champ est requis</span>
              )}
            </div>
          </div>
          <div className="text-area">
            <label htmlFor="message">Message*</label>
            <div className="input-block">
              <textarea
                name="message"
                id="message"
                placeholder="Votre message ici..."
                {...register("message", { required: true })}
              />
            </div>
            {errors.message && (
              <span className="error-message-form">Ce champ est requis</span>
            )}
          </div>
          <ActionButtonSubmit
            button={"Envoyer"}
            value={{}}
            loadingRef={loadingRef}
            loader={loader}
            successSpanRef={successSpanRef}
            spanSuccess={spanSuccess}
            errorSpanRef={errorSpanRef}
            spanError={spanError}
            formContact={true}
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
        </form>
      </div>
      <div className="contact-info">
        <div className="container-img-contact">
          {generalInfo.profilePic?.fileName && (
            <img
              src={`${apiDomain}/api/${apiVersion}/infos/image/${generalInfo.profilePic?.fileName}`}
              alt={generalInfo.profilePic?.alt}
            />
          )}
          {!generalInfo.profilePic?.fileName && (
            <img src="./default-profile-picture.png" alt="Profil par défaut" />
          )}
        </div>
        {generalInfo.email && (
          <ul>
            <li>
              <span>
                <FontAwesomeIcon icon="envelope" />
              </span>{" "}
              {generalInfo.email}
            </li>
            <li>
              <span>
                <FontAwesomeIcon icon="mobile-alt" />
              </span>{" "}
              {generalInfo.phone}
            </li>
            <li>
              <span>
                <FontAwesomeIcon icon="map-marker-alt" />
              </span>
              <div>
                <div>
                  {" "}
                  {generalInfo.address.street}, {generalInfo.address.number}
                </div>
                <div>
                  {generalInfo.address.zip} {generalInfo.address.city}
                </div>
              </div>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Contact;
