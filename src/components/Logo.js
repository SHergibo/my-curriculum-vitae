import React from "react";
import { useInfosData } from "../App";
import { animateScroll as scroll, Link } from "react-scroll";

function Logo() {
  const { generalInfo } = useInfosData();
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <div className="logo" onClick={scrollToTop} onKeyPress={scrollToTop}>
      <Link
        tabIndex={0}
        activeClass="active"
        to="home"
        spy={true}
        smooth={true}
        offset={0}
        duration={500}
      >
        <span>{generalInfo.firstname}</span>
      </Link>
    </div>
  );
}

export default Logo;
