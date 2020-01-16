import React from 'react';
import PropTypes from 'prop-types';

function SkillBarResume({ skill, percent}) {
  return (
    <div className="skill-bar-container">
      <div className="info-skill">
        <p>{skill}</p>
        <span>{percent}%</span>
      </div>
      <div className="skill-bar">
        <div style={{ width: percent + '%' }}></div>
      </div>
    </div>
  );
}

SkillBarResume.propTypes = {
  skill: PropTypes.string.isRequired,
  percent: PropTypes.number.isRequired,
}

export default SkillBarResume;