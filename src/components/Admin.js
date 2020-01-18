import React from 'react';
import Home from './Home';
import Navbar from './Navbar';
import Footer from './Footer';
import BackToTop from './BackToTop';
import { logout } from './../utils/Auth';

function Admin({history, location}) {
  console.log(location);
  let logOut = async() =>{
    await logout();
    history.push("/");
  };
  return (
    <div>
      <header id="header">
        <Home location={location.pathname}/>
        <Navbar location={location.pathname} logout={logOut}/>
      </header>
      <main>

      </main>
      <footer>
        <Footer />
      </footer>
      <BackToTop />
    </div>
  )
}

export default Admin

