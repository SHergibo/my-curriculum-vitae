import React from "react";
import HomeSection from "../frontComponents/HomeSection";
import LoginForm from "./signInSignUpForms/LoginForm";

function SignInSignUp() {
  return (
    <HomeSection welcome="Connexion" name="Bienvenue" div={<LoginForm />} />
  );
}

export default SignInSignUp;
