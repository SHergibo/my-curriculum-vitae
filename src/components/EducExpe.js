import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from './../utils/axiosInstance';
import { apiDomain, apiVersion } from './../apiConfig/ApiConfig';
import checkSuccess from './../utils/checkSuccess';
import { CSSTransition } from 'react-transition-group';
import DisplayListEducExpe from './DisplayListEducExpe';
import FormEducExpe from './FormEducExpe';

function EducExpe() {
  const [success, setSuccess] = useState(false);
  const [addBtn, setAddBtn] = useState(true);
  const [editbtn, setEditBtn] = useState(false);
  const [arrayEduc, setArrayEduc] = useState([]);
  const [arrayExpe, setArrayExpe] = useState([]);
  const [idItem, setIdItem] = useState();

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
        workingData(response.data);
      });
  };

  const workingData = (data) => {
    let education = [];
    let experience = [];
    data.map((item) => {
      if (item.educExpe === "education") {
        education.push(item)
      } else if (item.educExpe === "experience") {
        experience.push(item);
      }
      return item;
    });
    setArrayEduc(education);
    setArrayExpe(experience);
  };

  const onSubmitAdd = async (data) => {
    const addEducExpeEndPoint = `${apiDomain}/api/${apiVersion}/educExpe`;
    await axiosInstance.post(addEducExpeEndPoint, data)
      .then((response) => {
        checkSuccess(response.status, success, setSuccess, 1);
      });
  };

  const setIdFunc = (data) => {
    setIdItem(data);
    console.log(data)
  }

  const onClickEdit = async (data) => {
    const editEducExpeEndPoint = `${apiDomain}/api/${apiVersion}/educExpe/${idItem}`;
    await axiosInstance.patch(editEducExpeEndPoint, data)
    .then((response) => {
      console.log(response);
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
            <h2>Éducation / Expérience</h2>
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
                <FormEducExpe handleFunction={onSubmitAdd} formType="add" success={success} />
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
                <ul>
                  <h4>Éducation</h4>
                    <DisplayListEducExpe array={arrayEduc} submit={onClickEdit} setId={setIdFunc} funcDelete={onClickDelete} success={success}/>
                  <h4>Expérience</h4>
                    <DisplayListEducExpe array={arrayExpe}  submit={onClickEdit} setId={setIdFunc} funcDelete={onClickDelete} success={success}/>
                </ul>
              </div>
            </CSSTransition>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EducExpe;