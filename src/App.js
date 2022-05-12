import React, {
  useContext,
  createContext,
  useState,
  useCallback,
  useEffect,
} from "react";
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
import SignInSignUp from "./components/signInSignUpComponents/SignInSignUp";
import TestEmailAuth from "./components/signInSignUpComponents/TestEmailAuth";
import SendBackEmailAuth from "./components/signInSignUpComponents/SendBackEmailAuth";
import RequestResetPassword from "./components/signInSignUpComponents/RequestResetPassword";
import ResetPassword from "./components/signInSignUpComponents/ResetPassword";
import Page404 from "./components/frontComponents/Page404";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fab, fas);
const InfosDataContext = createContext();

export function useInfosData() {
  return useContext(InfosDataContext);
}

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
    hasPortfolio: false,
    hasResume: false,
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
    <>
      {(location.pathname === "/" || location.pathname === "/admin") && (
        <Loading
          loading={loading}
          errorFetch={errorFetch}
          retryFetch={getData}
        />
      )}
      <InfosDataContext.Provider value={{ generalInfo, setGeneralInfo }}>
        <Routes>
          <Route path="/" element={<HomePage isLoaded={isLoaded} />} />
          <Route path="/send-back-email-auth" element={<SendBackEmailAuth />} />
          <Route
            path="/email-auth/:emailAuthToken"
            element={<TestEmailAuth />}
          />
          <Route
            path="/request-reset-password"
            element={<RequestResetPassword />}
          />
          <Route
            path="/reset-password/:resetPasswordAuthToken"
            element={<ResetPassword />}
          />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<Admin />} />
          </Route>

          <Route element={<IsLoggedRoute />}>
            <Route path="/login" element={<SignInSignUp />} />
          </Route>

          <Route path="*" element={<Page404 />} />
        </Routes>
      </InfosDataContext.Provider>
    </>
  );
}

export default App;
