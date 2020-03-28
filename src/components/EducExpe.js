import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from './../utils/axiosInstance';
import { apiDomain, apiVersion } from './../apiConfig/ApiConfig';
import checkSuccess from './../utils/checkSuccess';
import workingData from './../utils/workingData';
import { CSSTransition } from 'react-transition-group';
import DisplayListEducExpe from './DisplayListEducExpe';
import FormEducExpe from './FormEducExpe';

function EducExpe() {
  const [titleEducExpe, setTitleEducEpxe] = useState("Éducation / Expérience");
  const titleRef = useRef(null);
  const [success, setSuccess] = useState(false);
  const [addBtn, setAddBtn] = useState(true);
  const [editbtn, setEditBtn] = useState(false);
  const [arrayEduc, setArrayEduc] = useState([]);
  const [arrayExpe, setArrayExpe] = useState([]);
  const [idItem, setIdItem] = useState();
  const [displayForm, setDisplayForm] = useState(false);
  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);

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
        checkSuccess(response.status, setSuccess, 1);
        e.target.reset();
        setDateStart(null);
        setDateEnd(null);
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
      closeModal();
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
                <FormEducExpe 
                handleFunction={onSubmitAdd} 
                formType="add" 
                success={success} 
                dateStart={dateStart} 
                setDateStart={setDateStart} 
                dateEnd={dateEnd} 
                setDateEnd={setDateEnd} />
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
                <DisplayListEducExpe 
                arrayEduc={arrayEduc} 
                arrayExpe={arrayExpe} 
                submit={onClickEdit} 
                setId={setIdFunc} 
                funcDelete={onClickDelete} 
                success={success} 
                displayForm={displayForm} 
                setDisplayForm={setDisplayForm} 
                closeModal={closeModal} 
                dateStart={dateStart} 
                setDateStart={setDateStart} 
                dateEnd={dateEnd} 
                setDateEnd={setDateEnd}/>
              </div>
            </CSSTransition>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EducExpe;