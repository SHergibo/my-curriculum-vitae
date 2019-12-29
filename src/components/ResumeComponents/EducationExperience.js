import React from 'react';

function EducationExperience(props) {
  return (
    <div className="container-resume">
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
        <p>{props.begin} - {props.end}</p>
      </div>
      <div className="text-resume">
        <h3>{props.title}</h3>
        <p>{props.school}</p>
      </div>
    </div>
  );
}

export default EducationExperience;