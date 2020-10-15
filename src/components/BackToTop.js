import React, { useEffect, useRef } from "react";
import { animateScroll as scroll } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function BackToTop() {
  const backToTop = useRef(null);

  const handleBackToTopScroll = () => {
    let btnBackToTop = backToTop.current;
    let scrollpage = Math.round(window.scrollY);
    let windowHeight = window.innerHeight;
    if(btnBackToTop){
      if (scrollpage > windowHeight) {
        btnBackToTop.classList.add("back-to-top-show");
      } else {
        btnBackToTop.classList.remove("back-to-top-show");
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleBackToTopScroll);
    return () => {
      window.removeEventListener('scroll', handleBackToTopScroll);
    }
  }, []);
  
  const scrollToTop = () =>{
    scroll.scrollToTop();
  }
  return (
    <div ref={backToTop} tabIndex={0} className="back-to-top" onClick={scrollToTop} onKeyPress={scrollToTop}>
      <FontAwesomeIcon icon="chevron-up" />
    </div>
  );
}

export default BackToTop;