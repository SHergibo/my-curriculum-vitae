import React from 'react';
import './styles/Styles.scss';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
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
    </div>
  );
}

export default App;
