import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faEdit, faPercentage, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from './../utils/axiosInstance';
import { apiDomain, apiVersion } from './../apiConfig/ApiConfig';
import checkSuccess from './../utils/checkSuccess';
import { CSSTransition } from 'react-transition-group';

function Skills() {
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
    const addSkillEndPoint = `${apiDomain}/api/${apiVersion}/skill`;
    await axiosInstance.post(addSkillEndPoint, data)
      .then((response) => {
        checkSuccess(response.status, success, setSuccess, 2);
      });
  };

  const onSubmitEdit = async (data) => {
    console.log("edit");
    console.log(data);
  };

  const { register, handleSubmit, errors } = useForm({
    mode: "onChange"
  });

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
                      <label htmlFor="nameSkill">Nom de la compétences *</label>
                      <div>
                        <span><FontAwesomeIcon icon={faGraduationCap} /></span>
                        <input name="nameSkill" type="text" id="nameSkill" placeholder="Nom de la compétences" ref={register({ required: true })} />
                      </div>
                      {errors.nameSkill && <span className="error-message">Ce champ est requis</span>}
                    </div>
                    <div className="input">
                      <label htmlFor="percentage">Pourcentage *</label>
                      <div>
                        <span><FontAwesomeIcon icon={faPercentage} /></span>
                        <input name="percentage" type="number" id="percentage" placeholder="Pourcentage" ref={register({ required: true })} />
                      </div>
                      {errors.percentage && <span className="error-message">Ce champ est requis</span>}
                    </div>
                  </div>
                  <div className="label-checkbox-container skills-checkbox-container">
                    <label className="container-checkbox">Compétences code
                      <input type="radio" defaultChecked="checked" name="skillCategory" value="codingSkill" ref={register({ required: true })} />
                      <span className="checkmark"></span>
                    </label>
                    <label className="container-checkbox">Compétences générales
                      <input type="radio" name="skillCategory" value="generalSkill" ref={register({ required: true })} />
                      <span className="checkmark"></span>
                    </label>
                    <label className="container-checkbox">Langues
                      <input type="radio" name="skillCategory" value="language" ref={register({ required: true })} />
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
              <div className="form-container">
                Edition Education experience
              </div>
            </CSSTransition>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Skills;