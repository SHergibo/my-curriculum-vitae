import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJs, faHtml5 } from '@fortawesome/free-brands-svg-icons';
import PropTypes from 'prop-types';

function About({data}) {
  console.log(data);
  
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
              <li><span>Téléphone</span>: {data.phone}</li>
              <li><span>Email</span>: {data.email}</li>
              <li><span>Adresse</span>: {data.address.street}, {data.address.number} {data.address.zip} {data.address.city}</li>
              <li><span>Date de naissance</span>: {data.birthdate}</li>
              <li><span>Permis de conduire</span>: {data.licence}</li>
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