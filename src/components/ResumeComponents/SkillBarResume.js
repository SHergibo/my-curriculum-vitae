import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

function SkillBarResume({ data }) {

  const displaySkill = data.map((item) => {
    let percentage = item.percentage;
    return <div className="skill-bar-container" key={item._id}>
            <div className="info-skill">
              <p>{item.nameSkill}</p>
              <span>{item.percentage}%</span>
            </div>
            <div className="skill-bar">
              <div style={{ width: percentage + '%' }}></div>
            </div>
          </div>
  });

  return (
    <Fragment>
      {displaySkill}
    </Fragment>
  );
}

SkillBarResume.propTypes = {
  data: PropTypes.array.isRequired,
}

export default SkillBarResume;