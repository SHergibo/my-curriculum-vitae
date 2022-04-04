import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HomeSection from "./HomeSection";
import Typed from "react-typed";
import PropTypes from "prop-types";

function Home({ generalInfo }) {
  const location = useLocation();
  const [fullName, setFullName] = useState("");
  const [div, setDiv] = useState();
  const [welcome, setWelcome] = useState("Bienvenue");
  const [profTitleArray, setProfTitleArray] = useState([]);

  useEffect(() => {
    if (generalInfo && location.pathname === "/") {
      setProfTitleArray([]);
      generalInfo.professionTitles.forEach((profTitle) => {
        setProfTitleArray((prevArray) => [
          ...prevArray,
          profTitle.nameProfessionTitle,
        ]);
      });
    }
  }, [generalInfo, location.pathname]);

  useEffect(() => {
    if (generalInfo?.firstname) {
      setFullName(`${generalInfo.firstname} ${generalInfo.lastname}`);
    } else {
      setFullName("Mon site CV");
    }
  }, [generalInfo]);

  useEffect(() => {
    if (profTitleArray.length >= 1 && location.pathname !== "/admin") {
      setDiv(
        <div className="job-name">
          Je suis un{" "}
          <Typed
            strings={profTitleArray}
            typeSpeed={80}
            loop
            smartBackspace={false}
          />
        </div>
      );
    }
    if (location.pathname === "/admin") {
      setDiv(<div className="sub-name">Partie administration</div>);
      setWelcome("Administration");
    }
  }, [profTitleArray, location]);

  return <HomeSection welcome={welcome} name={fullName} div={div} />;
}

Home.propTypes = {
  generalInfo: PropTypes.object,
};

export default Home;
