import React from 'react';

function About() {
  return (
    <div id="about" className="about">
      <div className="wrapper aboutContainer">
        <div></div>
        <div className="textAbout">
          <div className="aboutTitle">
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
              <li><span>Driver's license</span>: Holder of a B license and a car</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="aboutJobContainer">
        <div className="wrapper aboutJob">
          <div></div>
          <div>
            <i className="fab fa-js"></i>
            <h5>web developper</h5>
          </div>
          <div>
            <i className="fab fa-html5"></i>
            <h5>web integrator</h5>
          </div>
          <div></div>
        </div>

      </div>
    </div>
  );
}

export default About;