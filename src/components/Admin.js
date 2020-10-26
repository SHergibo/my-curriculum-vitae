import React, { useEffect, useState, useRef } from 'react';
import { useHistory, withRouter } from "react-router-dom";
import axiosInstance from './../utils/axiosInstance';
import { apiDomain, apiVersion } from './../apiConfig/ApiConfig';
import checkSuccess from './../utils/checkSuccess';
import Home from './Home';
import Navbar from './Navbar';
import GeneralInfo from './GeneralInfo';
import Footer from './Footer';
import BackToTop from './BackToTop';
import { logout, refreshToken } from './../utils/Auth';
import EducExpe from './EducExpe';
import Skills from './Skills';
import Projects from './Projects';
import PropTypes from 'prop-types';


function Admin({ generalInfoAdmin }) {
  const history = useHistory();
  const headerRef = useRef(null);
  const successMessage = useRef(null);

  const [generalInfo, setGeneralInfo] = useState({
    firstname: "",
    lastname: "",
    "address":{
      "street":"",
      "number":"",
      "zip":"",
      "city":""
    },
    "phone":"",
    "email":"",
    "birthdate":"",
    "isoDate":"",
    "licence":""
  });

  useEffect(() => {
    if(generalInfoAdmin){
      setGeneralInfo(generalInfoAdmin)
    }
  }, [generalInfoAdmin])

  useEffect(() => {
    window.scrollTo(0, 0);
    const refreshTokenInterval = setInterval(() => {
      refreshToken();
    }, 870000);

    return () => {
      clearInterval(refreshTokenInterval);
    }
  }, []);

  const workingData = (data) =>{
    return {
      firstname : data.firstname,
      lastname : data.lastname,
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
  };

  const onSubmitAdd = async (data, e) => {
    e.preventDefault();
    const addGenerelInfoEndPoint = `${apiDomain}/api/${apiVersion}/info`;
    await axiosInstance.post(addGenerelInfoEndPoint, workingData(data))
      .then((response) => {
        if(response.status === 200){
          checkSuccess(response.status, successMessage);
          setGeneralInfo(response.data);
        }
      }); 
  };

  const onSubmitEdit = async (data, e) => {
    e.preventDefault();
    const editGeneralInfoEndPoint = `${apiDomain}/api/${apiVersion}/info/${generalInfo._id}`;
    await axiosInstance.patch(editGeneralInfoEndPoint, workingData(data))
    .then((response) => {
      checkSuccess(response.status, successMessage);
      response.data.isoDate = response.data.birthdate;
      setGeneralInfo(response.data);
    });
  };

  let logOut = async() =>{
    await logout();
    history.push("/");
  };

  return (
    <>
      <header ref={headerRef} id="header">
        <Home
        generalInfo={generalInfo}/>
        <Navbar
        headerRef={headerRef}
        logout={logOut}/>
      </header>
      <main>
        <GeneralInfo 
        generalInfoState={{generalInfo, setGeneralInfo}} 
        onSubmitAdd={onSubmitAdd} 
        onSubmitEdit={onSubmitEdit}
        successMessage={successMessage} />
        <EducExpe />
        <Skills />
        <Projects />
      </main>
      <footer>
        <Footer />
      </footer>
      <BackToTop />
    </>
  )
}

Admin.propTypes = {
  generalInfoAdmin: PropTypes.object.isRequired
}

export default withRouter(Admin);

