import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { apiDomain, apiVersion } from './../apiConfig/ApiConfig';
import { format } from 'date-fns';
import Home from './Home';
import Navbar from './Navbar';
import About from './About';
import Resume from './Resume';
// import Portfolio from './Portfolio';
import Contact from './Contact';
import Footer from './Footer';
import BackToTop from './BackToTop';

function HomePage() {
  const headerRef = useRef(null);
  const [generalInfo, setGeneralInfo] = useState({
    firstname: "",
    lastname: "",
    "address":{
      "street":"",
      "number":"",
      "zip":"",
      "city":""
    },
    "phone":"",
    "email":"",
    "birthdate":"",
    "licence":""
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const getData = async () => {
      const getGeneralInfoEndPoint = `${apiDomain}/api/${apiVersion}/info`;
      await axios.get(getGeneralInfoEndPoint)
      .then((response) => {
        if(response.data){
          let formatDate = format(
            new Date(response.data.birthdate),
            'dd/MM/yyyy'
          );
          response.data.birthdate = formatDate;
          setGeneralInfo(response.data);
        }
      });
    };
    getData();
  }, []);



  return (
    <>
      <header ref={headerRef} id="header">
        <Home data={generalInfo} />
        <Navbar
          headerRef={headerRef}
        />
      </header>
      <main>
        <About data={generalInfo} />
        <Resume />
        {/* <Portfolio /> */}
        <Contact data={generalInfo} />
      </main>
      <footer>
        <Footer />
      </footer>
      <BackToTop />
    </>
  );
}

export default HomePage;
