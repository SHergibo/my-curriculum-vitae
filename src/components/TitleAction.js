import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

function TitleAction({
  format = "switch",
  title,
  btnTitle,
  action,
  btnState = {},
}) {
  const { generalInfo, addBtn, editbtn } = btnState;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  let titleRef = useRef(null);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (
      titleRef.current.clientHeight > 49 &&
      titleRef.current.clientHeight <= 98
    ) {
      titleRef.current.classList.add("h2after50");
    }
    if (
      titleRef.current.clientHeight > 98 &&
      titleRef.current.clientHeight <= 147
    ) {
      titleRef.current.classList.add("h2after75");
    }
    if (titleRef.current.clientHeight <= 49) {
      titleRef.current.classList.remove("h2after50");
    }
    if (titleRef.current.clientHeight <= 98) {
      titleRef.current.classList.remove("h2after75");
    }
  }, [windowWidth]);

  return (
    <div className="title-container">
      <h2 ref={titleRef}>{title}</h2>

      {format !== "delete" && (
        <div className="btn-title-action">
          {format === "switch" && (
            <button title={btnTitle} onClick={action}>
              {addBtn && <FontAwesomeIcon icon="edit" />}
              {editbtn && <FontAwesomeIcon icon="plus" />}
            </button>
          )}
          {format === "return" && (
            <button title={btnTitle} onClick={action}>
              <FontAwesomeIcon icon="chevron-left" />
            </button>
          )}
        </div>
      )}

      {generalInfo?.firstname && (
        <div className="btn-title-action-delete">
          <button title={btnTitle} onClick={action}>
            <FontAwesomeIcon icon="trash-alt" />
          </button>
        </div>
      )}
    </div>
  );
}

TitleAction.propTypes = {
  format: PropTypes.string,
  title: PropTypes.string.isRequired,
  btnTitle: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  btnState: PropTypes.shape({
    generalInfo: PropTypes.object,
    addBtn: PropTypes.bool,
    editbtn: PropTypes.bool,
  }),
};

export default TitleAction;
