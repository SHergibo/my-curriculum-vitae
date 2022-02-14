import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../../utils/Auth";

const ProtectedRoute = () => {
  const [logged, setLogged] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      isAuthenticated().then((res) => {
        setLogged(res);
      });
    };
    checkAuth();
  }, []);

  return logged ? <Outlet /> : <Navigate replace to="/login" />;
};

export default ProtectedRoute;
