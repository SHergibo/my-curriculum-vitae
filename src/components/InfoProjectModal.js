import React from "react";
import PropTypes from 'prop-types';

function InfoProjectModal({ value }) {

  return (
    <div className="info-project-modal">
      <div className="img-project">
        <img src={value.img} alt={value.altImg} />
      </div>
      <div className="info-project">
        <h2>{value.projectName}</h2>
        <p>{value.description}</p>
      </div>
    </div>
  );
}

InfoProjectModal.propTypes = {
  value: PropTypes.object.isRequired,
}

export default InfoProjectModal;