import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faLink } from '@fortawesome/free-solid-svg-icons';
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
            <img src="./site_cv_portfolio.png" alt="Site CV Hergibo Sacha" />
            <div className="project-name">
              Site CV
            </div>
            <div className="project-more">
              <div>
                <span><FontAwesomeIcon icon={faPlus} /></span>
                <span>
                  <a href="#"><FontAwesomeIcon icon={faLink} /></a>
                </span>
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