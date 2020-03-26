import React, { Fragment } from "react";
import { animateScroll as scroll } from 'react-scroll';


function Logo() {
  const scrollToTop = () =>{
    scroll.scrollToTop();
  }
  return (
    <Fragment>
      <div className="logo" onClick={scrollToTop}>
        <a href="#home">
          <span>Sacha</span>
        </a>
      </div>
    </Fragment>
  );
}

export default Logo;