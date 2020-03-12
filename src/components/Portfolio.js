import React, { useState } from "react";
import InfoProjectModal from "./InfoProjectModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faLink } from '@fortawesome/free-solid-svg-icons';
import Modal from "./Modal";
// import PropTypes from 'prop-types';

function Portfolio() {
  const [value, setValue] = useState({});
  const [displayForm, setDisplayForm] = useState(false);
  const [arrayProject, setArrayProject] = useState([{
    _id: "0",
    projectName : "Site CV",
    img : "site_cv_portfolio.png",
    altImg : "Site CV Hergibo Sacha",
    description : "Lorem Ipsum",
    url : "#"
  },
  {
    _id: "1",
    projectName : "Site CV",
    img : "site_cv_portfolio.png",
    altImg : "Site CV Hergibo Sacha",
    description : "Lorem Ipsum",
    url : "#"
  },
  {
    _id: "2",
    projectName : "Site CV",
    img : "site_cv_portfolio.png",
    altImg : "Site CV Hergibo Sacha",
    description : "Lorem Ipsum",
    url : "#"
  }]);
  let body = document.getElementsByTagName("body")[0];

  const displayModal = (value) => {
    body.setAttribute('style', 'overflow : hidden;');
    setValue(value);
    setDisplayForm(true);
  }

  const closeModal = () => {
    body.removeAttribute('style');
    setDisplayForm(false);
  } 

  let projectPortfolio = arrayProject.map((item) => {
    return <div className="project" key={item._id}>     
            <img src={`./${item.img}`} alt={item.altImg} />
            <div className="project-name">
              {item.projectName}
            </div>
            <div className="project-more">
              <div>
                <span onClick={() => displayModal(item)}><FontAwesomeIcon icon={faPlus} /></span>
                <span>
                  <a href={item.url}><FontAwesomeIcon icon={faLink} /></a>
                </span>
              </div>
            </div>
          </div>
  });

  return (
    <div className="portfolio-container">
      <div id="portfolio" className="wrapper">
        <div className="title-right">
          Portfolio
        </div>
        <div className="projects">
          {projectPortfolio}
        </div>
        {displayForm  && 
          <Modal div={<InfoProjectModal value={value} />} closeModal={closeModal}/>
        }
      </div>
    </div>
  );
}

// Portfolio.propTypes = {
//   data: PropTypes.object.isRequired,
// }

export default Portfolio;