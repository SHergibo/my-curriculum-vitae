import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axiosInstance from './../utils/axiosInstance';
import { apiDomain, apiVersion } from './../apiConfig/ApiConfig';
import checkSuccess from './../utils/checkSuccess';
import workingData from './../utils/workingData';
import { CSSTransition } from 'react-transition-group';
import DisplayListEducExpe from './DisplayListEducExpe';
import FormEducExpe from './FormEducExpe';
import { closeModal } from './../utils/modalDisplay';

function EducExpe() {
  const [titleEducExpe, setTitleEducEpxe] = useState("Éducation / Expérience");
  const titleRef = useRef(null);
  const successMessage = useRef(null);
  const [addBtn, setAddBtn] = useState(true);
  const [editbtn, setEditBtn] = useState(false);
  const [arrayEduc, setArrayEduc] = useState([]);
  const [arrayExpe, setArrayExpe] = useState([]);
  const [idItem, setIdItem] = useState(null);
  const [displayForm, setDisplayForm] = useState(false);
  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);
  const nodeRef = useRef(null);
  const nodeRefTwo = useRef(null);

  useEffect(() => {
    let windowWidth = window.innerWidth;
    let titleContainer = titleRef.current;
    if(windowWidth < 560){
      setTitleEducEpxe("Éduc / Expé");
      titleContainer.classList.add("title-mobile-educ-expe");
    } else if(windowWidth >= 560){
      setTitleEducEpxe("Éducation / Expérience");
      titleContainer.classList.remove("title-mobile-educ-expe");
    }
  }, []);

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
    const getListEducExpeEndPoint = `${apiDomain}/api/${apiVersion}/educExpe/educExpe-list`;
    await axiosInstance.get(getListEducExpeEndPoint)
      .then((response) => {
        const workingDatas = workingData(response.data, "educExpe");
        setArrayEduc(workingDatas[0]);
        setArrayExpe(workingDatas[1]);
      });
  };

  const onSubmitAdd = async (data, e) => {
    const addEducExpeEndPoint = `${apiDomain}/api/${apiVersion}/educExpe`;
    await axiosInstance.post(addEducExpeEndPoint, data)
      .then((response) => {
        checkSuccess(response.status, successMessage);
        e.target.reset();
        setDateStart(null);
        setDateEnd(null);
      });
  };

  const onClickEdit = async (data) => {
    const editEducExpeEndPoint = `${apiDomain}/api/${apiVersion}/educExpe/${idItem}`;
    await axiosInstance.patch(editEducExpeEndPoint, data)
    .then((response) => {

      let arrayResponse = [response.data];
      if(data.educExpe === "experience"){
        let dataInArrayEduc = arrayEduc.find(v => v._id === response.data._id);

        if(!dataInArrayEduc){
          if(arrayExpe.find(v => v._id === response.data._id).dateStart === response.data.dateStart){
            setArrayExpe([...arrayExpe].map(obj => arrayResponse.find(o => o._id === obj._id) || obj));
          }else{
            let arrayAfterEdit = [...arrayExpe].map(obj => arrayResponse.find(o => o._id === obj._id) || obj);
            let sortArrayByDate = arrayAfterEdit.slice().sort((a, b) => new Date(b.dateStart) - new Date(a.dateStart));
            setArrayExpe(sortArrayByDate);
          }
        } else {
          setArrayEduc([...arrayEduc].filter(item => item._id !== idItem));
          setArrayExpe(arrayExpe => [...arrayExpe, response.data]);
        }
      }

      if(data.educExpe === "education"){
        let dataInArrayExpe = arrayExpe.find(v => v._id === response.data._id);

        if(!dataInArrayExpe){
          if(arrayEduc.find(v => v._id === response.data._id).dateStart === response.data.dateStart){
            setArrayEduc([...arrayEduc].map(obj => arrayResponse.find(o => o._id === obj._id) || obj));
          }else{
            let arrayAfterEdit = [...arrayEduc].map(obj => arrayResponse.find(o => o._id === obj._id) || obj);
            let sortArrayByDate = arrayAfterEdit.slice().sort((a, b) => new Date(b.dateStart) - new Date(a.dateStart));
            setArrayEduc(sortArrayByDate);
          }
        } else {
          setArrayExpe([...arrayExpe].filter(item => item._id !== idItem));
          setArrayEduc(arrayEduc => [...arrayEduc, response.data]);
        }
      }
      closeModal(setDisplayForm);
    });
  };

  const onClickDelete = async (data) => {
    const deleteEducExpeEndPoint = `${apiDomain}/api/${apiVersion}/educExpe/${data._id}`;
    await axiosInstance.delete(deleteEducExpeEndPoint, data)
    .then(() => {
      if(data.educExpe === "experience"){
        setArrayExpe([...arrayExpe].filter(item => item._id !== data._id));
      }else if(data.educExpe === "education"){
        setArrayEduc([...arrayEduc].filter(item => item._id !== data._id));
      }
    });
  };

  return (
    <div className="educExpe-section">
      <div id="educexpe" className="wrapper">
        <div className="title-left-admin">
          Éducation / Expérience
        </div>
        <div className="educExpe-container">
          <div className="title-container">
            <h2 ref={titleRef} className="title-mobile-educ-expe">{titleEducExpe}</h2>
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
                <FormEducExpe 
                handleFunction={onSubmitAdd} 
                formType="add" 
                successMessage={successMessage}
                dateStartState={{dateStart, setDateStart}}
                dateEndState={{dateEnd, setDateEnd}} />
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
                <DisplayListEducExpe 
                arrayEduc={arrayEduc} 
                arrayExpe={arrayExpe} 
                submit={onClickEdit} 
                setIdItem={setIdItem} 
                funcDelete={onClickDelete} 
                successMessage={successMessage}
                displayFormState={{displayForm, setDisplayForm}}
                dateStartState={{dateStart, setDateStart}}
                dateEndState={{dateEnd, setDateEnd}} />
              </div>
            </CSSTransition>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EducExpe;