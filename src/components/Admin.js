import React from 'react';
import { logout } from './../utils/Auth';

function Admin({history}) {
  let logOut = async() =>{
    await logout();
    history.push("/");
  };
  return (
    <div>
      ADMIN
      <button onClick={logOut}>Logout</button>
    </div>
  )
}

export default Admin

