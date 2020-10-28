import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition } from 'react-transition-group';
import DisplayListEducExpe from './DisplayListEducExpe';
import FormEducExpe from './FormEducExpe';

function EducExpe() {
  const [titleEducExpe, setTitleEducEpxe] = useState("Éducation / Expérience");
  const titleRef = useRef(null);
  const [addBtn, setAddBtn] = useState(true);
  const [editbtn, setEditBtn] = useState(false);
  const nodeRef = useRef(null);
  const nodeRefTwo = useRef(null);

  useEffect(() => {
    let windowWidth = window.innerWidth;
    let titleContainer = titleRef.current;
    if(windowWidth < 560){
      setTitleEducEpxe("Éduc / Expé");
      titleContainer.classList.add("title-mobile-educ-expe");
    } else if(windowWidth >= 560){
      setTitleEducEpxe("Éducation / Expérience");
      titleContainer.classList.remove("title-mobile-educ-expe");
    }
  }, []);

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
    <div className="educExpe-section">
      <div id="educexpe" className="wrapper">
        <div className="title-left-admin">
          Éducation / Expérience
        </div>
        <div className="educExpe-container">
          <div className="title-container">
            <h2 ref={titleRef} className="title-mobile-educ-expe">{titleEducExpe}</h2>
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
  )
}

export default EducExpe;