import React, { useState, useEffect, useCallback } from "react";
import InfoProject from "./InfoProject";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { apiDomain, apiVersion } from './../apiConfig/ApiConfig';
import axios from "axios";
import PropTypes from 'prop-types';

function Portfolio({ isLoaded }) {
  const [value, setValue] = useState({});
  const [displayProject, setDisplayProject] = useState(false);
  const [arrayProject, setArrayProject] = useState([]);
  const [indexProject, setIndexProject] = useState(0);
  const [nextIndexProject, setNextIndexProject] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const responsiveWidth = useCallback(() =>{
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', responsiveWidth);
    return () =>{
      window.removeEventListener('resize', responsiveWidth);
    }
  }, [responsiveWidth]);

  const getData = useCallback(async () => {
    const getListProjectEndPoint = `${apiDomain}/api/${apiVersion}/project/project-list`;
    await axios.get(getListProjectEndPoint)
      .then((response) => {
        setArrayProject(response.data);
      });
  }, []);

  useEffect(() => {
    if(isLoaded){
      getData();
    }
  }, [isLoaded, getData]);

  const displayProjectInfo = (item, setDisplayProject, setValue) => {
    setDisplayProject(true);
    setValue(item);
    let findIndexProject = arrayProject.findIndex(el => el._id === item._id);
    setIndexProject(findIndexProject);
  }

  const switchProjectCarousel = (increment) => {
    if(increment === 1){
      setValue(arrayProject[indexProject + 1]);
      setIndexProject(indexProject => indexProject + 1);
      arrayProject[indexProject + 2] ? setNextIndexProject(true) : setNextIndexProject(false);
    }else{
      setValue(arrayProject[indexProject - 1]);
      setIndexProject(indexProject => indexProject - 1);
      setNextIndexProject(true);
    }
  }

  let projectPortfolio = arrayProject.map((item) => {
    return <div className="project-card" key={item._id}>     
            <img src={`${apiDomain}/api/${apiVersion}/project/image/${item.img.filename}`} alt={item.altImg} />
            <div className="project-card-name">
              {item.projectName}
            </div>
            <div className="project-card-more">
              <div>
                <span tabIndex={0} onClick={() => displayProjectInfo(item, setDisplayProject, setValue)} onKeyPress={() => displayProjectInfo(item, setDisplayProject, setValue)}><FontAwesomeIcon icon="plus" /></span>
                <span>
                  <a tabIndex={0} href={item.url}><FontAwesomeIcon icon="link" /></a>
                </span>
              </div>
            </div>
          </div>
  });

  return (
    <>
    {!displayProject &&
      <div className="portfolio-container">
        <div id="portfolio" className="wrapper portfolio">
          <div className="title-right">
            Portfolio
          </div>
          <div className="projects">
            {projectPortfolio}
          </div> 
        </div>
      </div>
    }

    {displayProject &&
      <div className="project-section">
        <div id="portfolio" className="wrapper-project project">
          {windowWidth >= 1087 &&
            <div className="project-carousel-full-screen">
              {indexProject > 0 &&
                <button className="carousel-before" title="Projet précédant" onClick={() => {switchProjectCarousel(0)}}>
                  <FontAwesomeIcon icon="chevron-left" />
                </button>
              }
            </div>
          }

          <div>
            <div className="title-right">
              Projet - {value.projectName}
            </div>
              <InfoProject 
                value={value}
                setDisplayProject={setDisplayProject} 
                windowWidth={windowWidth}
                switchProjectCarousel={switchProjectCarousel}
                indexProject={indexProject}
                nextIndexProject={nextIndexProject}
              />
          </div>

          {windowWidth >= 1087 &&
            <div className="project-carousel-full-screen">
            {nextIndexProject &&            
              <button className="carousel-after" title="Projet suivant" onClick={() => {switchProjectCarousel(1)}}>
                <FontAwesomeIcon icon="chevron-right" />
              </button>
            }
            </div>
          }
        </div>
      </div>
    }
    </>
  );
}

Portfolio.propTypes = {
  isLoaded: PropTypes.bool.isRequired
}

export default Portfolio;