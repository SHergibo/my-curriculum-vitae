import React, { useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { apiDomain, apiVersion } from "./../../apiConfig/ApiConfig";

function EmailAuth() {
  let { emailAuthToken } = useParams();
  let navigate = useNavigate();

  const sendEmailAuthToken = useCallback(async () => {
    const sendEmailAuth = `${apiDomain}/api/${apiVersion}/email-auth/${emailAuthToken}`;
    await axiosInstance
      .patch(sendEmailAuth)
      .then((response) => {
        if (response.status === 204) {
          navigate("/login");
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          // navigate("/login");
        }
      });
  }, [emailAuthToken, navigate]);

  useEffect(() => {
    sendEmailAuthToken();
  }, [sendEmailAuthToken]);

  return <div></div>;
}

export default EmailAuth;
