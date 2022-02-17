import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

function EducationExperience({ data, type }) {
  const formatDate = (date) => {
    let year = date.split("-")[0];
    return year;
  };

  const displayEducExpe = data.map((item) => {
    let formatDateStart = formatDate(item.dateStart);
    let formatDateEnd = formatDate(item.dateEnd);
    return (
      <div className="container-resume" key={item._id}>
        <div className="date-resume">
          <span className="resume-svg">
            {type === "educ" ? (
              <FontAwesomeIcon icon="graduation-cap" />
            ) : (
              <FontAwesomeIcon icon="briefcase" />
            )}
          </span>
          <p>
            {formatDateStart} - {formatDateEnd}
          </p>
        </div>
        <div className="text-resume">
          <h3>{item.titleEducExpe}</h3>
          <p>{item.placeEducExpe}</p>
        </div>
      </div>
    );
  });

  return <>{displayEducExpe}</>;
}

EducationExperience.propTypes = {
  data: PropTypes.array.isRequired,
};

export default EducationExperience;
