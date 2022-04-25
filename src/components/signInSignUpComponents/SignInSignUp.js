import React, { useState } from "react";
import HomeSection from "../frontComponents/HomeSection";
import LoginForm from "./signInSignUpForms/LoginForm";
import EmailAuthForm from "./signInSignUpForms/EmailAuthForm";

function SignInSignUp() {
  const [switchForm, setSwitchForm] = useState(false);
  const [emailFormName, setEmailFormName] = useState("");

  return (
    <HomeSection
      welcome="Connexion"
      name="Bienvenue"
      div={
        !switchForm ? (
          <LoginForm
            setSwitchForm={setSwitchForm}
            setEmailFormName={setEmailFormName}
            emailFormNameState={{ emailFormName, setEmailFormName }}
          />
        ) : (
          <EmailAuthForm
            setSwitchForm={setSwitchForm}
            emailFormNameState={{ emailFormName, setEmailFormName }}
          />
        )
      }
    />
  );
}

export default SignInSignUp;
