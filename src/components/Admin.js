import React, { useEffect, useState, useRef } from 'react';
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

function Admin({history, location}) {
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
    "licence":""
  });
  const [success, setSuccess] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);


  useEffect(() => {
    window.scrollTo(0, 0);
    const refreshTokenInterval = setInterval(() => {
      refreshToken();
    }, 870000);
    const getData = async () => {
      const getGeneralInfoEndPoint = `${apiDomain}/api/${apiVersion}/info`;
      await axiosInstance.get(getGeneralInfoEndPoint)
      .then((response) => {
        setGeneralInfo(response.data);
        if(response.data){
          setShowEditForm(true);
        }
      });
    };
    getData();

    return () => {
      clearInterval(refreshTokenInterval);
    }

  }, [history]);

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

  const onSubmitAdd = async (data) => {
    const addGenerelInfoEndPoint = `${apiDomain}/api/${apiVersion}/info`;
    await axiosInstance.post(addGenerelInfoEndPoint, workingData(data))
      .then((response) => {
        if(response.status === 200){
          setGeneralInfo(response.data);
          setShowEditForm(true);
        }
      }); 
  };

  const onSubmitEdit = async (data) => {
    const editGeneralInfoEndPoint = `${apiDomain}/api/${apiVersion}/info/${generalInfo._id}`;
    await axiosInstance.patch(editGeneralInfoEndPoint, workingData(data))
    .then((response) => {
      checkSuccess(response.status, setSuccess, successMessage);
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
        location={location.pathname} 
        data={generalInfo}/>
        <Navbar
        headerRef={headerRef}
        location={location.pathname} 
        logout={logOut}/>
      </header>
      <main>
        <GeneralInfo 
        data={generalInfo} 
        onSubmitAdd={onSubmitAdd} 
        onSubmitEdit={onSubmitEdit} 
        success={success} 
        successMessage={successMessage}
        showEditForm={showEditForm} 
        setShowEditForm={setShowEditForm} />
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
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default Admin;

