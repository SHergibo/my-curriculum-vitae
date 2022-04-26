import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSTransition } from "react-transition-group";
import PuffLoader from "react-spinners/PuffLoader";
import PropTypes from "prop-types";

function ActionInsideButtonSubmit({
  buttonTxt,
  loadingRef,
  loader,
  successSpanRef,
  spanSuccess,
  errorSpanRef,
  spanError,
}) {
  return (
    <div className="btn-container">
      <button className="submit-signIn-signUp" type="submit">
        <span className="text-submit-signIn-signUp">{buttonTxt}</span>
        {!loader && !spanSuccess && !spanError && (
          <FontAwesomeIcon icon="envelope" />
        )}
        <CSSTransition
          nodeRef={loadingRef}
          in={loader}
          timeout={500}
          classNames="btnAnimation"
          unmountOnExit
        >
          <div ref={loadingRef} className="loading-action">
            <PuffLoader color={"#ffffff"} size={20} loading={loader} />
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
      </button>
    </div>
  );
}

ActionInsideButtonSubmit.propTypes = {
  buttonTxt: PropTypes.string.isRequired,
  loadingRef: PropTypes.object.isRequired,
  loader: PropTypes.bool.isRequired,
  successSpanRef: PropTypes.object.isRequired,
  spanSuccess: PropTypes.bool.isRequired,
  errorSpanRef: PropTypes.object.isRequired,
  spanError: PropTypes.bool.isRequired,
};

export default ActionInsideButtonSubmit;
