import React, { useState, useEffect, useCallback, createRef } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { apiDomain, apiVersion } from "../../../apiConfig/ApiConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import workingData from "../../../utils/workingData";
import FormSkill from "../adminForms/FormSkill";
import { CSSTransition } from "react-transition-group";

function DisplayListSkill() {
  const [arrayCodingSkill, setArrayCodingSkill] = useState([]);
  const [arrayGeneralSkill, setArrayGeneralSkill] = useState([]);
  const [arrayLanguage, setArrayLanguage] = useState([]);
  const [formListState, setFormListState] = useState({});
  const [lastFormListOpen, setLastFormListOpen] = useState();

  const getData = useCallback(async () => {
    const getListSkillEndPoint = `${apiDomain}/api/${apiVersion}/skills/skills-list`;
    await axiosInstance.get(getListSkillEndPoint).then((response) => {
      const workingDatas = workingData(response.data, "skill");
      setArrayCodingSkill(workingDatas[0]);
      setArrayGeneralSkill(workingDatas[1]);
      setArrayLanguage(workingDatas[2]);
      response.data.forEach((data) => {
        setFormListState((prevObject) => ({
          ...prevObject,
          [data._id]: false,
        }));
      });
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

  const displayForm = (id) => {
    if (lastFormListOpen && lastFormListOpen !== id) {
      setFormListState((prevObject) => ({
        ...prevObject,
        [lastFormListOpen]: false,
      }));
    }
    setFormListState((prevObject) => ({
      ...prevObject,
      [id]: !formListState[id],
    }));
    if (lastFormListOpen === id) setLastFormListOpen();
    if (lastFormListOpen !== id) setLastFormListOpen(id);
  };

  const liListRender = (item, itemRef) => {
    return (
      <li key={item._id}>
        <div className="div-list-container">
          <div className="div-list-info-container">
            <div className="skill-list">{item.nameSkill}</div>
          </div>
          <div className="div-list-btn-container">
            <button
              className="btn-list-edit"
              title="Éditer"
              onClick={() => displayForm(item._id)}
            >
              {lastFormListOpen === item._id ? (
                <FontAwesomeIcon icon="times" />
              ) : (
                <FontAwesomeIcon icon="edit" />
              )}
            </button>
            <button
              className="btn-list-delete"
              title="Supprimer"
              onClick={() => onClickDelete(item)}
            >
              <FontAwesomeIcon icon="trash-alt" />
            </button>
          </div>
        </div>
        <CSSTransition
          nodeRef={itemRef}
          in={formListState[item._id]}
          classNames="form-list"
          unmountOnExit
          timeout={500}
        >
          <div ref={itemRef} className="form-in-list">
            <FormSkill
              value={item}
              codingSkillState={{ arrayCodingSkill, setArrayCodingSkill }}
              generalSkillState={{ arrayGeneralSkill, setArrayGeneralSkill }}
              languageState={{ arrayLanguage, setArrayLanguage }}
            />
          </div>
        </CSSTransition>
      </li>
    );
  };

  return (
    <>
      <div>
        <h4>Compétences</h4>
        {arrayCodingSkill.length >= 1 ? (
          <ul>
            {arrayCodingSkill.map((item) => {
              const itemRef = createRef(null);
              return liListRender(item, itemRef);
            })}
          </ul>
        ) : (
          <p>Pas de données à afficher !</p>
        )}
      </div>
      <div>
        <h4>Compétences générales</h4>
        {arrayGeneralSkill.length >= 1 ? (
          <ul>
            {arrayGeneralSkill.map((item) => {
              const itemRef = createRef(null);
              return liListRender(item, itemRef);
            })}
          </ul>
        ) : (
          <p>Pas de données à afficher !</p>
        )}
      </div>
      <div>
        <h4>Langues</h4>
        {arrayLanguage.length >= 1 ? (
          <ul>
            {arrayLanguage.map((item) => {
              const itemRef = createRef(null);
              return liListRender(item, itemRef);
            })}
          </ul>
        ) : (
          <p>Pas de données à afficher !</p>
        )}
      </div>
    </>
  );
}

export default DisplayListSkill;
