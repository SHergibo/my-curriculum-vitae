import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function ContactInput(props) {
  if (props.inputType === "input") {
    return (
      <div className="input">
        <label htmlFor={props.id}>{props.label}*</label>
        <div>
          <span><FontAwesomeIcon icon={props.fontAwe} /></span>
          <input type={props.type} id={props.id} placeholder={props.text} />
        </div>
      </div>
    );
  } else if (props.inputType === "text-area") {
    return (
      <div className="text-area">
        <label htmlFor={props.id}>{props.label}*</label>
        <div>
          <textarea id={props.id} placeholder={props.text} />
        </div>
      </div>
    );
  }
}

export default ContactInput;