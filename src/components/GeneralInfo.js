import React, { useLayoutEffect, useState, useRef } from 'react';
import FormGeneralInfo from './FormGeneralInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from "./Modal";
import axiosInstance from './../utils/axiosInstance';
import { apiDomain, apiVersion } from './../apiConfig/ApiConfig';
import PropTypes from 'prop-types';

function GeneralInfo({ data, onSubmitAdd, onSubmitEdit, success, successMessage, showEditForm, setShowEditForm }) {
  const [generalInfo, setGeneralInfo] = useState();
  const [displayForm, setDisplayForm] = useState(false);
  const divTitleRef = useRef(null);

  useLayoutEffect(() => {
    let divTitle = divTitleRef.current;
    if(data){
      setGeneralInfo(data);
      divTitle.classList.remove('title-container-info-gen');
    }else{
      setGeneralInfo();
      divTitle.classList.add('title-container-info-gen');
    }
  }, [data]);

  const modalDeleteInfo = () => {
    setDisplayForm(true);
  };

  const closeModal = () => {
    let body = document.getElementsByTagName("body")[0];
    body.removeAttribute('style');
    setDisplayForm(false);
  }
  
  const deleteInfoGen = async () =>{
    let divTitle = divTitleRef.current;
    const deleteInfoEndPoint = `${apiDomain}/api/${apiVersion}/info/${data._id}`;
    await axiosInstance.delete(deleteInfoEndPoint, data)
    .then(() => {
      divTitle.classList.add('title-container-info-gen');
      setShowEditForm(false);
      setGeneralInfo();
      closeModal();
    });
  };

  const doubleCheckDelete = <div className="delete-info-div">
                              <h2>Êtes-vous sur de vouloir supprimer toutes vos informations générales ?</h2>
                              <div>
                                <button onClick={()=>{deleteInfoGen()}}>Oui</button>
                                <button onClick={()=>{closeModal()}}>Non</button>
                              </div>
                            </div>;

  return (
    <div className="info-section">
      <div id="infos" className="wrapper">
        <div className="title-right">
          Infos générales
        </div>
        <div ref={divTitleRef} className="info-container">
          <div className="title-container">
            <h2>Infos générales</h2>
            {generalInfo && (
              <div className="btn-delete-info">
                <button title="Supprimer" onClick={() => modalDeleteInfo()}>
                  <FontAwesomeIcon icon="trash-alt" />
                </button>
              </div>
            )}  
          </div>

          <div className="forms-block">
            {!generalInfo && (
              <FormGeneralInfo 
              handleFunction={onSubmitAdd} 
              formType="add" 
              success={success}
              successMessage={successMessage} />
            )}

            {showEditForm && (
              <FormGeneralInfo 
              handleFunction={onSubmitEdit} 
              formType="edit" 
              value={generalInfo} 
              success={success}
              successMessage={successMessage} />     
            )}

          </div>
        </div>
      </div>
      {displayForm &&
        <Modal 
        formType={"deleteInfo"} 
        closeModal={closeModal} 
        div={doubleCheckDelete} />
      }
    </div>
  )
}

GeneralInfo.propTypes = {
  data: PropTypes.object,
  onSubmitAdd: PropTypes.func.isRequired,
  onSubmitEdit: PropTypes.func.isRequired,
  success: PropTypes.bool,
  successMessage: PropTypes.object.isRequired,
  showEditForm: PropTypes.bool.isRequired,
  setShowEditForm: PropTypes.func.isRequired,
}

export default GeneralInfo;