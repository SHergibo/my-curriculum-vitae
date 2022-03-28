import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-scroll";
import { CSSTransition } from "react-transition-group";
import FormGeneralInfo from "./adminForms/FormGeneralInfo";
import FormProfessionTitle from "./adminForms/FormProfessionTitle";
import FormResetPassword from "./adminForms/FormResetPassword";
import DisplayListProfessionTitle from "./adminDisplayLists/DisplayListProfessionTitle";
import Modal from "../Modal";
import TitleAction from "../TitleAction";
import { displayModalNoValue, closeModal } from "../../utils/modalDisplay";
import axiosInstance from "../../utils/axiosInstance";
import { apiDomain, apiVersion } from "../../apiConfig/ApiConfig";
import PropTypes from "prop-types";

function GeneralInfo({ generalInfoState }) {
  const { generalInfo, setGeneralInfo } = generalInfoState;
  const [displayForm, setDisplayForm] = useState(false);
  const [addBtn, setAddBtn] = useState(true);
  const [editbtn, setEditBtn] = useState(false);
  const infosGenContainerRef = useRef(null);
  const menuLeftRef = useRef(null);
  const divTitleRef = useRef(null);
  const profTitleRef = useRef(null);
  const passwordRef = useRef(null);
  const nodeRef = useRef(null);
  const nodeRefTwo = useRef(null);

  let switchForm = () => {
    if (addBtn) {
      setAddBtn(false);
      setEditBtn(true);
    } else {
      setEditBtn(false);
      setAddBtn(true);
    }
  };

  const handleResumeMenuOnScroll = () => {
    let infosGenContainer = infosGenContainerRef.current;
    let menuLeft = menuLeftRef.current;
    let getBounding = infosGenContainer.getBoundingClientRect();
    let bottomResume = getBounding.height + getBounding.top - 50 - 180;
    if (bottomResume <= 0) {
      menuLeft.setAttribute(
        "style",
        "position: absolute; bottom: 0; top: unset"
      );
    } else {
      menuLeft.removeAttribute("style");
    }
    if (getBounding.top < 30) {
      menuLeft.classList.add("menu-left-fixed");
    } else {
      menuLeft.classList.remove("menu-left-fixed");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleResumeMenuOnScroll);
    return () => {
      window.removeEventListener("scroll", handleResumeMenuOnScroll);
    };
  }, []);

  useEffect(() => {
    if (generalInfo) {
      divTitleRef.current.classList.remove("title-container-info-gen");
    } else {
      divTitleRef.current.classList.add("title-container-info-gen");
    }
  }, [generalInfo]);

  const deleteInfoGen = async () => {
    const deleteInfoEndPoint = `${apiDomain}/api/${apiVersion}/infos/${generalInfo._id}`;
    await axiosInstance.delete(deleteInfoEndPoint, generalInfo).then(() => {
      divTitleRef.current.classList.add("title-container-info-gen");
      setGeneralInfo({
        firstname: "",
        lastname: "",
        address: {
          street: "",
          number: "",
          zip: "",
          city: "",
        },
        phone: "",
        email: "",
        birthdate: "",
        isoDate: "",
        licence: "",
        description: "",
      });
      closeModal(setDisplayForm);
    });
  };

  const focusOnKeypress = (elem) => {
    if (elem === "info-gen") {
      divTitleRef.current.scrollIntoView();
    } else if (elem === "prof-title") {
      profTitleRef.current.scrollIntoView();
    } else if (elem === "password") {
      passwordRef.current.scrollIntoView();
    }
  };

  const doubleCheckDelete = (
    <div className="delete-info-div">
      <h2>
        Êtes-vous sur de vouloir supprimer toutes vos informations générales ?
      </h2>
      <div>
        <button
          onClick={() => {
            deleteInfoGen();
          }}
        >
          Oui
        </button>
        <button
          onClick={() => {
            closeModal(setDisplayForm);
          }}
        >
          Non
        </button>
      </div>
    </div>
  );

  return (
    <div className="info-section">
      <div
        ref={infosGenContainerRef}
        id="infos"
        className="wrapper general-info"
      >
        <div className="title-left">Infos générales</div>
        <div className="menu-left">
          <div
            ref={menuLeftRef}
            className="list-menu-left"
            style={{ top: 30 + "px" }}
          >
            <ul>
              <li
                tabIndex={0}
                onKeyPress={() => {
                  focusOnKeypress("info-gen");
                }}
              >
                <Link
                  activeClass="active"
                  to="info-gen"
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={1000}
                >
                  Infos générales
                </Link>
              </li>
              <li
                tabIndex={0}
                onKeyPress={() => {
                  focusOnKeypress("prof-title");
                }}
              >
                <Link
                  activeClass="active"
                  to="prof-title"
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={1000}
                >
                  Profession
                </Link>
              </li>
              <li
                tabIndex={0}
                onKeyPress={() => {
                  focusOnKeypress("password");
                }}
              >
                <Link
                  activeClass="active"
                  to="password"
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={1000}
                >
                  Changer mot de passe
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="info-general-container">
          <div ref={divTitleRef} id="info-gen" className="info-container">
            <TitleAction
              format="delete"
              title="Infos générales"
              btnTitle="Supprimer vos informations générales"
              action={() => displayModalNoValue(setDisplayForm)}
              btnState={{ generalInfo }}
            />

            <div className="forms-block">
              <FormGeneralInfo generalInfoState={generalInfoState} />
            </div>
          </div>
          <div
            ref={profTitleRef}
            id="prof-title"
            className="profession-title-container"
          >
            <TitleAction
              title="Profession"
              btnTitle={
                addBtn
                  ? "Éditer un titre de profession"
                  : "Ajouter un titre de profession"
              }
              action={switchForm}
              btnState={{ addBtn, editbtn }}
            />

            <div className="forms-block">
              <CSSTransition
                nodeRef={nodeRef}
                in={addBtn}
                timeout={500}
                classNames="add"
                unmountOnExit
              >
                <div ref={nodeRef} className="form-container">
                  <FormProfessionTitle add={true} />
                </div>
              </CSSTransition>
              <CSSTransition
                nodeRef={nodeRefTwo}
                in={editbtn}
                timeout={500}
                classNames="edit"
                unmountOnExit
              >
                <div ref={nodeRefTwo} className="list-container">
                  <h3>Édition</h3>
                  <DisplayListProfessionTitle />
                </div>
              </CSSTransition>
            </div>
          </div>
          {generalInfo.userId && (
            <div
              ref={passwordRef}
              id="password"
              className="change-password-container"
            >
              <FormResetPassword userId={generalInfo.userId} />
            </div>
          )}
        </div>
      </div>
      {displayForm && (
        <Modal
          formType={"deleteInfo"}
          setDisplayForm={setDisplayForm}
          div={doubleCheckDelete}
        />
      )}
    </div>
  );
}

GeneralInfo.propTypes = {
  generalInfoState: PropTypes.shape({
    generalInfo: PropTypes.object,
    setGeneralInfo: PropTypes.func,
  }),
};

export default GeneralInfo;
