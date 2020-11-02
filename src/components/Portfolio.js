import React, { useState, useEffect, useCallback } from "react";
import InfoProjectModal from "./InfoProjectModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from "./Modal";
import { displayModal } from './../utils/modalDisplay';
import { apiDomain, apiVersion } from './../apiConfig/ApiConfig';
import axios from "axios";
import PropTypes from 'prop-types';

function Portfolio({ isLoaded }) {
  const [value, setValue] = useState({});
  const [displayForm, setDisplayForm] = useState(false);
  const [arrayProject, setArrayProject] = useState([]);

  const getData = useCallback(async () => {
    const getListProjectEndPoint = `${apiDomain}/api/${apiVersion}/project/project-list`;
    await axios.get(getListProjectEndPoint)
      .then((response) => {
        setArrayProject(response.data);
      });
  }, [input]);

  useEffect(() => {
    if(isLoaded){
      getData();
    }
  }, [isLoaded, getData]);

  let projectPortfolio = arrayProject.map((item) => {
    return <div className="project" key={item._id}>     
            <img src={`${apiDomain}/api/${apiVersion}/project/image/${item.img.filename}`} alt={item.altImg} />
            <div className="project-name">
              {item.projectName}
            </div>
            <div className="project-more">
              <div>
                <span tabIndex={0} onClick={() => displayModal(item, setDisplayForm, setValue)} onKeyPress={() => displayModal(item, setDisplayForm, setValue)}><FontAwesomeIcon icon="plus" /></span>
                <span>
                  <a tabIndex={0} href={item.url}><FontAwesomeIcon icon="link" /></a>
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
          <Modal 
          div={
            <InfoProjectModal 
            value={value} />
          } 
          setDisplayForm={setDisplayForm}/>
        }
      </div>
    </div>
  );
}

Portfolio.propTypes = {
  isLoaded: PropTypes.bool.isRequired
}

export default Portfolio;