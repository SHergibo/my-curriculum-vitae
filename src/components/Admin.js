import React from 'react';
import Home from './Home';
import Navbar from './Navbar';
import GeneralInfo from './GeneralInfo';
import Footer from './Footer';
import BackToTop from './BackToTop';
import { logout } from './../utils/Auth';
import PropTypes from 'prop-types';
import EducExpe from './EducExpe';
import Skills from './Skills';

function Admin({history, location}) {
  let logOut = async() =>{
    await logout();
    history.push("/");
  };
  return (
    <div>
      <header id="header">
        <Home location={location.pathname}/>
        <Navbar location={location.pathname} logout={logOut}/>
      </header>
      <main>
        <GeneralInfo />
        <EducExpe />
        <Skills />
      </main>
      <footer>
        <Footer />
      </footer>
      <BackToTop />
    </div>
  )
}

Admin.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default Admin;

