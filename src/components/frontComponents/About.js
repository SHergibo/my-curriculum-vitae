import React, { useState, useRef, useEffect } from "react";
import { useInfosData } from "../../App";
import { apiDomain, apiVersion } from "../../apiConfig/ApiConfig";
import AboutJobContainer from "./AboutJobContainer";
import PropTypes from "prop-types";

function About({ isLoaded }) {
  const { generalInfo } = useInfosData();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const imgAboutRef = useRef(null);
  const profilePictureRef = useRef(null);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth >= 640 && isLoaded) {
      if (
        imgAboutRef.current.offsetHeight - profilePictureRef.current.height >=
        20
      ) {
        imgAboutRef.current.classList.remove("img-about");
        imgAboutRef.current.classList.add("img-about-height");
        profilePictureRef.current.classList.add("profile-pic");
      }
    }
    if (windowWidth < 640 && isLoaded) {
      imgAboutRef.current.classList.add("img-about");
      imgAboutRef.current.classList.remove("img-about-height");
      profilePictureRef.current.classList.remove("profile-pic");
    }
  }, [windowWidth, isLoaded]);

  return (
    <div id="about" className="about">
      <div className="wrapper about-container">
        <div ref={imgAboutRef} className="img-about">
          {generalInfo.profilePic?.fileName && (
            <img
              ref={profilePictureRef}
              src={`${apiDomain}/api/${apiVersion}/infos/image/${generalInfo.profilePic?.fileName}`}
              alt={generalInfo.profilePic?.alt}
            />
          )}
          {!generalInfo.profilePic?.fileName && (
            <img
              ref={profilePictureRef}
              src="./default-profile-picture.png"
              alt="Profil par défaut"
            />
          )}
        </div>
        <div className="text-about">
          <div className="title-right">À propos</div>
          <div className="about-me">
            <h2>Bonjour !</h2>
            <p>{generalInfo.description}</p>
          </div>
          <div className="info">
            <ul>
              <li>
                <span>Téléphone :</span>
                <div>{generalInfo.phone}</div>
              </li>
              <li>
                <span>Email :</span>
                <div>{generalInfo.email}</div>
              </li>
              <li>
                <span>Adresse :</span>
                <div>
                  {generalInfo.address.street}, {generalInfo.address.number}{" "}
                  {generalInfo.address.zip} {generalInfo.address.city}
                </div>
              </li>
              <li>
                <span>Date de naissance :</span>
                <div>{generalInfo.birthdate}</div>
              </li>
              <li>
                <span>Permis de conduire :</span>
                <div>{generalInfo.licence}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <AboutJobContainer generalInfo={generalInfo} />
    </div>
  );
}

About.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
};

export default About;
