import React, { Fragment } from "react";
import PropTypes from 'prop-types';
import { apiDomain, apiVersion } from './../apiConfig/ApiConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function InfoProjectModal({ value }) {
  let descriptionArray = value.description.split(/\n/ig);

  let displayDesc = descriptionArray.map((item, index) => {
    if(item.length > 0){
      return <Fragment key={`descProject-${index}`}>
              <p>{item}</p>
            </Fragment>
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
    return <Fragment key={`frameworkUsed-${index}`}>
              <li>{item}</li>
            </Fragment>
  });

  let technoUsedBack = [];
  for(let back in value.technoUsedBack){
    if(value.technoUsedBack[back]){
      technoUsedBack.push(back);
    }
  };

  let displayTechnoUsedBack = technoUsedBack.map((item, index) => {
    return <Fragment key={`technoUsedBack-${index}`}>
              <li>{item}</li>
            </Fragment>
  });

  return (
    <div className="info-project-modal">
      <div className="img-project">
        <img src={`${apiDomain}/api/${apiVersion}/project/image/${value.img.filename}`} alt={value.altImg} />
        <span><a href={value.url}><FontAwesomeIcon icon="link" />Lien vers le projet</a></span>
      </div>
      <div className="info-project">
        <h2>{value.projectName}</h2>
        {displayDesc}
        <div className="techno-used">
          {frameWorkUsed.length > 1 && <h4>FrameWork utilisés</h4>}
          {frameWorkUsed.length === 1 && <h4>FrameWork utilisé</h4>}
          <ul>
            {displayFrameWorkUsed}
          </ul>
          {technoUsedBack.length > 1 && <h4>Technologies utilisées pour le back-office</h4>}
          {technoUsedBack.length === 1 && <h4>Technologie utilisée pour le back-office</h4>}
          <ul>
            {displayTechnoUsedBack}
          </ul>
        </div>
      </div>
    </div>
  );
}

InfoProjectModal.propTypes = {
  value: PropTypes.object.isRequired,
}

export default InfoProjectModal;