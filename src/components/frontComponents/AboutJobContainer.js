import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

function AboutJobContainer({ generalInfo }) {
  return (
    <div className="about-job-container">
      {generalInfo.professionTitles.length === 1 && (
        <div className="wrapper about-job-one">
          <div></div>
          <div>
            <FontAwesomeIcon
              icon={[
                generalInfo.professionTitles[0].fontAwesomeIcon.prefix,
                generalInfo.professionTitles[0].fontAwesomeIcon.value,
              ]}
            />
            <p>{generalInfo.professionTitles[0].nameProfessionTitle}</p>
          </div>
          <div></div>
        </div>
      )}
      {generalInfo.professionTitles.length === 2 && (
        <div className="wrapper about-job-two">
          <div></div>
          <div>
            <FontAwesomeIcon
              icon={[
                generalInfo.professionTitles[0].fontAwesomeIcon.prefix,
                generalInfo.professionTitles[0].fontAwesomeIcon.value,
              ]}
            />
            <p>{generalInfo.professionTitles[0].nameProfessionTitle}</p>
          </div>
          <div>
            <FontAwesomeIcon
              icon={[
                generalInfo.professionTitles[1].fontAwesomeIcon.prefix,
                generalInfo.professionTitles[1].fontAwesomeIcon.value,
              ]}
            />
            <p>{generalInfo.professionTitles[1].nameProfessionTitle}</p>
          </div>
          <div></div>
        </div>
      )}
      {generalInfo.professionTitles.length === 3 && (
        <div className="wrapper about-job-three">
          <div>
            <FontAwesomeIcon
              icon={[
                generalInfo.professionTitles[0].fontAwesomeIcon.prefix,
                generalInfo.professionTitles[0].fontAwesomeIcon.value,
              ]}
            />
            <p>{generalInfo.professionTitles[0].nameProfessionTitle}</p>
          </div>
          <div>
            <FontAwesomeIcon
              icon={[
                generalInfo.professionTitles[1].fontAwesomeIcon.prefix,
                generalInfo.professionTitles[1].fontAwesomeIcon.value,
              ]}
            />
            <p>{generalInfo.professionTitles[1].nameProfessionTitle}</p>
          </div>
          <div>
            <FontAwesomeIcon
              icon={[
                generalInfo.professionTitles[2].fontAwesomeIcon.prefix,
                generalInfo.professionTitles[2].fontAwesomeIcon.value,
              ]}
            />
            <p>{generalInfo.professionTitles[2].nameProfessionTitle}</p>
          </div>
        </div>
      )}
      {generalInfo.professionTitles.length === 4 && (
        <div className="wrapper about-job-four">
          {generalInfo.professionTitles.map((profTitle) => {
            return (
              <div key={profTitle.id}>
                <FontAwesomeIcon
                  icon={[
                    profTitle.fontAwesomeIcon.prefix,
                    profTitle.fontAwesomeIcon.value,
                  ]}
                />
                <p>{profTitle.nameProfessionTitle}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

AboutJobContainer.propTypes = {
  generalInfo: PropTypes.object.isRequired,
};

export default AboutJobContainer;
