import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../../utils/Auth";

const IsLoggedRoute = () => {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      isAuthenticated().then((res) => {
        setLogged(res);
      });
    };
    checkAuth();
  }, []);

  return logged ? <Navigate replace to="/admin" /> : <Outlet />;
};

export default IsLoggedRoute;
