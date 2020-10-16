import React, { useState, useRef } from 'react';
import FormSkill from './FormSkill';
import DisplayListSkill from './DisplayListSkill';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axiosInstance from './../utils/axiosInstance';
import { apiDomain, apiVersion } from './../apiConfig/ApiConfig';
import checkSuccess from './../utils/checkSuccess';
import workingData from './../utils/workingData';
import { CSSTransition } from 'react-transition-group';

function Skills() {
  const successMessage = useRef(null);
  const [success, setSuccess] = useState(false);
  const [addBtn, setAddBtn] = useState(true);
  const [editbtn, setEditBtn] = useState(false);  
  const [arrayCodingSkill, setArrayCodingSkill] = useState([]);
  const [arrayGeneralSkill, setArrayGeneralSkill] = useState([]);
  const [arrayLanguage, setArrayLanguage] = useState([]);
  const [idItem, setIdItem] = useState();
  const [displayForm, setDisplayForm] = useState(false);
  const nodeRef = useRef(null);
  const nodeRefTwo = useRef(null);

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
    const getListSkillEndPoint = `${apiDomain}/api/${apiVersion}/skill/skill-list`;
    await axiosInstance.get(getListSkillEndPoint)
      .then((response) => {
        const workingDatas = workingData(response.data, "skill");
        setArrayCodingSkill(workingDatas[0]);
        setArrayGeneralSkill(workingDatas[1]);
        setArrayLanguage(workingDatas[2]);
      });
  };

  const onSubmitAdd = async (data, e) => {
    const addSkillEndPoint = `${apiDomain}/api/${apiVersion}/skill`;
    await axiosInstance.post(addSkillEndPoint, data)
      .then((response) => {
        checkSuccess(response.status, setSuccess, successMessage);
        e.target.reset();
      });
  };

  const closeModal = () => {
    let body = document.getElementsByTagName("body")[0];
    body.removeAttribute('style');
    setDisplayForm(false);
  }  

  const onClickEdit = async (data) => {
    const editSkillEndPoint = `${apiDomain}/api/${apiVersion}/skill/${idItem}`;
    await axiosInstance.patch(editSkillEndPoint, data)
    .then((response) => {

      let arrayResponse = [response.data];
      if(data.skillCategory === "codingSkill"){
        let dataInArrayGeneralSkill = arrayGeneralSkill.find(v => v._id === response.data._id);
        let dataInArrayLanguage = arrayLanguage.find(v => v._id === response.data._id);

        if(!dataInArrayGeneralSkill && !dataInArrayLanguage){
          setArrayCodingSkill([...arrayCodingSkill].map(obj => arrayResponse.find(o => o._id === obj._id) || obj));
        } else {
          if(dataInArrayGeneralSkill){
            setArrayGeneralSkill([...arrayGeneralSkill].filter(item => item._id !== idItem));
          } else if(dataInArrayLanguage){
            setArrayLanguage([...arrayLanguage].filter(item => item._id !== idItem));
          }
          setArrayCodingSkill(arrayCodingSkill => [...arrayCodingSkill, response.data]);
        }
      }

      if(data.skillCategory === "generalSkill"){
        let dataInArrayCodingSkill = arrayCodingSkill.find(v => v._id === response.data._id);
        let dataInArrayLanguage = arrayLanguage.find(v => v._id === response.data._id);

        if(!dataInArrayCodingSkill && !dataInArrayLanguage){
          setArrayGeneralSkill([...arrayGeneralSkill].map(obj => arrayResponse.find(o => o._id === obj._id) || obj));
        } else {
          if(dataInArrayCodingSkill){
            setArrayCodingSkill([...arrayCodingSkill].filter(item => item._id !== idItem));
          } else if(dataInArrayLanguage){
            setArrayLanguage([...arrayLanguage].filter(item => item._id !== idItem));
          }
          setArrayGeneralSkill(arrayGeneralSkill => [...arrayGeneralSkill, response.data]);
        }
      }

      if(data.skillCategory === "language"){
        let dataInArrayCodingSkill = arrayCodingSkill.find(v => v._id === response.data._id);
        let dataInGeneralSkill = arrayGeneralSkill.find(v => v._id === response.data._id);

        if(!dataInArrayCodingSkill && !dataInGeneralSkill){
          setArrayLanguage([...arrayLanguage].map(obj => arrayResponse.find(o => o._id === obj._id) || obj));
        } else {
          if(dataInArrayCodingSkill){
            setArrayCodingSkill([...arrayCodingSkill].filter(item => item._id !== idItem));
          } else if(dataInGeneralSkill){
            setArrayGeneralSkill([...arrayGeneralSkill].filter(item => item._id !== idItem));
          }
          setArrayLanguage(arrayLanguage => [...arrayLanguage, response.data]);
        }
      }
      closeModal();
    });
  };

  const onClickDelete = async (data) => {
    const deleteSkillEndPoint = `${apiDomain}/api/${apiVersion}/skill/${data._id}`;
    await axiosInstance.delete(deleteSkillEndPoint, data)
    .then(() => {
      if(data.skillCategory === "codingSkill"){
        setArrayCodingSkill([...arrayCodingSkill].filter(item => item._id !== data._id));
      }else if(data.skillCategory === "generalSkill"){
        setArrayGeneralSkill([...arrayGeneralSkill].filter(item => item._id !== data._id));
      }else if(data.skillCategory === "language"){
        setArrayLanguage([...arrayLanguage].filter(item => item._id !== data._id));
      }
    });
  };


  return (
    <div className="skill-section">
      <div id="skills" className="wrapper">
        <div className="title-right">
          Compétences
        </div>
        <div className="skill-container">
          <div className="title-container">
            <h2>Compétences</h2>
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
                <FormSkill 
                handleFunction={onSubmitAdd} 
                formType="add" 
                success={success} 
                successMessage={successMessage} />
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
                <DisplayListSkill 
                arrayCodingSkill={arrayCodingSkill} 
                arrayGeneralSkill={arrayGeneralSkill} 
                arrayLanguage={arrayLanguage} 
                submit={onClickEdit} 
                setIdItem={setIdItem} 
                funcDelete={onClickDelete} 
                success={success} 
                successMessage={successMessage}
                displayForm={displayForm} 
                setDisplayForm={setDisplayForm} 
                closeModal={closeModal}/>
              </div>
            </CSSTransition>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Skills;