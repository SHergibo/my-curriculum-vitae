import React, { useState, useEffect, useCallback, createRef } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { apiDomain, apiVersion } from "../../../apiConfig/ApiConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormProject from "../adminForms/FormProject";
import { CSSTransition } from "react-transition-group";

function DisplayListProfessionTitle() {
  const [arrayProfessionTitle, setArrayProfessionTitle] = useState([]);
  const [formListState, setFormListState] = useState({});
  const [lastFormListOpen, setLastFormListOpen] = useState();

  const getData = useCallback(async () => {
    const getListProjectPoint = `${apiDomain}/api/${apiVersion}/projects/projects-list`;
    await axiosInstance.get(getListProjectPoint).then((response) => {
      setArrayProfessionTitle(response.data);
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
    const deleteProjectEndPoint = `${apiDomain}/api/${apiVersion}/projects/${data._id}`;
    await axiosInstance.delete(deleteProjectEndPoint, data).then(() => {
      setArrayProfessionTitle(
        [...arrayProfessionTitle].filter((item) => item._id !== data._id)
      );
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

  let liListProjects = arrayProfessionTitle.map((item) => {
    const itemRef = createRef(null);
    return (
      <li key={item._id}>
        <div className="div-list-container">
          <div className="div-list-info-container">
            <div className="title-list">{item.projectName}</div>
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
            <FormProject
              value={item}
              projectState={{ arrayProfessionTitle, setArrayProfessionTitle }}
            />
          </div>
        </CSSTransition>
      </li>
    );
  });

  return (
    <>
      <div>
        <h4>Projets</h4>
        {arrayProfessionTitle.length >= 1 ? (
          <ul>{liListProjects}</ul>
        ) : (
          <p>Pas de données à afficher !</p>
        )}
      </div>
    </>
  );
}

export default DisplayListProfessionTitle;
