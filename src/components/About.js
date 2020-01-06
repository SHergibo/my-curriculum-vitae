import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJs, faHtml5 } from '@fortawesome/free-brands-svg-icons';

function About() {
  return (
    <div id="about" className="about">
      <div className="wrapper about-container">
        <div className="img-about">
          <img src="./Hergibo_Sacha.jpg" alt="Hergibo Sacha" />
        </div>
        <div className="text-about">
          <div className="about-title">
            À propos
          </div>
          <div className="about-me">
            <h2>Bonjour !</h2>
            <p>Développeur dans le domaine du web, je recherche à en apprendre plus pour agrandir mes connaissances et affûter celles que j'ai déjà acquises.</p>
          </div>
          <div className="info">
            <ul>
              <li><span>Téléphone</span>: +32/498643049</li>
              <li><span>Email</span>: sachahergibo@gmail.com</li>
              <li><span>Adresse</span>: Route de Velaines, 24A 7543 Mourcourt</li>
              <li><span>Date de naissance</span>: 24/04/92</li>
              <li><span>Permis de conduire</span>: Détenteur du permis B et d'une voiture</li>
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
            <h5>Web Integrateur</h5>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default About;