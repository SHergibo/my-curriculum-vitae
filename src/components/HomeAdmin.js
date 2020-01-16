import React from "react";
import HomeSection from "./HomeSection";
import { logout } from './../utils/Auth';


function HomeAdmin({history}) {
  let logOut = async() =>{
    await logout();
    history.push("/");
  };
  const div = <div className="admin-name">
                Partie administration
              </div>;

  return (
    <div>
    <HomeSection welcome="Administration" name="Sacha Hergibo" div={div} /> // TODO faire un appel pour recherche le nom admin ou le stocker quelque part lors de la connexion
    <button onClick={logOut}>logout</button>
    </div>
    
  );
}

export default HomeAdmin;