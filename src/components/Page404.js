import React from 'react';
import HomeSection from "./HomeSection";
import PropTypes from 'prop-types';

function Page404({ history }) {

  const returnHome = () => {
    history.push("/");
  };


  const div = <div className="page-404">
                <p className="sub-name">Page non trouvée !</p>
                <button className="return-hompepage" onClick={returnHome}>Accueil</button>
              </div>

  return (
    <HomeSection welcome="404 not found" name="404" div={div} />
  )
}


Page404.propTypes = {
  history: PropTypes.object,
}


export default Page404;