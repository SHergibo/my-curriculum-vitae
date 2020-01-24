import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from './../utils/axiosInstance';
import { apiDomain, apiVersion } from './../apiConfig/ApiConfig';
import checkSuccess from './../utils/checkSuccess';
import { CSSTransition } from 'react-transition-group';
import FormGeneralInfo from './FormGeneralInfo';

function GeneralInfo() {
  const [success, setSuccess] = useState(false);
  const [addBtn, setAddBtn] = useState(true);
  const [editbtn, setEditBtn] = useState(false);

  let switchForm = () => {
    if (addBtn) {
      setAddBtn(false);
      setEditBtn(true);
    } else {
      setEditBtn(false);
      setAddBtn(true);
    }
  }

  const onSubmitAdd = async (data) => {
    let workingData = {
      phone : data.phoneAdd,
      email : data.emailAdd,
      address : {
        street : data.streetAdd,
        number : data.numberAdd,
        zip : data.zipAdd,
        city : data.cityAdd
      },
      birthdate : data.birthdateAdd,
      licence : data.driverLicenceAdd
    };
    console.log(workingData);
    const addGenerelInfoEndPoint = `${apiDomain}/api/${apiVersion}/info`;
    await axiosInstance.post(addGenerelInfoEndPoint, workingData)
      .then((response) => {
        checkSuccess(response.status, success, setSuccess, 0);
      });
  };

  const onSubmitEdit = async (data) => {
    console.log("edit");
    console.log(data);
  };

  return (
    <div className="info-section">
      <div id="infos" className="wrapper">
        <div className="title-right">
          Infos générales
        </div>
        <div className="info-container">
          <div className="title-container">
            <h2>Infos générales</h2>
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
              <FormGeneralInfo handleFunction={onSubmitAdd} formType="add" success={success} />
            </CSSTransition>
            <CSSTransition
              in={editbtn}
              timeout={500}
              classNames="edit"
              unmountOnExit
            >
              <FormGeneralInfo handleFunction={onSubmitEdit} formType="edit" success={success} />
            </CSSTransition>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GeneralInfo;