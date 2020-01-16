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
      <div className="resume-title">Résumé</div>
      <div className="menu-resume">
        <div className="list-resume" style={{ top: 30 + 'px' }}>
          <ul>
            <li>
              <Link activeClass="active" to="education" spy={true} smooth={true} offset={-80} duration={1000}>
                Éducation
              </Link>
            </li>
            <li>
              <Link activeClass="active" to="experience" spy={true} smooth={true} offset={-80} duration={1000}>
                Éxperience
              </Link>
            </li>
            <li>
              <Link activeClass="active" to="skills" spy={true} smooth={true} offset={-80} duration={1000}>
                Compétences
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="edu-expe">
        <div id="education" className="edu-container">
          <h2>Éducation</h2>
          <EducationExperience begin="2018" end="2019" title="Formation développeur Javascript." school="Téchnocité - Tournai" />
          <EducationExperience begin="2015" end="2017" title="Formation conseiller technique PC-réseau." school="Centre Ifapme de Tournai" />
          <EducationExperience begin="2010" end="2016" title="Enseignement Supérieur en E-business." school="Haute École Provinciale de Hainaut – Condorcet" />
          <EducationExperience begin="2008" end="2010" title="Enseignement technique de transition en sciences informatique." school="École des Frères de Tournai" />
          <EducationExperience begin="2006" end="2008" title="Enseignement général en sciences-langues." school="École des Frères de Tournai" />
        </div>
        <div id="experience" className="exp-container">
          <h2>Éxperience</h2>
          <EducationExperience begin="2019" end="2019" title="Stage développeur web d'un mois suite à la formation développeur Javascript" school="Tryptil SPRL" />
          <EducationExperience begin="2019" end="2019" title="Développeur web (CDD de 3 mois)" school="Tryptil SPRL" />
          <EducationExperience begin="2019" end="2019" title="Développeur web (CDD de 3 mois)" school="Tryptil SPRL" />
        </div>
        <div id="skills" className="skill-container">
          <h2>Compétences</h2>
          <div className="skill-canvas">
            <CanvasResume id="canvas1" skill="HTML 5" percent={90} />
            <CanvasResume id="canvas2" skill="CSS 3" percent={80} />
            <CanvasResume id="canvas3" skill="Sass" percent={80} />
            <CanvasResume id="canvas4" skill="Javascript" percent={75} />
            <CanvasResume id="canvas5" skill="JQuery" percent={60} />
            <CanvasResume id="canvas6" skill="Node js" percent={70} />
            <CanvasResume id="canvas7" skill="Ember js" percent={85} />
            <CanvasResume id="canvas8" skill="React" percent={65} />
          </div>
          <div className="skill-bars">
            <div className="soft-skills">
              <h4>Compétences générales</h4>
              <SkillBarResume skill="Autodidacte" percent={90} />
              <SkillBarResume skill="Gestion du temps" percent={80} />
              <SkillBarResume skill="Travail d'équipe" percent={85} />
              <SkillBarResume skill="Résolution de problèmes" percent={75} />
            </div>
            <div className="language-skills">
              <h4>Langues</h4>
              <SkillBarResume skill="Français" percent={90} />
              <SkillBarResume skill="Anglais" percent={80} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resume;