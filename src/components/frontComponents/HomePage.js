import React, { useEffect, useRef } from "react";
import Home from "../Home";
import Navbar from "../Navbar";
import About from "./About";
import Resume from "./resumeComponents/Resume";
import Portfolio from "./portfolio/Portfolio";
import Contact from "./Contact";
import Footer from "../Footer";
import BackToTop from "../BackToTop";
import PropTypes from "prop-types";

function HomePage({ generalInfo, isLoaded }) {
  const headerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <header ref={headerRef} id="header">
        <Home generalInfo={generalInfo} />
        <Navbar headerRef={headerRef} />
      </header>
      <main>
        <About generalInfo={generalInfo} />
        <Portfolio isLoaded={isLoaded} />
        <Resume isLoaded={isLoaded} />
        <Contact generalInfo={generalInfo} />
      </main>
      <footer>
        <Footer />
      </footer>
      <BackToTop />
    </>
  );
}

HomePage.propTypes = {
  generalInfo: PropTypes.object.isRequired,
  isLoaded: PropTypes.bool.isRequired,
};

export default HomePage;
