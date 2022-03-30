import React, { useState, useCallback, useEffect, createRef } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { apiDomain, apiVersion } from "../../../apiConfig/ApiConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import workingData from "../../../utils/workingData";
import FormEducExpe from "../adminForms/FormEducExpe";
import { CSSTransition } from "react-transition-group";

function DisplayListEducExpe() {
  const [arrayEduc, setArrayEduc] = useState([]);
  const [arrayExpe, setArrayExpe] = useState([]);
  const [formListState, setFormListState] = useState({});
  const [lastFormListOpen, setLastFormListOpen] = useState();

  const getData = useCallback(async () => {
    const getListEducExpeEndPoint = `${apiDomain}/api/${apiVersion}/educs-exps/educs-exps-list`;
    await axiosInstance.get(getListEducExpeEndPoint).then((response) => {
      const workingDatas = workingData(response.data, "educExpe");
      setArrayEduc(workingDatas[0]);
      setArrayExpe(workingDatas[1]);
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

  const formatDate = (date) => {
    let year = date.split("-")[0];
    return year;
  };

  const onClickDelete = async (data) => {
    const deleteEducExpeEndPoint = `${apiDomain}/api/${apiVersion}/educs-exps/${data._id}`;
    await axiosInstance.delete(deleteEducExpeEndPoint, data).then(() => {
      if (data.educExpe === "experience") {
        setArrayExpe([...arrayExpe].filter((item) => item._id !== data._id));
      } else if (data.educExpe === "education") {
        setArrayEduc([...arrayEduc].filter((item) => item._id !== data._id));
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
    let formatDateStart = formatDate(item.dateStart);
    let formatDateEnd = formatDate(item.dateEnd);
    return (
      <li key={item._id}>
        <div className="div-list-container">
          <div className="div-list-info-container">
            <div className="date-list">
              {formatDateStart} - {formatDateEnd}
            </div>
            <div className="title-list">{item.titleEducExpe}</div>
          </div>
          <div className="div-list-btn-container">
            <button
              className="btn-list-edit"
              title="Éditer"
              onClick={() => displayForm(item._id)}
            >
              {lastFormListOpen === item._id ? (
                <FontAwesomeIcon icon="chevron-up" />
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
            <FormEducExpe
              value={item}
              educState={{ arrayEduc, setArrayEduc }}
              expeState={{ arrayExpe, setArrayExpe }}
            />
          </div>
        </CSSTransition>
      </li>
    );
  };

  return (
    <>
      <div>
        <h4>Éducation</h4>
        {arrayEduc.length >= 1 ? (
          <ul>
            {arrayEduc.map((item) => {
              const itemRef = createRef(null);
              return liListRender(item, itemRef);
            })}
          </ul>
        ) : (
          <p>Pas de données à afficher !</p>
        )}
      </div>
      <div>
        <h4>Expérience</h4>
        {arrayExpe.length >= 1 ? (
          <ul>
            {arrayExpe.map((item) => {
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

export default DisplayListEducExpe;
