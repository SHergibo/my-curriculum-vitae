import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './../../utils/Auth';

function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route {...rest} render={(props) =>{
        if(isAuthenticated()){
          return <Component {...props}/>
        }else{
          return <Redirect to={
            {
              pathname: "/",
              state : {
                form : props.location
              }
            }
          } />
        }
      }
    } />
  )
}

export default ProtectedRoute;