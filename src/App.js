import React from 'react';
import './styles/Styles.scss';
import HomePage from './components/HomePage';
import Admin from './components/Admin';
import { Route, Switch } from 'react-router-dom';
import IsLoggedRoute from './components/Route/IsLogged.route';
import ProtectedRoute from './components/Route/Protected.route';
import Login from './components/Login';
import Page404 from './components/Page404';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faJs, faHtml5 } from '@fortawesome/free-brands-svg-icons';
import { 
  faChevronUp,
  faEnvelope, 
  faMobileAlt, 
  faMapMarkerAlt, 
  faUser, 
  faAt, 
  faPaperPlane, 
  faCheck,
  faEdit, 
  faTrashAlt,
  faPlus,
  faHourglassStart,
  faHourglassEnd, 
  faUserGraduate, 
  faSchool,
  faRoad, 
  faHome, 
  faEnvelopeOpenText, 
  faCity, 
  faBirthdayCake, 
  faCar,
  faLink, 
  faImages, 
  faInfoCircle, 
  faFileSignature,
  faGraduationCap, 
  faPercentage,
  faKey
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faJs,
  faHtml5,
  faChevronUp,
  faEnvelope, 
  faMobileAlt, 
  faMapMarkerAlt, 
  faUser, 
  faAt, 
  faPaperPlane, 
  faCheck,
  faEdit, 
  faTrashAlt,
  faPlus,
  faHourglassStart, 
  faHourglassEnd, 
  faUserGraduate, 
  faSchool,
  faRoad, 
  faHome, 
  faEnvelopeOpenText, 
  faCity, 
  faBirthdayCake, 
  faCar,
  faLink, 
  faImages, 
  faInfoCircle, 
  faFileSignature,
  faGraduationCap, 
  faPercentage,
  faKey
);

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
