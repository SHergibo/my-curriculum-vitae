import React from "react";
import HomeSection from "../frontComponents/HomeSection";
import EmailAuthForm from "./signInSignUpForms/EmailAuthForm";

function SendBackEmailAuth() {
  return (
    <HomeSection
      welcome="Email d'authentification"
      name="Bienvenue"
      div={<EmailAuthForm emailFormName={"emailAuth"} />}
    />
  );
}

export default SendBackEmailAuth;
