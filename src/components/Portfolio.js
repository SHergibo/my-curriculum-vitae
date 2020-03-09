import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faLink } from '@fortawesome/free-solid-svg-icons';
import Modal from "./Modal";
// import PropTypes from 'prop-types';

function Portfolio() {
  const [displayForm, setDisplayForm] = useState(false);
  const [arrayProject, setArrayProject] = useState([{
    _id: "0",
    projectName : "Site CV",
    imgProject : "site_cv_portfolio.png",
    altImgProject : "Site CV Hergibo Sacha",
    descriptionProject : "Lorem Ipsum",
    urlProject : "#"
  },
  {
    _id: "1",
    projectName : "Site CV",
    imgProject : "site_cv_portfolio.png",
    altImgProject : "Site CV Hergibo Sacha",
    descriptionProject : "Lorem Ipsum",
    urlProject : "#"
  }]);
  let body = document.getElementsByTagName("body")[0];

  const displayModal = () => {
    body.setAttribute('style', 'overflow : hidden;');
    setDisplayForm(true);
  }

  const closeModal = () => {
    body.removeAttribute('style');
    setDisplayForm(false);
  } 

  let projectPortfolio = arrayProject.map((item) => {
    return <div className="project">     
    <img src={`./${item.imgProject}`} alt={item.altImgProject} />
    <div className="project-name">
      {item.projectName}
    </div>
    <div className="project-more">
      <div>
        <span onClick={() => displayModal()}><FontAwesomeIcon icon={faPlus} /></span>
        <span>
          <a href={item.urlProject}><FontAwesomeIcon icon={faLink} /></a>
        </span>
      </div>
    </div>
  </div>
  });

  const div = <div className="info-project-modal">
                <div className="img-project">
                  <img src="./site_cv_portfolio.png" alt="Site CV Hergibo Sacha" />
                </div>
                <div className="info-project">
                  <h2>Site CV</h2>
                  <p>Lorem Ipsum</p>
                </div>
              </div>;
  
  return (
    <div className="portfolio-container">
      <div id="portfolio" className="wrapper portfolio">
        <div className="title-right">
          Portfolio
        </div>
        <div className="projects">
          {projectPortfolio}
        </div>
        {displayForm  && 
          <Modal div={div} closeModal={closeModal}/>
        }
      </div>
    </div>
  );
}

// Portfolio.propTypes = {
//   data: PropTypes.object.isRequired,
// }

export default Portfolio;