import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from '../utils/axiosInstance';
import axios from 'axios';
import { apiDomain, apiVersion } from '../apiConfig/ApiConfig';
import checkSuccess from '../utils/checkSuccess';
import { CSSTransition } from 'react-transition-group';
import DisplayListProjects from './DisplayListProjects';
import FormProject from './FormProject';

function Projects() {
  const [success, setSuccess] = useState(false);
  const [addBtn, setAddBtn] = useState(true);
  const [editbtn, setEditBtn] = useState(false);
  const [arrayProject, setArrayProject] = useState([]);
  const [idItem, setIdItem] = useState();
  const [displayForm, setDisplayForm] = useState(false);


  let switchForm = () => {
    if (addBtn) {
      setAddBtn(false);
      setEditBtn(true);
      getData();
    } else {
      setEditBtn(false);
      setAddBtn(true);
    }
  }

  const getData = async () => {
    const getListProjectPoint = `${apiDomain}/api/${apiVersion}/project/project-list`;
    await axiosInstance.get(getListProjectPoint)
      .then((response) => {
        setArrayProject(response.data);
      });
  };

  const onSubmitAdd = async (data, e) => {
    const formData = new FormData();
    formData.append('projectName', data.projectName);
    formData.append('url', data.projectUrl);
    formData.append('img', data.projectImg[0]);
    formData.append('altImg', data.projectAltImg);
    formData.append('description', data.descriptionProject);
    formData.append('technoUsedFront', JSON.stringify({"react" : data.react, "ember" : data.ember, "angular" : data.angular}));
    formData.append('technoUsedBack', JSON.stringify({"express" : data.express, "nodejs" : data.nodejs, "mongodb" : data.mongodb}));
    const getListProjectPoint = `${apiDomain}/api/${apiVersion}/project`;
    await axios.post(getListProjectPoint, formData, {
      headers: { 'content-type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
     }
    })
      .then((response) => {
        checkSuccess(response.status, success, setSuccess, 3);
        e.target.reset();
      });
  };

  const setIdFunc = (data) => {
    setIdItem(data);
  }

  const closeModal = () => {
    let body = document.getElementsByTagName("body")[0];
    body.removeAttribute('style');
    setDisplayForm(false);
  }

  const onClickEdit = async (data) => {
    const formData = new FormData();
    formData.append('projectName', data.projectName);
    formData.append('url', data.projectUrl);
    if(data.projectImg){
      formData.append('img', data.projectImg[0]);
    }
    formData.append('altImg', data.projectAltImg);
    formData.append('description', data.descriptionProject);
    formData.append('technoUsedFront', JSON.stringify({"react" : data.react, "ember" : data.ember, "angular" : data.angular}));
    formData.append('technoUsedBack', JSON.stringify({"express" : data.express, "nodejs" : data.nodejs, "mongodb" : data.mongodb}));
    const editEducExpeEndPoint = `${apiDomain}/api/${apiVersion}/project/${idItem}`;
    await axiosInstance.patch(editEducExpeEndPoint, formData)
      .then((response) => {
        let arrayResponse = [response.data];
        setArrayProject([...arrayProject].map(obj => arrayResponse.find(o => o._id === obj._id) || obj));
        closeModal();
      });
  };

  const onClickDelete = async (data) => {
    const deleteProjectEndPoint = `${apiDomain}/api/${apiVersion}/project/${data._id}`;
    await axiosInstance.delete(deleteProjectEndPoint, data)
      .then(() => {
        setArrayProject([...arrayProject].filter(item => item._id !== data._id));
      });
  };

  return (
    <div className="project-section"> 
      <div id="projects" className="wrapper">
        <div className="title-left-admin">
          Projets
        </div>
        <div className="project-container">
          <div className="title-container">
            <h2>Projets</h2>
            <div className="btn-switch-container">
              <button onClick={() => switchForm()}>
                {addBtn && (
                  <FontAwesomeIcon icon={faEdit} />
                )}
                {editbtn && (
                  <FontAwesomeIcon icon={faPlus} />
                )}
              </button>
            </div>
          </div>

          <div className="forms-block">
            <CSSTransition
              in={addBtn}
              timeout={500}
              classNames="add"
              unmountOnExit
            >
              <div className="form-container">
                <FormProject handleFunction={onSubmitAdd} formType="add" success={success} />
              </div>
            </CSSTransition>
            <CSSTransition
              in={editbtn}
              timeout={500}
              classNames="edit"
              unmountOnExit
            >
              <div className="list-container">
                <h3>Édition</h3>
                <DisplayListProjects arrayProject={arrayProject} submit={onClickEdit} setId={setIdFunc} funcDelete={onClickDelete} success={success} displayForm={displayForm} setDisplayForm={setDisplayForm} closeModal={closeModal} />
              </div>
            </CSSTransition>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects;