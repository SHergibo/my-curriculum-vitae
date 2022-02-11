import React, { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import DisplayListEducExpe from "./adminDisplayLists/DisplayListEducExpe";
import FormEducExpe from "./adminForms/FormEducExpe";
import TitleAction from "../TitleAction";

function EducExpe() {
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
    <div className="educExpe-section">
      <div id="educexpe" className="wrapper">
        <div className="title-left-admin">Éducation / Expérience</div>
        <div className="educExpe-container">
          <TitleAction
            title="Éducation / Expérience"
            btnTitle={
              addBtn
                ? "Éditer une éducation / expérience"
                : "Ajouter une éducation / expérience"
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
                <FormEducExpe />
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
                <DisplayListEducExpe />
              </div>
            </CSSTransition>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EducExpe;
