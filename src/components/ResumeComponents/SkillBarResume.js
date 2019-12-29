import React from 'react';

function SkillBarResume(props) {
  return (
    <div className="skill-bar-container">
      <div className="info-skill">
        <p>{props.skill}</p>
        <span>{props.percentage}%</span>
      </div>
      <div className="skill-bar">
        <div style={{ width: props.percentage + '%' }}></div>
      </div>
    </div>
  );
}

export default SkillBarResume;