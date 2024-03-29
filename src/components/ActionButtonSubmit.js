import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSTransition } from "react-transition-group";
import PuffLoader from "react-spinners/PuffLoader";
import PropTypes from "prop-types";

function ActionButtonSubmit({
  button,
  value,
  loadingRef,
  loader,
  successSpanRef,
  spanSuccess,
  errorSpanRef,
  spanError,
  formContact,
}) {
  return (
    <div className="btn-container">
      <button className="btn-submit-action" type="submit">
        {button}
        {!value && !formContact && <FontAwesomeIcon icon="plus" />}
        {value && !formContact && <FontAwesomeIcon icon="edit" />}
        {formContact && <FontAwesomeIcon icon="paper-plane" />}
      </button>
      <CSSTransition
        nodeRef={loadingRef}
        in={loader}
        timeout={500}
        classNames="btnAnimation"
        unmountOnExit
      >
        <div ref={loadingRef} className="loading-action">
          <PuffLoader color={"#1e87f0"} size={40} loading={loader} />
        </div>
      </CSSTransition>

      <CSSTransition
        nodeRef={successSpanRef}
        in={spanSuccess}
        timeout={2900}
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
        timeout={2900}
        classNames="btnAnimation"
        unmountOnExit
      >
        <span ref={errorSpanRef} className="error-svg">
          <FontAwesomeIcon icon="times" />
        </span>
      </CSSTransition>
    </div>
  );
}

ActionButtonSubmit.propTypes = {
  button: PropTypes.string.isRequired,
  value: PropTypes.object,
  loadingRef: PropTypes.object.isRequired,
  loader: PropTypes.bool.isRequired,
  successSpanRef: PropTypes.object.isRequired,
  spanSuccess: PropTypes.bool.isRequired,
  errorSpanRef: PropTypes.object.isRequired,
  spanError: PropTypes.bool.isRequired,
};

export default ActionButtonSubmit;
