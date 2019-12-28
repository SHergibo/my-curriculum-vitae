import React from 'react';
import './styles/Styles.scss';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import Resume from './components/Resume';

function App() {
  return (
    <div>
      <header id="header">
        <Home />
        <Navbar />
      </header>
      <main>
        <About />
        <Resume />
      </main>
    </div>
  );
}

export default App;
