import React, { useState, useCallback, useEffect } from "react";
import "./styles/Styles.scss";
import axios from "axios";
import { apiDomain, apiVersion } from "./apiConfig/ApiConfig";
import { format } from "date-fns";
import Loading from "./components/Loading";
import HomePage from "./components/frontComponents/HomePage";
import Admin from "./components/adminComponents/Admin";
import { Route, Routes, useLocation } from "react-router-dom";
import IsLoggedRoute from "./components/routeComponents/IsLogged.route";
import ProtectedRoute from "./components/routeComponents/Protected.route";
import Login from "./components/adminComponents/Login";
import Page404 from "./components/frontComponents/Page404";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fab, fas);

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [errorFetch, setErrorFetch] = useState(false);
  const [generalInfo, setGeneralInfo] = useState({
    firstname: "",
    lastname: "",
    address: {
      street: "",
      number: "",
      zip: "",
      city: "",
    },
    phone: "",
    email: "",
    birthdate: "",
    licence: "",
    professionTitles: [],
    profilePic: {},
  });
  const [isLoaded, setIsLoaded] = useState(false);

  const getData = useCallback(async () => {
    setErrorFetch(false);
    setLoading(true);
    const getGeneralInfoEndPoint = `${apiDomain}/api/${apiVersion}/infos`;
    await axios
      .get(getGeneralInfoEndPoint)
      .then((response) => {
        if (response.data) {
          let formatDate = format(
            new Date(response.data.birthdate),
            "dd/MM/yyyy"
          );
          response.data.isoDate = response.data.birthdate;
          response.data.birthdate = formatDate;
          setGeneralInfo(response.data);
        }
        setLoading(false);
        setIsLoaded(true);
      })
      .catch((error) => {
        let jsonError = JSON.parse(JSON.stringify(error));
        if (error.code === "ECONNABORTED" || jsonError.name === "Error") {
          setErrorFetch(true);
        }
      });
  }, []);

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/admin") getData();
  }, [getData, location.pathname]);

  return (
    <div>
      {(location.pathname === "/" || location.pathname === "/admin") && (
        <Loading
          loading={loading}
          errorFetch={errorFetch}
          retryFetch={getData}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={<HomePage generalInfo={generalInfo} isLoaded={isLoaded} />}
        />
        <Route element={<IsLoggedRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route
            path="/admin"
            element={<Admin generalInfoAdmin={generalInfo} />}
          />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
