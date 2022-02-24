import React from "react";
import parse from "html-react-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

function SkillBarResume({ data }) {
  const displaySkill = data.map((item) => {
    return (
      <div className="skill-bar-container" key={item._id}>
        <div className="info-skill">
          <p>{item.nameSkill ? item.nameSkill : "default"}</p>
          {item.fontAwesomeIcon?.value && (
            <span>
              <FontAwesomeIcon
                icon={[item.fontAwesomeIcon.prefix, item.fontAwesomeIcon.value]}
              />
            </span>
          )}
          {item.svgIcon && <span>{parse(item.svgIcon)}</span>}
          {!item.fontAwesomeIcon?.value && !item.svgIcon && (
            <span>
              <FontAwesomeIcon icon="check" />
            </span>
          )}
        </div>
        <div className="skill-bar"></div>
      </div>
    );
  });

  return <>{displaySkill}</>;
}

SkillBarResume.propTypes = {
  data: PropTypes.array.isRequired,
};

export default SkillBarResume;
