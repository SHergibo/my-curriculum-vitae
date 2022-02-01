import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "./../utils/axiosInstance";
import { apiDomain, apiVersion } from "../apiConfig/ApiConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "./Modal";
import { displayModal } from "./../utils/modalDisplay";
import FormProject from "./FormProject";

function DisplayListProjects() {
  const [value, setValue] = useState({});
  const [arrayProject, setArrayProject] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);

  const getData = useCallback(async () => {
    const getListProjectPoint = `${apiDomain}/api/${apiVersion}/projects/projects-list`;
    await axiosInstance.get(getListProjectPoint).then((response) => {
      setArrayProject(response.data);
    });
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const onClickDelete = async (data) => {
    const deleteProjectEndPoint = `${apiDomain}/api/${apiVersion}/projects/${data._id}`;
    await axiosInstance.delete(deleteProjectEndPoint, data).then(() => {
      setArrayProject(
        [...arrayProject].filter((item) => item._id !== data._id)
      );
    });
  };

  let liListProjects = arrayProject.map((item) => {
    return (
      <li key={item._id}>
        <div className="div-list-container">
          <div className="title-list">{item.projectName}</div>
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
  });

  return (
    <>
      <div>
        <h4>Projets</h4>
        <ul>{liListProjects}</ul>
      </div>
      {displayForm && (
        <Modal
          div={
            <FormProject
              value={value}
              projectState={{ arrayProject, setArrayProject }}
              setDisplayForm={setDisplayForm}
            />
          }
          setDisplayForm={setDisplayForm}
        />
      )}
    </>
  );
}

export default DisplayListProjects;
