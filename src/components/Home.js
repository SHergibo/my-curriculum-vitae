import React from 'react';

function Home() {
  return (
    <div className="home">
      <div>
        <div className="graphicOne"></div>
        <div className="graphicTwo"></div>
      </div>
      <section className="wrapper">
        <div className="welcome">
          welcome
            </div>
        <div className="wrapper titleDiv">
          <div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title"
          aria-describedby="desc" role="img" xmlnsXlink="http://www.w3.org/1999/xlink">
            <path data-name="layer2"
            fill="#202020" d="M2 8h60v8H2zm0 20h60v8H2z"></path>
            <path data-name="layer1" fill="#202020" d="M2 48h60v8H2z"></path>
          </svg>
          </div>
          <h1 className="homeGradient">Sacha Hergibo</h1>
          <div className="jobName">I'm a <span>developper</span></div>
        </div>
      </section>

    </div>
  );
}

export default Home;