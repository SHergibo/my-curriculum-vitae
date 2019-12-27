import React from "react";
import Typed from 'react-typed';

function Home() {
  return (
    <div id="home">
      <div className="graphic-container">
        <div className="graphic-one"></div>
        <div className="graphic-two"></div>
      </div>
      <div className="home wrapper">
        <div className="welcome">
          welcome
      </div>
        <section className="wrapper">
          <div className="wrapper title-home-div">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title"
                aria-describedby="desc" role="img" xmlnsXlink="http://www.w3.org/1999/xlink">
                <path data-name="layer2"
                  fill="#202020" d="M2 8h60v8H2zm0 20h60v8H2z"></path>
                <path data-name="layer1" fill="#202020" d="M2 48h60v8H2z"></path>
              </svg>
            </div>
            <h1 className="home-gradient">Sacha Hergibo</h1>
            <div className="job-name">I'm a <Typed
              strings={['web developper', 'web integrator']}
              typeSpeed={80}
              loop
              smartBackspace={false}
            />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default Home;