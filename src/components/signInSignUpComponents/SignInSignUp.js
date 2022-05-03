import React, { useEffect, useState, useCallback } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { apiDomain, apiVersion } from "../../apiConfig/ApiConfig";
import Loading from "../Loading";
import HomeSection from "../frontComponents/HomeSection";
import LoginForm from "./signInSignUpForms/LoginForm";
import CreateUserAccountForm from "./signInSignUpForms/CreateUserAccountForm";

function SignInSignUp() {
  const [loading, setLoading] = useState(true);
  const [errorFetch, setErrorFetch] = useState(false);
  const [userExist, setUserExist] = useState(false);

  const checkIfUserExist = useCallback(async () => {
    setErrorFetch(false);
    setLoading(true);
    const checkIfUserExistEndPoint = `${apiDomain}/api/${apiVersion}/users`;
    await axiosInstance
      .get(checkIfUserExistEndPoint)
      .then((response) => {
        setLoading(false);
        if (response.data.userExist) setUserExist(true);
      })
      .catch(() => {
        setErrorFetch(true);
      });
  }, []);

  useEffect(() => {
    checkIfUserExist();
  }, [checkIfUserExist]);

  return (
    <>
      <Loading
        loading={loading}
        errorFetch={errorFetch}
        retryFetch={checkIfUserExist}
      />
      <HomeSection
        welcome={userExist ? "Connexion" : "Création d'un nouveau compte"}
        name="Bienvenue"
        div={userExist ? <LoginForm /> : <CreateUserAccountForm />}
      />
    </>
  );
}

export default SignInSignUp;
