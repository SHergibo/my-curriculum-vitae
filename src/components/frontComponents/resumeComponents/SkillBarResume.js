import React from "react";
import parse from "html-react-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import PropTypes from "prop-types";

function SkillBarResume({ data }) {
  const displaySkill = data.map((item) => {
    let fabIcon = false;
    for (const key in fab) {
      if (fab[key].iconName === item.fontAwesomeIcon) {
        fabIcon = true;
        break;
      }
    }
    return (
      <div className="skill-bar-container" key={item._id}>
        <div className="info-skill">
          <p>{item.nameSkill ? item.nameSkill : "default"}</p>
          {item.fontAwesomeIcon && (
            <span>
              {fabIcon ? (
                <FontAwesomeIcon icon={["fab", item.fontAwesomeIcon]} />
              ) : (
                <FontAwesomeIcon icon={item.fontAwesomeIcon} />
              )}
            </span>
          )}
          {item.svgIcon && <span>{parse(item.svgIcon)}</span>}
          {!item.fontAwesomeIcon && !item.svgIcon && (
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
