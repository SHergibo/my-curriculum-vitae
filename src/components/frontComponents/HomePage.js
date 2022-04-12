import React, { useEffect, useRef } from "react";
import Home from "./Home";
import Navbar from "../Navbar";
import About from "./About";
import Resume from "./resumeComponents/Resume";
import Portfolio from "./portfolio/Portfolio";
import Contact from "./Contact";
import Footer from "../Footer";
import BackToTop from "../BackToTop";
import PropTypes from "prop-types";

function HomePage({ isLoaded }) {
  const headerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <header ref={headerRef} id="header">
        <Home />
        <Navbar headerRef={headerRef} />
      </header>
      <main>
        <About isLoaded={isLoaded} />
        <Portfolio isLoaded={isLoaded} />
        <Resume isLoaded={isLoaded} />
        <Contact />
      </main>
      <footer>
        <Footer />
      </footer>
      <BackToTop />
    </>
  );
}

HomePage.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
};

export default HomePage;
