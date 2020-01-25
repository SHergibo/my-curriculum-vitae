import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faEdit, faHourglassStart, faHourglassEnd, faUserGraduate, faSchool } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from './../utils/axiosInstance';
import { apiDomain, apiVersion } from './../apiConfig/ApiConfig';
import checkSuccess from './../utils/checkSuccess';
import { CSSTransition } from 'react-transition-group';
import DisplayListEducExpe from './DisplayListEducExpe';

function EducExpe() {
  const [success, setSuccess] = useState(false);
  const [addBtn, setAddBtn] = useState(true);
  const [editbtn, setEditBtn] = useState(false);
  const [arrayEduc, setArrayEduc] = useState([]);
  const [arrayExpe, setArrayExpe] = useState([]);

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

  const onClickEdit = async (data) => {
    console.log("edit");
    console.log(data);
  };

  const onClickDelete = async (data) => {
    console.log("edit");
    console.log(data);
  };

  const { register, handleSubmit, errors } = useForm({
    mode: "onChange"
  });

  return (
    <div className="educExpe-section">
      <div id="educexpe" className="wrapper">
        <div className="title-left">
          Éducation / Éxperience
        </div>
        <div className="educExpe-container">
          <div className="title-container">
            <h2>Éducation / Éxperience</h2>
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
                <h3>Ajout</h3>
                <form onSubmit={handleSubmit(onSubmitAdd)}>
                  <div className="input-container">
                    <div className="input">
                      <label htmlFor="dateStart">Date de début *</label>
                      <div>
                        <span><FontAwesomeIcon icon={faHourglassStart} /></span>
                        <input name="dateStart" type="text" id="dateStart" placeholder="Date de début" ref={register({ required: true })} />
                      </div>
                      {errors.dateStart && <span className="error-message">Ce champ est requis</span>}
                    </div>
                    <div className="input">
                      <label htmlFor="dateEnd">Date de fin *</label>
                      <div>
                        <span><FontAwesomeIcon icon={faHourglassEnd} /></span>
                        <input name="dateEnd" type="text" id="dateEnd" placeholder="Date de fin" ref={register({ required: true })} />
                      </div>
                      {errors.dateEnd && <span className="error-message">Ce champ est requis</span>}
                    </div>
                  </div>
                  <div className="input-container">
                    <div className="input">
                      <label htmlFor="titleEducExpe">Titre du diplôme / formation *</label>
                      <div>
                        <span><FontAwesomeIcon icon={faUserGraduate} /></span>
                        <input name="titleEducExpe" type="text" id="titleEducExpe" placeholder="Titre du diplôme / formation" ref={register({ required: true })} />
                      </div>
                      {errors.titleEducExpe && <span className="error-message">Ce champ est requis</span>}
                    </div>
                    <div className="input">
                      <label htmlFor="placeEducExpe">Nom du centre de formation / école *</label>
                      <div>
                        <span><FontAwesomeIcon icon={faSchool} /></span>
                        <input name="placeEducExpe" type="text" id="placeEducExpe" placeholder="Nom du centre de formation / école" ref={register({ required: true })} />
                      </div>
                      {errors.placeEducExpe && <span className="error-message">Ce champ est requis</span>}
                    </div>
                  </div>
                  <div className="label-checkbox-container">
                    <label className="container-checkbox">Éxperience
                      <input type="radio" defaultChecked="checked" name="educExpe" value="experience" ref={register({ required: true })} />
                      <span className="checkmark"></span>
                    </label>
                    <label className="container-checkbox">Éducation
                      <input type="radio" name="educExpe" value="education" ref={register({ required: true })} />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="btn-container">
                    <button className="submit-contact" type="submit">
                      Ajouter
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <span className="success-message">
                      {success && <span ><FontAwesomeIcon icon={faCheck} /></span>}
                    </span>
                  </div>
                </form>
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
                    <DisplayListEducExpe array={arrayEduc} submit={onClickEdit} delete={onClickDelete}/>
                  <h4>Éxperience</h4>
                    <DisplayListEducExpe array={arrayExpe}  submit={onClickEdit} delete={onClickDelete} />
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