import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJs, faHtml5 } from '@fortawesome/free-brands-svg-icons';
// import PropTypes from 'prop-types';

function Portfolio() {
  
  return (
    <div className="portfolio-container">
      <div id="portfolio" className="wrapper portfolio">
        <div className="title-right">
          Portfolio
        </div>
        <div className="projects">
          <div className="project">
            <div className="project-name">
              Project Name
            </div>
            <div className="project-more">
              <div>
                <span>+</span>
                <span>link</span>
              </div>
            </div>
          </div>
          <div className="project">
          </div>
          <div className="project">
          </div>
          <div className="project">
          </div>
        </div>
      </div>
    </div>
  );
}

// Portfolio.propTypes = {
//   data: PropTypes.object.isRequired,
// }

export default Portfolio;