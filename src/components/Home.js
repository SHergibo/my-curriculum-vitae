import React from "react";
import HomeSection from "./HomeSection";
import Typed from 'react-typed';

function Home() {
  const div = <div className="job-name">Je suis un <Typed
                strings={['développeur web', 'integrateur web']}
                typeSpeed={80}
                loop
                smartBackspace={false}
              />
              </div>;
  return (
    <HomeSection welcome="Bienvenue" name="Sacha Hergibo" div={div} />
  );
}

export default Home;