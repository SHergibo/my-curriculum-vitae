import React from 'react';
import './styles/Styles.scss';
import HomePage from './components/HomePage';
import Admin from './components/Admin';
import { Route, Switch } from 'react-router-dom';
import IsLoggedRoute from './components/Route/IsLogged.route';
import ProtectedRoute from './components/Route/Protected.route';
import Login from './components/Login';
import Page404 from './components/Page404';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <IsLoggedRoute exact path="/login" component={Login}/>
        <ProtectedRoute exact path="/admin" component={Admin}/>
        <Route path="*" component={Page404} />
      </Switch>
    </div>
  );
}

export default App;
