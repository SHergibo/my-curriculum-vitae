import React, { useEffect, useRef } from "react";
import { animateScroll as scroll } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

function BackToTop() {
  const backToTop = useRef(null);
  useEffect(() => {
    window.addEventListener('scroll', () => {
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
    });
  }, []);
  const scrollToTop = () =>{
    scroll.scrollToTop();
  }
  return (
    <div ref={backToTop} tabIndex={0} className="back-to-top" onClick={scrollToTop} onKeyPress={scrollToTop}>
      <FontAwesomeIcon icon={faChevronUp} />
    </div>
  );
}

export default BackToTop;