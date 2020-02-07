import React, { useLayoutEffect, useState } from 'react';
import axiosInstance from './../utils/axiosInstance';
import { apiDomain, apiVersion } from './../apiConfig/ApiConfig';
import checkSuccess from './../utils/checkSuccess';
import FormGeneralInfo from './FormGeneralInfo';

function GeneralInfo() {
  const [generalInfo, setGeneralInfo] = useState();
  const [showEditForm, setShowEditForm] = useState(false);
  const [success, setSuccess] = useState(false);

  useLayoutEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const getGeneralInfoEndPoint = `${apiDomain}/api/${apiVersion}/info`;
    await axiosInstance.get(getGeneralInfoEndPoint)
      .then((response) => {
        setGeneralInfo(response.data[0]);
        if(response.data[0]){
          setShowEditForm(true);
        }
      });
  };

  const onSubmitAdd = async (data) => {
    let workingData = {
      phone : data.phone,
      email : data.email,
      address : {
        street : data.street,
        number : data.number,
        zip : data.zip,
        city : data.city
      },
      birthdate : data.dateBirthday,
      licence : data.driverLicence,
      description : data.description
    };
    const addGenerelInfoEndPoint = `${apiDomain}/api/${apiVersion}/info`;
    await axiosInstance.post(addGenerelInfoEndPoint, workingData)
      .then((response) => {
        checkSuccess(response.status, success, setSuccess, 0);
        if(response.status === 200){
          console.log(response);
          setGeneralInfo(response.data);
          setShowEditForm(true);
        }
      }); 
  };

  const onSubmitEdit = async (data) => {
    let workingData = {
      phone : data.phone,
      email : data.email,
      address : {
        street : data.street,
        number : data.number,
        zip : data.zip,
        city : data.city
      },
      birthdate : data.dateBirthday,
      licence : data.driverLicence,
      description : data.description
    };
    const editGeneralInfoEndPoint = `${apiDomain}/api/${apiVersion}/info/${generalInfo._id}`;
    await axiosInstance.patch(editGeneralInfoEndPoint, workingData)
    .then((response) => {
      checkSuccess(response.status, success, setSuccess, 0);
      setGeneralInfo(response.data);
    });
  };

  return (
    <div className="info-section">
      <div id="infos" className="wrapper">
        <div className="title-right">
          Infos générales
        </div>
        <div className="info-container">
          <div className="title-container title-container-info-gen">
            <h2>Infos générales</h2>
          </div>

          <div className="forms-block">
            {!generalInfo && (
              <FormGeneralInfo handleFunction={onSubmitAdd} formType="add" success={success} />
            )}

            {showEditForm && (
              <FormGeneralInfo handleFunction={onSubmitEdit} formType="edit" value={generalInfo} success={success} />     
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default GeneralInfo;