import React, { useState, useRef } from "react";
import FormSkill from "./adminForms/FormSkill";
import DisplayListSkill from "./adminDisplayLists/DisplayListSkill";
import { CSSTransition } from "react-transition-group";
import TitleAction from "../TitleAction";

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
  };

  return (
    <div className="skill-section">
      <div id="skills" className="wrapper">
        <div className="title-left-admin">Compétences</div>
        <div className="skills-container skills-container-admin">
          <TitleAction
            title="Compétences"
            btnTitle={
              addBtn ? "Éditer une compétence" : "Ajouter une compétence"
            }
            action={switchForm}
            btnState={{ addBtn, editbtn }}
          />

          <div className="forms-block">
            <CSSTransition
              nodeRef={nodeRef}
              in={addBtn}
              timeout={500}
              classNames="add"
              unmountOnExit
            >
              <div ref={nodeRef} className="form-container">
                <FormSkill add={true} />
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
  );
}

export default Skills;
