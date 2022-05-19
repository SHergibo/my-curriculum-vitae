import React, { useEffect, useCallback, useRef } from "react";
import PropTypes from "prop-types";

function HomeSection({ welcome, name, div }) {
  const graphicOneRef = useRef(null);
  const graphicTwoRef = useRef(null);
  const welcomeRef = useRef(null);

  let staticWindowCalc =
    (window.innerHeight - Math.round(window.scrollY)) / 100;

  const handleMenuScroll = useCallback(() => {
    let windowHeight = window.innerHeight;
    let scroll = Math.round(window.scrollY);
    if (scroll < windowHeight) {
      let blur =
        Math.round(staticWindowCalc + 1) - (windowHeight - scroll) / 100;
      graphicOneRef.current.style.filter = `blur(${blur}px)`;
      graphicTwoRef.current.style.filter = `blur(${blur}px)`;
      welcomeRef.current.style.filter = `blur(${blur}px)`;
    }

    if (scroll === 0) {
      graphicOneRef.current.style.filter = null;
      graphicTwoRef.current.style.filter = null;
      welcomeRef.current.style.filter = null;
    }
  }, [staticWindowCalc]);

  useEffect(() => {
    window.addEventListener("scroll", handleMenuScroll);
    return () => {
      window.removeEventListener("scroll", handleMenuScroll);
    };
  }, [handleMenuScroll]);

  return (
    <div id="home">
      <div className="graphic-container">
        <div ref={graphicOneRef} className="graphic-one"></div>
        <div ref={graphicTwoRef} className="graphic-two"></div>
      </div>
      <div className="home wrapper">
        <div ref={welcomeRef} className="welcome">
          {welcome}
        </div>
        <div className="wrapper title-home-div">
          <svg
            id="svgHome"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            aria-labelledby="title"
            aria-describedby="desc"
            role="img"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <path
              data-name="layer2"
              fill="#202020"
              d="M2 8h60v8H2zm0 20h60v8H2z"
            ></path>
            <path data-name="layer1" fill="#202020" d="M2 48h60v8H2z"></path>
          </svg>
          <h1 className="home-gradient">{name}</h1>
          {div}
        </div>
      </div>
    </div>
  );
}

HomeSection.propTypes = {
  welcome: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  div: PropTypes.object,
};

export default HomeSection;
