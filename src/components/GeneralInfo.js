import React, { useLayoutEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from './../utils/axiosInstance';
import { apiDomain, apiVersion } from './../apiConfig/ApiConfig';
import checkSuccess from './../utils/checkSuccess';
import FormGeneralInfo from './FormGeneralInfo';

function GeneralInfo() {
  const [generalInfo, setGeneralInfo] = useState();
  const [success, setSuccess] = useState(false);

  useLayoutEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const getGeneralInfoEndPoint = `${apiDomain}/api/${apiVersion}/info`;
    await axiosInstance.get(getGeneralInfoEndPoint)
      .then((response) => {
        setGeneralInfo(response.data[0]);
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
      licence : data.driverLicence
    };
    const addGenerelInfoEndPoint = `${apiDomain}/api/${apiVersion}/info`;
    await axiosInstance.post(addGenerelInfoEndPoint, workingData)
      .then((response) => {
        checkSuccess(response.status, success, setSuccess, 0);
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
      licence : data.driverLicence
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
          <div className="title-container">
            <h2 className="title-info-gen">Infos générales</h2>
          </div>

          <div className="forms-block">
            {!generalInfo && (
              <FormGeneralInfo handleFunction={onSubmitAdd} formType="add" success={success} />
            )}
            {generalInfo && (
            <FormGeneralInfo handleFunction={onSubmitEdit} formType="edit" value={generalInfo} success={success} />     
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GeneralInfo;