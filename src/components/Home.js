import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HomeSection from "./HomeSection";
import Typed from 'react-typed';
import PropTypes from 'prop-types';

function Home({ generalInfo }) {
  const [fullName, setFullName] = useState("");
  const [welcome, setWelcome] = useState("Bienvenue");
  const [div, setDiv] = useState(
    <div className="job-name">Je suis un <Typed
    strings={['développeur web', 'intégrateur web']}
    typeSpeed={80}
    loop
    smartBackspace={false}
    />
    </div>
  );
  const location = useLocation();

  useEffect(() => {
    if(generalInfo){
      setFullName(`${generalInfo.firstname} ${generalInfo.lastname}`);
    }else{
      setFullName('Mon site CV')
    }
  }, [generalInfo]);

  useEffect(() => {
    if(location.pathname === "/admin"){
      setDiv(
        <div className="sub-name">
          Partie administration
        </div>
      );
      setWelcome('Administration');
    }
  }, [location])

  return (
    <HomeSection 
    welcome={welcome} 
    name={fullName} 
    div={div} />
  );
}

Home.propTypes = {
  generalInfo: PropTypes.object,
}


export default Home;