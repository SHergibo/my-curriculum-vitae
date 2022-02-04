import React, { useState, useRef } from "react";
import FormSkill from "./FormSkill";
import DisplayListSkill from "./DisplayListSkill";
import { CSSTransition } from "react-transition-group";
import TitleAction from "./TitleAction";

function Skills() {
  const [value, setValue] = useState({
    _id: "0",
    nameSkill: "",
    percentage: 100,
    skillCategory: "codingSkill",
    fontAwesomeIcon: "",
    svgIcon: "",
  });
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
        <div className="title-right">Compétences</div>
        <div className="skill-container skill-container-admin">
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
                <FormSkill add={true} value={value} setValue={setValue} />
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
