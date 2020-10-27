import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
      <span ref={loadingRef} className="loading-action">
        <PuffLoader
          color={"#1e87f0"}
          size={40}
          loading={loader}
        />
      </span>
      <span ref={successSpanRef} className="success-svg">
        {spanSuccess && <FontAwesomeIcon icon="check" />}
      </span>
      <span ref={errorSpanRef} className="error-svg">
        {spanError && <FontAwesomeIcon icon="times" />}
      </span>
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

