import React from 'react';
import EducationExperience from './ResumeComponents/EducationExperience';
import CanvasResume from './ResumeComponents/CanvasResume';
import SkillBarResume from './ResumeComponents/SkillBarResume';

function Resume() {
  return (
    <div id="resume" className="wrapper resume">
      <div className="resume-title">Resume</div>
      <div className="menu-resume">
        <div className="list-resume">
          <ul>
            <li><a href="#education">Education</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#skills">Skill</a></li>
          </ul>
        </div>
      </div>
      <div id="education" className="edu-expe">
        <div className="edu-container">
          <h2>Education</h2>
          <EducationExperience begin="2000" end= "2005" title="BLA BLA BLA" school="School" />
          <EducationExperience begin="2000" end= "2005" title="BLA BLA BLA" school="School" />
        </div>
        <div id="experience" className="exp-container">
          <h2>Experience</h2>
          <EducationExperience begin="2000" end= "2005" title="BLA BLA BLA" school="School" />
          <EducationExperience begin="2000" end= "2005" title="BLA BLA BLA" school="School" />
        </div>
        <div className="skill-container">
          <h2>Skills</h2>
          <div className="skill-canvas">
            <CanvasResume id="canvas1" skill="test1" percentage="90"/>
            <CanvasResume id="canvas2" skill="test2" percentage="50"/>
            <CanvasResume id="canvas3" skill="test3" percentage="70"/>
            <CanvasResume id="canvas4" skill="test4" percentage="65"/>
          </div>
          <div className="skill-bars">
            <div className="soft-skills">
              <h4>Soft Skills</h4>
              <SkillBarResume skill="test4" percentage="65"/>
              <SkillBarResume skill="test4" percentage="65"/>
              <SkillBarResume skill="test4" percentage="65"/>
              <SkillBarResume skill="test4" percentage="65"/>
            </div>
            <div className="language-skills">
              <h4>Language</h4>
              <SkillBarResume skill="test4" percentage="65"/>
              <SkillBarResume skill="test4" percentage="65"/>
              <SkillBarResume skill="test4" percentage="65"/>
              <SkillBarResume skill="test4" percentage="65"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resume;