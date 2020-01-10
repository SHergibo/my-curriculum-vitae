import React from "react";
import { animateScroll as scroll } from 'react-scroll';


function Logo() {
  const scrollToTop = () =>{
    scroll.scrollToTop();
  }
  return (
    <div>
      <div className="logo" onClick={scrollToTop}>
        <a href="#home">
          <span>Sacha</span>
        </a>
      </div>
    </div>
  );
}

export default Logo;