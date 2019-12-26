import React from 'react';
import './styles/Styles.scss';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';

function App() {
  return (
    <div>
      <header id="header">
        <Home />
        <Navbar />
      </header>
      <main>
        <About />
      </main>
    </div>
  );
}

export default App;
