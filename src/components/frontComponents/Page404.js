import React from "react";
import { useNavigate } from "react-router-dom";
import HomeSection from "./HomeSection";

function Page404() {
  let navigate = useNavigate();

  const returnHome = () => {
    navigate("/");
  };

  const div = (
    <div className="page-404">
      <p className="sub-name">Page non trouvée !</p>
      <button className="return-hompepage" onClick={returnHome}>
        Accueil
      </button>
    </div>
  );

  return <HomeSection welcome="404 page non trouvée !" name="404" div={div} />;
}

export default Page404;
