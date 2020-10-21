import React, { useEffect, useState, useRef } from 'react';
import FormGeneralInfo from './FormGeneralInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from "./Modal";
import { displayModalNoValue, closeModal } from './../utils/modalDisplay';
import axiosInstance from './../utils/axiosInstance';
import { apiDomain, apiVersion } from './../apiConfig/ApiConfig';
import PropTypes from 'prop-types';

function GeneralInfo({ generalInfoState, onSubmitAdd, onSubmitEdit, successMessage }) {
  const { generalInfo, setGeneralInfo } = generalInfoState;
  const [displayForm, setDisplayForm] = useState(false);
  const divTitleRef = useRef(null);

  useEffect(() => {
    if(generalInfo){
      divTitleRef.current.classList.remove('title-container-info-gen');
    }else{
      divTitleRef.current.classList.add('title-container-info-gen');
    }
  }, [generalInfo]);
  
  const deleteInfoGen = async () =>{
    const deleteInfoEndPoint = `${apiDomain}/api/${apiVersion}/info/${generalInfo._id}`;
    await axiosInstance.delete(deleteInfoEndPoint, generalInfo)
    .then(() => {
      divTitleRef.current.classList.add('title-container-info-gen');
      setGeneralInfo();
      closeModal(setDisplayForm);
    });
  };

  const doubleCheckDelete = <div className="delete-info-div">
                              <h2>Êtes-vous sur de vouloir supprimer toutes vos informations générales ?</h2>
                              <div>
                                <button onClick={()=>{deleteInfoGen()}}>Oui</button>
                                <button onClick={()=>{closeModal(setDisplayForm)}}>Non</button>
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
                <button title="Supprimer" onClick={() => displayModalNoValue(setDisplayForm)}>
                  <FontAwesomeIcon icon="trash-alt" />
                </button>
              </div>
            )}  
          </div>

          <div className="forms-block">
            <FormGeneralInfo 
            onSubmitAdd={onSubmitAdd} 
            onSubmitEdit={onSubmitEdit} 
            value={generalInfo}
            successMessage={successMessage} />
          </div>
        </div>
      </div>
      {displayForm &&
        <Modal 
        formType={"deleteInfo"} 
        setDisplayForm={setDisplayForm}
        div={doubleCheckDelete} />
      }
    </div>
  )
}

GeneralInfo.propTypes = {
  generalInfoState: PropTypes.shape({
    generalInfo: PropTypes.object,
    setGeneralInfo: PropTypes.func
  }),
  onSubmitAdd: PropTypes.func.isRequired,
  onSubmitEdit: PropTypes.func.isRequired,
  successMessage: PropTypes.object.isRequired
}

export default GeneralInfo;