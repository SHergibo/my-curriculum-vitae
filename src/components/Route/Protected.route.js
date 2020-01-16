import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './../../utils/Auth';
import PropTypes from 'prop-types';

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

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired
}

export default ProtectedRoute;