import React, { useEffect, useState, useRef } from "react";
import FormGeneralInfo from "./adminForms/FormGeneralInfo";
import Modal from "../Modal";
import TitleAction from "../TitleAction";
import { displayModalNoValue, closeModal } from "../../utils/modalDisplay";
import axiosInstance from "../../utils/axiosInstance";
import { apiDomain, apiVersion } from "../../apiConfig/ApiConfig";
import PropTypes from "prop-types";

function GeneralInfo({ generalInfoState }) {
  const { generalInfo, setGeneralInfo } = generalInfoState;
  const [displayForm, setDisplayForm] = useState(false);
  const divTitleRef = useRef(null);

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
      <div id="infos" className="wrapper">
        <div className="title-right">Infos générales</div>
        <div ref={divTitleRef} className="info-container">
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
