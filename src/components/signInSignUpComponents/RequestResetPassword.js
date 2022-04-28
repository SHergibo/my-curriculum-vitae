import React from "react";
import HomeSection from "../frontComponents/HomeSection";
import EmailAuthForm from "./signInSignUpForms/EmailAuthForm";

function RequestResetPassword() {
  return (
    <HomeSection
      welcome="Requête changement de mot de passe"
      name="Bienvenue"
      div={<EmailAuthForm emailFormName={"wrongPassword"} />}
    />
  );
}

export default RequestResetPassword;
