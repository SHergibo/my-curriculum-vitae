import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJs, faHtml5 } from '@fortawesome/free-brands-svg-icons';
import PropTypes from 'prop-types';

function About({data}) {
  
  return (
    <div id="about" className="about">
      <div className="wrapper about-container">
        <div className="img-about">
          <img src="./Hergibo_Sacha.jpg" alt="Hergibo Sacha" />
        </div>
        <div className="text-about">
          <div className="title-right">
            À propos
          </div>
          <div className="about-me">
            <h2>Bonjour !</h2>
            <p>{data.description}</p>
          </div>
          <div className="info">
            <ul>
              <li>
                <span>Téléphone :</span><div>{data.phone}</div>
              </li>
              <li>
                <span>Email :</span><div>{data.email}</div>
              </li>
              <li>
                <span>Adresse :</span><div>{data.address.street}, {data.address.number} {data.address.zip} {data.address.city}</div>
              </li>
              <li>
                <span>Date de naissance :</span><div>{data.birthdate}</div>
              </li>
              <li>
                <span>Permis de conduire :</span><div>{data.licence}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="about-job-container">
        <div className="wrapper about-job">
          <div></div>
          <div>
            <FontAwesomeIcon icon={faJs} />
            <h5>Web Développeur</h5>
          </div>
          <div>
            <FontAwesomeIcon icon={faHtml5} />
            <h5>Web Intégrateur</h5>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

About.propTypes = {
  data: PropTypes.object.isRequired,
}

export default About;