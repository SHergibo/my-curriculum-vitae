import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

function EducationExperience({ data }) {

  const formatDate = (date) => {
    let year = date.split('-')[0];
    return year;
  };

  const displayEducExpe = data.map((item) => {
    let formatDateStart = formatDate(item.dateStart);
    let formatDateEnd = formatDate(item.dateEnd);
    return <div className="container-resume" key={item._id}>
            <div className="date-resume">
              <span className="resume-svg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                  <path data-name="layer1" fill="none" stroke="#202020" strokeMiterlimit="10" strokeWidth="2" d="M2 8h60v54H2z" strokeLinejoin="round" strokeLinecap="round">
                  </path>
                  <path data-name="layer2" fill="none" stroke="#202020" strokeMiterlimit="10" strokeWidth="2" d="M54 54H10V16h44v38z" strokeLinejoin="round" strokeLinecap="round">
                  </path>
                  <path data-name="layer1" fill="none" stroke="#202020" strokeMiterlimit="10" strokeWidth="2" d="M32 2v18M18 2v18M46 2v18" strokeLinejoin="round" strokeLinecap="round">
                  </path>
                </svg>
              </span>
              <p>{formatDateStart} - {formatDateEnd}</p>
            </div>
            <div className="text-resume">
              <h3>{item.titleEducExpe}</h3>
              <p>{item.placeEducExpe}</p>
            </div>
          </div>
  });

  return (
    <Fragment>
      {displayEducExpe}
    </Fragment>
  );
}

EducationExperience.propTypes = {
  data: PropTypes.array.isRequired,
}

export default EducationExperience;