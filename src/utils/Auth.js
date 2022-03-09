import Axios from "axios";
import { apiDomain, apiVersion } from "./../apiConfig/ApiConfig";

let response;
let authenticated = false;

const loginIn = async (data) => {
  const loginEndpoint = `${apiDomain}/api/${apiVersion}/auth/login`;

  await Axios.post(loginEndpoint, data)
    .then((res) => {
      if (
        res.status === 200 &&
        res.data.token.accessToken &&
        res.data.token.expiresIn
      ) {
        response = res.status;

        localStorage.setItem("access_token", res.data.token.accessToken);
        localStorage.setItem(
          "refresh_token",
          res.data.token.refreshToken.token
        );
        localStorage.setItem("user_email", res.data.user.email);
        localStorage.setItem("expiresIn", res.data.token.expiresIn);
      }
    })
    .catch((error) => {
      response = 401;
    });
  return response;
};

const logout = async () => {
  const logoutEndpoint = `${apiDomain}/api/${apiVersion}/auth/logout`;
  try {
    await Axios.post(logoutEndpoint, {
      token: localStorage.getItem("refresh_token"),
      email: localStorage.getItem("user_email"),
    });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_email");
    localStorage.removeItem("expiresIn");
  } catch (error) {
    console.log(error);
  }
};

const createAxiosHeader = () => {
  return Axios.create({
    baseURL: apiDomain,
    timeout: 5000,
    headers: {
      ContentType: "applications/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
};

const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  const email = localStorage.getItem("user_email");
  if (refreshToken && email) {
    const refresh = createAxiosHeader();
    try {
      await refresh
        .post(`/api/${apiVersion}/auth/refresh-token`, {
          refreshToken,
          email,
        })
        .then((response) => {
          localStorage.setItem("access_token", response.data.accessToken);
          localStorage.setItem(
            "refresh_token",
            response.data.refreshToken.token
          );
          localStorage.setItem("expiresIn", response.data.expiresIn);
        });
      return true;
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
};

const checkAuth = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  const email = localStorage.getItem("user_email");
  if (refreshToken && email) {
    const checkAuth = createAxiosHeader();
    try {
      await checkAuth.get(`/api/${apiVersion}/auth/check-token`);
      return true;
    } catch (error) {
      return false;
    }
  } else {
    return false;
  }
};

const isAuthenticated = async () => {
  if (await checkAuth()) {
    authenticated = true;
  } else {
    authenticated = false;
  }

  return authenticated;
};

export { loginIn, logout, isAuthenticated, refreshToken };
