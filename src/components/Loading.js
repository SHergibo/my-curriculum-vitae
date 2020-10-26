import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import PuffLoader from "react-spinners/PuffLoader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Loading({ loading, errorFetch, retryFetch }) {
  const [animLoading, setAnimLoading] = useState(true);
  const loadingRef = useRef(null);

  useEffect(() => {
    let animationLoading;
    let deleteContainerLoading;
    if(loading){
      setAnimLoading(true);
    }else{
      animationLoading = setTimeout(() => {
        loadingRef.current.style.opacity = 0; 
      }, 400);

      deleteContainerLoading = setTimeout(() => {
        setAnimLoading(false);
      }, 1000);
    }
    
    return () => {
      clearInterval(animationLoading);
      clearInterval(deleteContainerLoading);
    }

  }, [loading]);

  return (
    <>
      {animLoading && 
        <div ref={loadingRef} className="loading-container">
          {!errorFetch &&
            <div className="loader">
              <PuffLoader
                color={"#1e87f0"}
                loading={animLoading}
              />
            </div>
          }
          {errorFetch &&
            <div className="loader">
              <p>Une erreur est survenue !</p>
              <button className="submit-contact" onClick={retryFetch}><FontAwesomeIcon icon="undo" />Réessayer</button>
            </div>
          }
        </div>
      }
    </>
  )
}

Loading.propTypes = {
  loading : PropTypes.bool.isRequired,
  errorFetch : PropTypes.bool.isRequired,
  retryFetch : PropTypes.func.isRequired,
}

export default Loading


