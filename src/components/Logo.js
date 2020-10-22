import React from "react";
import { animateScroll as scroll, Link } from 'react-scroll';

function Logo() {
  const scrollToTop = () =>{
    scroll.scrollToTop();
  }

  return (
    <div  className="logo" onClick={scrollToTop} onKeyPress={scrollToTop}>
      <Link tabIndex={0} activeClass="active" to="home" spy={true} smooth={true} offset={0} duration={500}>
        <span>Sacha</span>
      </Link>
    </div>
  );    
}

export default Logo;