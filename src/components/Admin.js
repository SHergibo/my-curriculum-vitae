import React, { useEffect, useState, useRef } from 'react';
import { useHistory, withRouter } from "react-router-dom";
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
        generalInfoState={{generalInfo, setGeneralInfo}} />
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

