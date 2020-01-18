import React from "react";
import HomeSection from "./HomeSection";
import Typed from 'react-typed';

function Home({ location }) {
  let div = <div className="job-name">Je suis un <Typed
                strings={['développeur web', 'integrateur web']}
                typeSpeed={80}
                loop
                smartBackspace={false}
              />
              </div>;

  let welcome = "Bienvenue";

  let name = "Sacha Hergibo";

  if(location === "/admin"){
    div = <div className="admin-name">
            Partie administration
          </div>;

    welcome = "Administration";

    name = "Sacha Hergibo"; // TODO faire un appel pour recherche le nom admin ou le stocker quelque part lors de la connexion
  }  

  return (
    <HomeSection welcome={welcome} name={name} div={div} />
  );
}

export default Home;