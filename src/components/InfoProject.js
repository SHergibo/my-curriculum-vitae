import React from "react";
import PropTypes from 'prop-types';
import { apiDomain, apiVersion } from '../apiConfig/ApiConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function InfoProject({ value, setDisplayProject, windowWidth, switchProjectCarousel, indexProject, nextIndexProject }) {
  let descriptionArray = value.description.split(/\n/ig);

  let displayDesc = descriptionArray.map((item, index) => {
    if(item.length > 0){
      return <p key={`descProject-${index}`}>{item}</p> 
    } else{
      return null;
    }
  });

  let frameWorkUsed = [];
  for(let framework in value.technoUsedFront){
    if(value.technoUsedFront[framework]){
      frameWorkUsed.push(framework);
    }
  };

  let displayFrameWorkUsed = frameWorkUsed.map((item, index) => {
    return <li key={`frameworkUsed-${index}`}>{item}</li>
  });

  let technoUsedBack = [];
  for(let back in value.technoUsedBack){
    if(value.technoUsedBack[back]){
      technoUsedBack.push(back);
    }
  };

  let displayTechnoUsedBack = technoUsedBack.map((item, index) => {
    return  <li key={`technoUsedBack-${index}`}>{item}</li>
  });

  return (
    <div className="project-container">
      {windowWidth < 1087 &&      
        <div className="project-carousel-container">
          {indexProject > 0 &&
            <button title="Projet précédant" onClick={() => {switchProjectCarousel(0)}}>
              <FontAwesomeIcon id="chevronL" icon="chevron-left" /> Projet précédant
            </button>
          }
          {nextIndexProject &&        
            <button title="Projet suivant" onClick={() => {switchProjectCarousel(1)}}>
              Projet suivant <FontAwesomeIcon id="chevronR" icon="chevron-right" />
            </button>
          }
        </div>
      }

      <div className="info-project-container">
        <div className="img-project">
          <img src={`${apiDomain}/api/${apiVersion}/project/image/${value.img.filename}`} alt={value.altImg} />
          <span><a href={value.url}><FontAwesomeIcon icon="link" />Lien vers le projet</a></span>
        </div>
        <div className="info-project">
          <div className="title-container">
            <h2>{value.projectName}</h2>
            <div className="btn-switch-container">
              <button title="Retourner vers le portfolio" onClick={() => {setDisplayProject(false)}}>
                <FontAwesomeIcon icon="chevron-left" />
              </button>
            </div>
          </div>

          {displayDesc}
          <div className="techno-used">
            {frameWorkUsed.length > 1 && <h4>Technologies Front-End utilisées</h4>}
            {frameWorkUsed.length === 1 && <h4>Technologie Front-End utilisée</h4>}
            <ul>
              {displayFrameWorkUsed}
            </ul>
            {technoUsedBack.length > 1 && <h4>Technologies Back-End utilisées</h4>}
            {technoUsedBack.length === 1 && <h4>Technologie Back-End utilisée</h4>}
            <ul>
              {displayTechnoUsedBack}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

InfoProject.propTypes = {
  value: PropTypes.object.isRequired,
  setDisplayProject: PropTypes.func.isRequired,
  windowWidth: PropTypes.number.isRequired,
  switchProjectCarousel: PropTypes.func.isRequired,
  indexProject: PropTypes.number.isRequired,
  nextIndexProject: PropTypes.bool.isRequired,
}

export default InfoProject;