import React from 'react';
import HomeAdmin from './HomeAdmin';
import Navbar from './Navbar';
import Footer from './Footer';
import BackToTop from './BackToTop';

function Admin(props) {
  console.log(props.location);
  return (
    <div>
      <header id="header">
        <HomeAdmin />
        <Navbar />
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

