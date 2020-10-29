import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition } from 'react-transition-group';
import PuffLoader from "react-spinners/PuffLoader";
import PropTypes from 'prop-types';

function ActionButtonSubmit({button, value, loadingRef, loader, successSpanRef, spanSuccess, errorSpanRef, spanError}) {
  return (
    <div className="btn-container">
      <button className="submit-contact" type="submit">
        {button}
        {!value && 
          <FontAwesomeIcon icon="plus" />
        }
        {value && 
          <FontAwesomeIcon icon="edit" />
        }
      </button>
      <CSSTransition
        nodeRef={loadingRef}
        in={loader}
        timeout={500}
        classNames="btnAnimation"
        unmountOnExit
      >
        <div ref={loadingRef} className="loading-action">
          <PuffLoader
            color={"#1e87f0"}
            size={40}
            loading={loader}
          />
        </div>
      </CSSTransition>

      <CSSTransition
        nodeRef={successSpanRef}
        in={spanSuccess}
        timeout={1000}
        classNames="btnAnimation"
        unmountOnExit
      >
        <span ref={successSpanRef} className="success-svg">
          <FontAwesomeIcon icon="check" />
        </span>
      </CSSTransition>

      <CSSTransition
        nodeRef={errorSpanRef}
        in={spanError}
        timeout={1000}
        classNames="btnAnimation"
        unmountOnExit
      >
        <span ref={errorSpanRef} className="error-svg">
        <FontAwesomeIcon icon="times" />
        </span>
      </CSSTransition>

    </div>
  )
}

ActionButtonSubmit.propTypes = {
  button: PropTypes.string.isRequired,
  value: PropTypes.object,
  loadingRef: PropTypes.object.isRequired,
  loader: PropTypes.bool.isRequired,
  successSpanRef: PropTypes.object.isRequired,
  spanSuccess: PropTypes.bool.isRequired,
  errorSpanRef: PropTypes.object.isRequired,
  spanError: PropTypes.bool.isRequired
}

export default ActionButtonSubmit

