import React, { useEffect, useState, useRef } from 'react';
import { Link } from "react-scroll";
import EducationExperience from './ResumeComponents/EducationExperience';
import CanvasResume from './ResumeComponents/CanvasResume';
import SkillBarResume from './ResumeComponents/SkillBarResume';
import workingData from './../utils/workingData';
import PropTypes from 'prop-types';

function Resume({ educExpeData, skillData }) {
  const objectEducExpe = {
    "_id": "",
    "dateStart": "",
    "dateEnd": "",
    "titleEducExpe": "",
    "placeEducExpe": "",
    "educExpe": ""
  };
  const [arrayEduc, setArrayEduc] = useState([objectEducExpe]);
  const [arrayExpe, setArrayExpe] = useState([objectEducExpe]);

  const objectSkill = {
    "_id": "",
    "nameSkill": "",
    "percentage": "",
    "skillCategory": "",
  }

  const [arrayCodingSkill, setArrayCodingSkill] = useState([objectSkill]);
  const [arrayGeneralSkill, setArrayGeneralSkill] = useState([objectSkill]);
  const [arrayLanguage, setArrayLanguage] = useState([objectSkill]);
  const resumeContainerRef = useRef(null);
  const menuResumeRef = useRef(null);
  const educRef = useRef(null);
  const expRef = useRef(null);
  const skillref = useRef(null);

  const handleResumeMenuOnScroll = () => {
    let resumeContainer = resumeContainerRef.current
    let menuResume = menuResumeRef.current;
    let getBounding = resumeContainer.getBoundingClientRect();
    let bottomResume = ((getBounding.height + getBounding.top) - 80) - 180;
    if (bottomResume <= 0) {
      menuResume.setAttribute('style', 'position: absolute; bottom: 0; top: unset');
    } else {
      menuResume.removeAttribute('style');
    }
    if (getBounding.top < 30) {
      menuResume.classList.add("menu-resume-fixed");
    } else {
      menuResume.classList.remove("menu-resume-fixed");
    }
  };

  useEffect(() => {
    if(educExpeData){
      const educExpeWorkingData = workingData(educExpeData, "educExpe");
      setArrayEduc(educExpeWorkingData[0]);
      setArrayExpe(educExpeWorkingData[1]);
    }
    if(skillData){
      const skillWorkingDatas = workingData(skillData, "skill");
      setArrayCodingSkill(skillWorkingDatas[0]);
      setArrayGeneralSkill(skillWorkingDatas[1]);
      setArrayLanguage(skillWorkingDatas[2]);
    }
  }, [educExpeData, skillData]);

  useEffect(() => {
    window.addEventListener('scroll', handleResumeMenuOnScroll);
    return () => {
      window.removeEventListener('scroll', handleResumeMenuOnScroll);
    }
  }, []);

  const focusOnKeypress = (elem) => {
    if(elem === "eduction"){
      educRef.current.scrollIntoView();
    }else if (elem === "experience"){
      expRef.current.scrollIntoView();
    }else if (elem === "skills"){
      skillref.current.scrollIntoView();
    }
  }

  return (
    <div ref={resumeContainerRef} id="resume" className="wrapper resume">
      <div className="title-left">Résumé</div>
      <div className="menu-resume">
        <div ref={menuResumeRef} className="list-resume" style={{ top: 30 + 'px' }}>
          <ul>
            <li tabIndex={0} onKeyPress={()=>{focusOnKeypress("education")}}>
              <Link 
              activeClass="active" 
              to="education" 
              spy={true} 
              smooth={true} 
              offset={-80} 
              duration={1000}>
                Éducation
              </Link>
            </li>
            <li tabIndex={0} onKeyPress={()=>{focusOnKeypress("experience")}}>
              <Link 
              activeClass="active" 
              to="experience" 
              spy={true} 
              smooth={true} 
              offset={-80} 
              duration={1000}>
                Expérience
              </Link>
            </li>
            <li tabIndex={0} onKeyPress={()=>{focusOnKeypress("skills")}}>
              <Link 
              activeClass="active" 
              to="skills" 
              spy={true} 
              smooth={true} 
              offset={-80} 
              duration={1000}>
                Compétences
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="edu-expe">
        <div ref={educRef} id="education" className="edu-container">
          <h2>Éducation</h2>
          <EducationExperience data={arrayEduc} />
        </div>
        <div ref={expRef} id="experience" className="exp-container">
          <h2>Expérience</h2>
          <EducationExperience data={arrayExpe} />
        </div>
        <div ref={skillref} id="skills" className="skill-container">
          <h2>Compétences</h2>
          <CanvasResume data={arrayCodingSkill} />
          <div className="skill-bars">
            <div className="soft-skills">
              <h4>Compétences générales</h4>
              <SkillBarResume data={arrayGeneralSkill} />
            </div>
            <div className="language-skills">
              <h4>Langues</h4>
              <SkillBarResume data={arrayLanguage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Resume.propTypes = {
  educExpeData : PropTypes.array.isRequired,
  skillData: PropTypes.array.isRequired
}

export default Resume;