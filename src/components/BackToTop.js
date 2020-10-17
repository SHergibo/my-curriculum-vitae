import React, { useEffect, useState, useCallback } from "react";
import { animateScroll as scroll } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function BackToTop() {
  const [show, setShow] = useState(false);

  const handleBackToTopScroll= useCallback(() => {
    let scrollpage = Math.round(window.scrollY);
    let windowHeight = window.innerHeight;
    if (scrollpage > windowHeight) {
      setShow(true);
    } else {
      setShow(false);
    }
  },[]);

  useEffect(() => {
    window.addEventListener('scroll', handleBackToTopScroll);
    return () => {
      window.removeEventListener('scroll', handleBackToTopScroll);
    }
  }, [handleBackToTopScroll]);
  
  const scrollToTop = () =>{
    scroll.scrollToTop();
  }
  return (
    <>
      {show && 
        <div tabIndex={0} className="back-to-top" onClick={scrollToTop} onKeyPress={scrollToTop}>
          <FontAwesomeIcon icon="chevron-up" />
        </div>
      }
    </>
  );
}

export default BackToTop;