import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axiosInstance from '../utils/axiosInstance';
import axios from 'axios';
import { apiDomain, apiVersion } from '../apiConfig/ApiConfig';
import checkSuccess from '../utils/checkSuccess';
import { CSSTransition } from 'react-transition-group';
import DisplayListProjects from './DisplayListProjects';
import FormProject from './FormProject';

function Projects() {
  const successMessage = useRef(null);
  const [success, setSuccess] = useState(false);
  const [addBtn, setAddBtn] = useState(true);
  const [editbtn, setEditBtn] = useState(false);
  const [arrayProject, setArrayProject] = useState([]);
  const [idItem, setIdItem] = useState(null);
  const [displayForm, setDisplayForm] = useState(false);
  const [imgProjectName, setImgProjectName] = useState("Image du projet");
  const nodeRef = useRef(null);
  const nodeRefTwo = useRef(null);


  let switchForm = () => {
    if (addBtn) {
      setAddBtn(false);
      setEditBtn(true);
      setImgProjectName("Image du projet");
      getData();
    } else {
      setEditBtn(false);
      setAddBtn(true);
      setImgProjectName("Image du projet");
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
        checkSuccess(response.status, setSuccess, successMessage);
        e.target.reset();
        setImgProjectName('Image du projet');
      });
  };

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
                  <FontAwesomeIcon icon="edit" />
                )}
                {editbtn && (
                  <FontAwesomeIcon icon="plus" />
                )}
              </button>
            </div>
          </div>

          <div className="forms-block">
            <CSSTransition
              nodeRef={nodeRef}
              in={addBtn}
              timeout={500}
              classNames="add"
              unmountOnExit
            >
              <div ref={nodeRef} className="form-container">
                <FormProject 
                handleFunction={onSubmitAdd} 
                formType="add" 
                success={success} 
                successMessage={successMessage}
                imgProjectName={imgProjectName} 
                setImgProjectName={setImgProjectName} />
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
                <DisplayListProjects 
                arrayProject={arrayProject} 
                submit={onClickEdit} 
                setIdItem={setIdItem} 
                funcDelete={onClickDelete} 
                success={success} 
                successMessage={successMessage}
                displayForm={displayForm} 
                setDisplayForm={setDisplayForm} 
                closeModal={closeModal} 
                imgProjectName={imgProjectName} 
                setImgProjectName={setImgProjectName} />
              </div>
            </CSSTransition>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects;