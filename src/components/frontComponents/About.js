import React from "react";
import PropTypes from "prop-types";
import AboutJobContainer from "./AboutJobContainer";

function About({ generalInfo }) {
  return (
    <div id="about" className="about">
      <div className="wrapper about-container">
        <div className="img-about">
          <img src="./Hergibo_Sacha.jpg" alt="Hergibo Sacha" />
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
  generalInfo: PropTypes.object.isRequired,
};

export default About;
