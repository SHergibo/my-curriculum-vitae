import React from "react";
import { animateScroll as scroll } from 'react-scroll';

function Logo() {
  const scrollToTop = () =>{
    scroll.scrollToTop();
  }
  return (
    <div className="logo" onClick={scrollToTop}>
      <a tabIndex={0} href="#home">
        <span>Sacha</span>
      </a>
    </div>
  );
}

export default Logo;