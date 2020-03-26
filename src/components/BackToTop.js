import React, { useEffect } from "react";
import { animateScroll as scroll } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

function BackToTop() {
  useEffect(() => {
    window.addEventListener('scroll', () => {
      let btnBackToTop = document.getElementsByClassName('back-to-top')[0];
      let scrollpage = Math.round(window.scrollY);
      let windowHeight = window.innerHeight;
      if (scrollpage > windowHeight) {
        btnBackToTop.classList.add("back-to-top-show");
      } else {
        btnBackToTop.classList.remove("back-to-top-show");
      }
    });
  }, []);
  const scrollToTop = () =>{
    scroll.scrollToTop();
  }
  return (
    <div tabIndex={0} className="back-to-top" onClick={scrollToTop} onKeyPress={scrollToTop}>
      <FontAwesomeIcon icon={faChevronUp} />
    </div>
  );
}

export default BackToTop;