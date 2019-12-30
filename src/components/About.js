import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJs, faHtml5 } from '@fortawesome/free-brands-svg-icons';

function About() {
  return (
    <div id="about" className="about">
      <div className="wrapper about-container">
        <div></div>
        <div className="text-about">
          <div className="about-title">
            About
          </div>
          <h2>Hello There!</h2>
          <p>Text</p>
          <div className="info">
            <ul>
              <li><span>Phone</span>: +32/498643049</li>
              <li><span>Email</span>: sachahergibo@gmail.com</li>
              <li><span>Address</span>: Route de Velaines, 24A 7543 Mourcourt</li>
              <li><span>Birthdate</span>: 24/04/92</li>
              <li><span>Driver's license</span>: Holder of a B driver license and a car</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="about-job-container">
        <div className="wrapper about-job">
          <div></div>
          <div>
            <FontAwesomeIcon icon={faJs} />
            <h5>Web Developper</h5>
          </div>
          <div>
            <FontAwesomeIcon icon={faHtml5} />
            <h5>Web Integrator</h5>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default About;