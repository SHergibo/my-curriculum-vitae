import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './../../utils/Auth';
import PropTypes from 'prop-types';

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

IsLoggedRoute.propTypes = {
  component: PropTypes.func.isRequired
}

export default IsLoggedRoute;