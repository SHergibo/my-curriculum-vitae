import React from "react";
import HomeSection from "../frontComponents/HomeSection";
import EmailAuthForm from "./signInSignUpForms/EmailAuthForm";

function FormEmailAuth() {
  return (
    <HomeSection
      welcome="Email d'authentification"
      name="Bienvenue"
      div={<EmailAuthForm emailFormName={"emailAuth"} />}
    />
  );
}

export default FormEmailAuth;
