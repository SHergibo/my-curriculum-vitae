import Axios from 'axios';
import {apiDomain, apiVersion} from './../apiConfig/ApiConfig';

let response;
let authenticated = false;

const loginIn = async (data) =>{
  const loginEndpoint = `${apiDomain}/api/${apiVersion}/auth/login`;

  await Axios.post(loginEndpoint, data)
  .then((res) =>{
    if(res.status === 200 && res.data.token.accessToken && res.data.token.expiresIn){
      response = res.status;
      let accessToken = res.data.token.accessToken;
      let refresh_token = res.data.token.refreshToken.token;
      let user_id = res.data.user._id;
      let user_email = res.data.user.email;
  
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem('refresh_token', refresh_token);
      localStorage.setItem('user_id', user_id);
      localStorage.setItem('user_email', user_email);
    }
  })
  .catch((error) =>{
    response = 401;
  })
  return response;
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