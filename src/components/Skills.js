import React, { useState, useRef } from 'react';
import FormSkill from './FormSkill';
import DisplayListSkill from './DisplayListSkill';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition } from 'react-transition-group';

function Skills() {
  const [addBtn, setAddBtn] = useState(true);
  const [editbtn, setEditBtn] = useState(false);  
  const nodeRef = useRef(null);
  const nodeRefTwo = useRef(null);

  let switchForm = () => {
    if (addBtn) {
      setAddBtn(false);
      setEditBtn(true);
    } else {
      setEditBtn(false);
      setAddBtn(true);
    }
  }

  return (
    <div className="skill-section">
      <div id="skills" className="wrapper">
        <div className="title-right">
          Compétences
        </div>
        <div className="skill-container">
          <div className="title-container">
            <h2>Compétences</h2>
            <div className="btn-switch-container">
              <button onClick={() => switchForm()}>
                {addBtn && (
                  <FontAwesomeIcon icon="edit" />
                )}
                {editbtn && (
                  <FontAwesomeIcon icon="plus" />
                )}
              </button>
            </div>
          </div>

          <div className="forms-block">
            <CSSTransition
              nodeRef={nodeRef}
              in={addBtn}
              timeout={500}
              classNames="add"
              unmountOnExit
            >
              <div ref={nodeRef} className="form-container">
                <FormSkill />
              </div>
            </CSSTransition>
            <CSSTransition
              nodeRef={nodeRefTwo}
              in={editbtn}
              timeout={500}
              classNames="edit"
              unmountOnExit
            >
              <div ref={nodeRefTwo} className="list-container">
                <h3>Édition</h3>
                <DisplayListSkill />
              </div>
            </CSSTransition>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Skills;