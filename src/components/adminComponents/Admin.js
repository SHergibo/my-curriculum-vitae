import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Home from "../frontComponents/Home";
import Navbar from "../Navbar";
import GeneralInfo from "./GeneralInfo";
import Footer from "../Footer";
import BackToTop from "../BackToTop";
import { refreshToken, logout } from "../../utils/Auth";
import EducExpe from "./EducExpe";
import Skills from "./Skills";
import Projects from "./Projects";
import PropTypes from "prop-types";

function Admin({ generalInfoAdmin }) {
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const [expiresIn, setExpiresIn] = useState(
    new Date(localStorage.getItem("expiresIn"))
  );

  const [generalInfo, setGeneralInfo] = useState({
    firstname: "",
    lastname: "",
    address: {
      street: "",
      number: "",
      zip: "",
      city: "",
    },
    phone: "",
    email: "",
    birthdate: "",
    isoDate: "",
    licence: "",
    description: "",
  });

  useEffect(() => {
    if (generalInfoAdmin) {
      setGeneralInfo(generalInfoAdmin);
    }
  }, [generalInfoAdmin]);

  const logOut = useCallback(async () => {
    await logout();
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let nowDate = new Date();
    let timeInterval = 0;

    if (expiresIn.getHours() > nowDate.getHours()) {
      timeInterval = Math.floor(
        (expiresIn.getMinutes() - nowDate.getMinutes() + 59) * 60 * 1000
      );
    }

    if (
      timeInterval === 0 &&
      expiresIn.getMinutes() - nowDate.getMinutes() - 1 <= 1
    ) {
      timeInterval = 1000;
    }

    if (timeInterval === 0) {
      timeInterval = Math.floor(
        (expiresIn.getMinutes() - nowDate.getMinutes() - 1) * 60 * 1000
      );
    }

    const refreshTokenInterval = setInterval(async () => {
      const responseRefreshToken = await refreshToken();
      if (!responseRefreshToken) {
        logOut();
      }
      setExpiresIn(new Date(localStorage.getItem("expiresIn")));
    }, timeInterval);

    return () => {
      clearInterval(refreshTokenInterval);
    };
  }, [expiresIn, logOut]);

  return (
    <>
      <header ref={headerRef} id="header">
        <Home generalInfo={generalInfo} />
        <Navbar headerRef={headerRef} />
      </header>
      <main>
        <GeneralInfo generalInfoState={{ generalInfo, setGeneralInfo }} />
        <EducExpe />
        <Skills />
        <Projects />
      </main>
      <footer>
        <Footer />
      </footer>
      <BackToTop />
    </>
  );
}

Admin.propTypes = {
  generalInfoAdmin: PropTypes.object.isRequired,
};

export default Admin;
