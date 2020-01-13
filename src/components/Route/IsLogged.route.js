import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './../../utils/Auth';

function IsLoggedRoute({ component: Component, ...rest }) {
  return (
    <Route {...rest} render={(props) =>{
        if(isAuthenticated()){
          return <Redirect to={
            {
              pathname: "/admin",
              state : {
                form : props.location
              }
            }
          } />
        }else{
            return <Component {...props}/>          
        }
      }
    } />
  )
}

export default IsLoggedRoute;