import React, { useEffect, useState } from "react";
import HomeSection from "./HomeSection";
import Typed from 'react-typed';
import PropTypes from 'prop-types';

function Home({ location, data }) {
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    if(data){
      setFullName(`${data.firstname} ${data.lastname}`);
    }else{
      setFullName('Mon site CV')
    }
  }, [data]);

  let div = <div className="job-name">Je suis un <Typed
                strings={['développeur web', 'integrateur web']}
                typeSpeed={80}
                loop
                smartBackspace={false}
              />
              </div>;

  let welcome = "Bienvenue";

  if(location === "/admin"){
    div = <div className="sub-name">
            Partie administration
          </div>;

    welcome = "Administration";
  }  

  return (
    <HomeSection welcome={welcome} name={fullName} div={div} />
  );
}

Home.propTypes = {
  data: PropTypes.object,
}


export default Home;