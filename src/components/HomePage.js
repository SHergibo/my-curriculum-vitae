import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiDomain, apiVersion } from './../apiConfig/ApiConfig';
import { format } from 'date-fns';
import Home from './Home';
import Navbar from './Navbar';
import About from './About';
import Resume from './Resume';
import Contact from './Contact';
import Footer from './Footer';
import BackToTop from './BackToTop';

function HomePage() {
  const [generalInfo, setGeneralInfo] = useState({
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
    const getData = async () => {
      const getGeneralInfoEndPoint = `${apiDomain}/api/${apiVersion}/info`;
      await axios.get(getGeneralInfoEndPoint)
      .then((response) => {
        if(response.data.length > 0){
          let formatDate = format(
            new Date(response.data[0].birthdate),
            'dd/MM/yyyy'
          );
          response.data[0].birthdate = formatDate;
          setGeneralInfo(response.data[0]);
        }
      });
    };
    getData();
  }, []);



  return (
    <div>
      <header id="header">
        <Home />
        <Navbar />
      </header>
      <main>
        <About data={generalInfo} />
        <Resume />
        <Contact data={generalInfo} />
      </main>
      <footer>
        <Footer />
      </footer>
      <BackToTop />
    </div>
  );
}

export default HomePage;
