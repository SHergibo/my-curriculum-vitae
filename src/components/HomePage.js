import React, { useEffect, useRef } from 'react';
import Home from './Home';
import Navbar from './Navbar';
import About from './About';
import Resume from './Resume';
// import Portfolio from './Portfolio';
import Contact from './Contact';
import Footer from './Footer';
import BackToTop from './BackToTop';
import PropTypes from 'prop-types';

function HomePage({ generalInfo }) {
  const headerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <header ref={headerRef} id="header">
        <Home generalInfo={generalInfo} />
        <Navbar
          headerRef={headerRef}
        />
      </header>
      <main>
        <About generalInfo={generalInfo} />
        <Resume />
        {/* <Portfolio /> */}
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
  generalInfo: PropTypes.object.isRequired
}

export default HomePage;
