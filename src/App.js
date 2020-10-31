import React, { useState, useCallback, useEffect } from 'react';
import './styles/Styles.scss';
import axios from 'axios';
import { apiDomain, apiVersion } from './apiConfig/ApiConfig';
import { format } from 'date-fns';
import Loading from './components/Loading';
import HomePage from './components/HomePage';
import Admin from './components/Admin';
import { Route, Switch, useLocation } from 'react-router-dom';
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
  faKey,
  faTimes
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
  faKey,
  faTimes
);

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [errorFetch, setErrorFetch] = useState(false);
  const [generalInfo, setGeneralInfo] = useState({
    firstname: "",
    lastname: "",
    "address":{
      "street":"",
      "number":"",
      "zip":"",
      "city":""
    },
    "phone":"",
    "email":"",
    "birthdate":"",
    "licence":""
  });
  const [educExpeData, setEducExpeData] = useState([]);
  const [skillData, setSkillData] = useState([]);

  const getData = useCallback(async () => {
    setErrorFetch(false);
    setLoading(true);
    const getGeneralInfoEndPoint = `${apiDomain}/api/${apiVersion}/info`;
    await axios.get(getGeneralInfoEndPoint)
    .then((response) => {
      if(response.data){
        let formatDate = format(
          new Date(response.data.birthdate),
          'dd/MM/yyyy'
        );
        response.data.isoDate = response.data.birthdate;
        response.data.birthdate = formatDate;
        setGeneralInfo(response.data);
        setLoading(false);
      }
    })
    .catch((error)=> {
      let jsonError = JSON.parse(JSON.stringify(error));
      if(error.code === "ECONNABORTED" || jsonError.name === "Error"){
        setErrorFetch(true);
      }
    });
  }, []);

  const getDataEducExpe = useCallback(async () => {
    const getListEducExpeEndPoint = `${apiDomain}/api/${apiVersion}/educExpe/educExpe-list`;
    await axios.get(getListEducExpeEndPoint)
      .then((response) => {
        if(response.data){
          setEducExpeData(response.data);
        }
      });

    const getListSkillEndPoint = `${apiDomain}/api/${apiVersion}/skill/skill-list`;
    await axios.get(getListSkillEndPoint)
      .then((response) => {
        if(response.data){
          setSkillData(response.data);
        }
      });
  }, []);

  useEffect(() => {
    getData();
    if(location.pathname === "/"){
      getDataEducExpe();
    }
  }, [location, getData, getDataEducExpe]);

  return (
    <div className="App">
      {location.pathname !== "/login" &&
        <Loading
          loading={loading}
          errorFetch={errorFetch}
          retryFetch={getData}
        />
      }
      <Switch>
        <Route exact path="/" component={() => <HomePage 
          generalInfo={generalInfo} 
          educExpeData={educExpeData}
          skillData={skillData} />
        }/>
        <IsLoggedRoute exact path="/login" component={Login}/>
        <ProtectedRoute exact path="/admin" component={()=> <Admin generalInfoAdmin={generalInfo} />}/>
        <Route path="*" component={Page404} />
      </Switch>
    </div>
  );
}

export default App;
