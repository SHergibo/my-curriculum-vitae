import React from 'react';
import Home from './Home';
import Navbar from './Navbar';
import About from './About';
import Resume from './Resume';
import Contact from './Contact';
import Footer from './Footer';
import BackToTop from './BackToTop';

function HomePage() {
  return (
    <div className="App">
      <header id="header">
        <Home />
        <Navbar />
      </header>
      <main>
        <About />
        <Resume />
        <Contact />
      </main>
      <footer>
        <Footer />
      </footer>
      <BackToTop />
    </div>
  );
}

export default HomePage;
