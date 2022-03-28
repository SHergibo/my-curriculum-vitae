import React, { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import DisplayListProjects from "./adminDisplayLists/DisplayListProjects";
import FormProject from "./adminForms/FormProject";
import TitleAction from "../TitleAction";

function Projects() {
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
    <div className="project-section">
      <div id="projects" className="wrapper">
        <div className="title-right">Projets</div>
        <div className="project-container">
          <TitleAction
            title="Projets"
            btnTitle={addBtn ? "Éditer un projet" : "Ajouter un projet"}
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
                <FormProject />
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
                <DisplayListProjects />
              </div>
            </CSSTransition>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
