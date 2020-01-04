import React, { useEffect } from 'react';
import { Link } from "react-scroll";
import EducationExperience from './ResumeComponents/EducationExperience';
import CanvasResume from './ResumeComponents/CanvasResume';
import SkillBarResume from './ResumeComponents/SkillBarResume';

function Resume() {
  useEffect(() => {
    window.addEventListener('scroll', () => {
      let resumeContainer = document.getElementById('resume');
      let menuResume = document.getElementsByClassName('list-resume')[0];
      let getBounding = resumeContainer.getBoundingClientRect();
      let bottomResume = ((getBounding.height + getBounding.top) - 80) - 180;
      if (bottomResume <= 0) {
        menuResume.setAttribute('style', 'position: absolute; bottom: 0');
      } else {
        menuResume.removeAttribute('style');
        menuResume.setAttribute('style', 'top: 30px');
      }
      if (getBounding.top < 20) {
        menuResume.classList.add("menu-resume-fixed");
      } else {
        menuResume.classList.remove("menu-resume-fixed");
      }
    });
  }, []);
  return (
    <div id="resume" className="wrapper resume">
      <div className="resume-title">Resume</div>
      <div className="menu-resume">
        <div className="list-resume" style={{ top: 30 + 'px' }}>
          <ul>
            <li>
              <Link activeClass="active" to="education" spy={true} smooth={true} offset={-80} duration={1000}>
                Education
              </Link>
            </li>
            <li>
              <Link activeClass="active" to="experience" spy={true} smooth={true} offset={-80} duration={1000}>
                Experience
              </Link>
            </li>
            <li>
              <Link activeClass="active" to="skills" spy={true} smooth={true} offset={-80} duration={1000}>
                Skill
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="edu-expe">
        <div id="education" className="edu-container">
          <h2>Education</h2>
          <EducationExperience begin="2000" end="2005" title="BLA BLA BLA" school="School" />
          <EducationExperience begin="2000" end="2005" title="BLA BLA BLA" school="School" />
        </div>
        <div id="experience" className="exp-container">
          <h2>Experience</h2>
          <EducationExperience begin="2000" end="2005" title="BLA BLA BLA" school="School" />
          <EducationExperience begin="2000" end="2005" title="BLA BLA BLA" school="School" />
        </div>
        <div id="skills" className="skill-container">
          <h2>Skills</h2>
          <div className="skill-canvas">
            <CanvasResume id="canvas1" skill="test1" percentage="90" />
            <CanvasResume id="canvas2" skill="test2" percentage="50" />
            <CanvasResume id="canvas3" skill="test3" percentage="70" />
            <CanvasResume id="canvas4" skill="test4" percentage="65" />
          </div>
          <div className="skill-bars">
            <div className="soft-skills">
              <h4>Soft Skills</h4>
              <SkillBarResume skill="test4" percentage="65" />
              <SkillBarResume skill="test4" percentage="65" />
              <SkillBarResume skill="test4" percentage="65" />
              <SkillBarResume skill="test4" percentage="65" />
            </div>
            <div className="language-skills">
              <h4>Language</h4>
              <SkillBarResume skill="test4" percentage="65" />
              <SkillBarResume skill="test4" percentage="65" />
              <SkillBarResume skill="test4" percentage="65" />
              <SkillBarResume skill="test4" percentage="65" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resume;