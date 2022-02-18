import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { apiDomain, apiVersion } from "../../../apiConfig/ApiConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../../Modal";
import workingData from "../../../utils/workingData";
import { displayModal } from "../../../utils/modalDisplay";
import FormSkill from "../adminForms/FormSkill";

function DisplayListSkill() {
  const [value, setValue] = useState({});
  const [arrayCodingSkill, setArrayCodingSkill] = useState([]);
  const [arrayGeneralSkill, setArrayGeneralSkill] = useState([]);
  const [arrayLanguage, setArrayLanguage] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);

  const getData = useCallback(async () => {
    const getListSkillEndPoint = `${apiDomain}/api/${apiVersion}/skills/skills-list`;
    await axiosInstance.get(getListSkillEndPoint).then((response) => {
      const workingDatas = workingData(response.data, "skill");
      setArrayCodingSkill(workingDatas[0]);
      setArrayGeneralSkill(workingDatas[1]);
      setArrayLanguage(workingDatas[2]);
    });
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const onClickDelete = async (data) => {
    const deleteSkillEndPoint = `${apiDomain}/api/${apiVersion}/skills/${data._id}`;
    await axiosInstance.delete(deleteSkillEndPoint, data).then(() => {
      if (data.skillCategory === "codingSkill") {
        setArrayCodingSkill(
          [...arrayCodingSkill].filter((item) => item._id !== data._id)
        );
      } else if (data.skillCategory === "generalSkill") {
        setArrayGeneralSkill(
          [...arrayGeneralSkill].filter((item) => item._id !== data._id)
        );
      } else if (data.skillCategory === "language") {
        setArrayLanguage(
          [...arrayLanguage].filter((item) => item._id !== data._id)
        );
      }
    });
  };

  let liListCodingSkill;
  let liListGeneralSkill;
  let liListLanguage;

  const liListRender = (item) => {
    return (
      <li key={item._id}>
        <div className="div-list-container">
          <div className="skill-list">{item.nameSkill}</div>
        </div>
        <div className="div-list-btn-container">
          <button
            className="btn-list-edit"
            title="Éditer"
            onClick={() => displayModal(item, setDisplayForm, setValue)}
          >
            <FontAwesomeIcon icon="edit" />
          </button>
          <button
            className="btn-list-delete"
            title="Supprimer"
            onClick={() => onClickDelete(item)}
          >
            <FontAwesomeIcon icon="trash-alt" />
          </button>
        </div>
      </li>
    );
  };

  if (arrayCodingSkill) {
    liListCodingSkill = arrayCodingSkill.map((item) => {
      return liListRender(item);
    });
  }

  if (arrayGeneralSkill) {
    liListGeneralSkill = arrayGeneralSkill.map((item) => {
      return liListRender(item);
    });
  }

  if (arrayLanguage) {
    liListLanguage = arrayLanguage.map((item) => {
      return liListRender(item);
    });
  }

  return (
    <>
      <div>
        <h4>Compétences</h4>
        <ul>{liListCodingSkill}</ul>
      </div>
      <div>
        <h4>Compétences générales</h4>
        <ul>{liListGeneralSkill}</ul>
      </div>
      <div>
        <h4>Langues</h4>
        <ul>{liListLanguage}</ul>
      </div>
      {displayForm && (
        <Modal
          div={
            <FormSkill
              value={value}
              codingSkillState={{ arrayCodingSkill, setArrayCodingSkill }}
              generalSkillState={{ arrayGeneralSkill, setArrayGeneralSkill }}
              languageState={{ arrayLanguage, setArrayLanguage }}
              setDisplayForm={setDisplayForm}
            />
          }
          setDisplayForm={setDisplayForm}
        />
      )}
    </>
  );
}

export default DisplayListSkill;
