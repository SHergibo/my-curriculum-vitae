import Axios from "axios";
import { apiDomain, apiVersion } from "./../apiConfig/ApiConfig";

let authenticated = false;

const loginIn = async (data) => {
  const loginEndpoint = `${apiDomain}/api/${apiVersion}/auth/login`;
  let response = {};

  await Axios.post(loginEndpoint, data)
    .then((res) => {
      if (
        res.status === 200 &&
        res.data.token.accessToken &&
        res.data.token.expiresIn
      ) {
        response.statusCode = res.status;

        localStorage.setItem("access_token", res.data.token.accessToken);
        localStorage.setItem(
          "refresh_token",
          res.data.token.refreshToken.token
        );
        localStorage.setItem("user_email", res.data.user.email);
        localStorage.setItem("userId", res.data.user._id);
        localStorage.setItem("expiresIn", res.data.token.expiresIn);
      }
    })
    .catch((error) => {
      response = error.response.data.output.payload;
    });
  return response;
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

const logout = async () => {
  const axiosLogout = createAxiosHeader();
  const logoutEndpoint = `${apiDomain}/api/${apiVersion}/auth/logout`;
  try {
    await axiosLogout.post(logoutEndpoint, {
      token: localStorage.getItem("refresh_token"),
      email: localStorage.getItem("user_email"),
    });
    localStorage.clear();
  } catch (error) {
    console.log(error);
  }
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
      localStorage.clear();
      sessionStorage.clear();
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
