import Axios from 'axios';
import {apiDomain, apiVersion} from './../apiConfig/ApiConfig';

let needVerifiedAccount = false;
let authenticated = false;

const loginIn = async (data) =>{
  const loginEndpoint = `${apiDomain}/api/${apiVersion}/auth/login`;
  try {

    Axios.interceptors.response.use(response => {
      return response;
      }, error => {
        if (error.response.status === 403) {
          needVerifiedAccount = true;
        }
      return error;
    });

    let response = await Axios.post(loginEndpoint, data);
    if(response.status === 200 && response.data.token.accessToken && response.data.token.expiresIn){
      let accessToken = response.data.token.accessToken;
      let refresh_token = response.data.token.refreshToken.token;
      let user_id = response.data.user._id;
      let user_email = response.data.user.email;

      localStorage.setItem("access_token", accessToken);
      localStorage.setItem('refresh_token', refresh_token);
      localStorage.setItem('user_id', user_id);
      localStorage.setItem('user_email', user_email);
    }
  } catch (error) {
    console.log(error);
  }

  return needVerifiedAccount;
};

const logout = async() =>{
  const logoutEndpoint = `${apiDomain}/api/${apiVersion}/auth/logout`;
  try {
    await Axios.post(logoutEndpoint, {
      token : localStorage.getItem('refresh_token'),
      email : localStorage.getItem('user_email')
    });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_email');

  } catch (error) {
    console.log(error);
  }
};

const isAuthenticated = () =>{
  if(localStorage.getItem("access_token")){
    authenticated = true;
  }else{
    authenticated = false;
  }
  return authenticated;
}

export { loginIn, logout, isAuthenticated };