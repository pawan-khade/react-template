import React, { useState } from 'react';
import Header from './Layout/Header';
import Content from './Layout/Content';
import AlertDismissible from './AlertDismissible';
import { createBrowserHistory } from 'history'
import { Router } from 'react-router-dom';
import API from './api';

export const ShowContext = React.createContext();
export const UserContext = React.createContext();

const browserHistory = createBrowserHistory({});


//----------------------Axios Interceptors--------------------------------------
function setupAxios(setShow, setMsg) {
  API.interceptors.request.use(function (config)
  {
    if(browserHistory.location.pathname !== '/')
    {
      const token = JSON.parse(localStorage.getItem("token"));
      if (token)
      {
        config.headers['Authorization'] = 'Bearer ' + token;
      }
    }
    return config;
  },
  function (error)
  {
      return Promise.reject(error);
  });


  API.interceptors.response.use(response => response,
    error =>
    {
      const {status} = error.response;
      if (status === 401)
        browserHistory.replace('/login');
      else if (status === 429){
          setShow(true);
          setMsg('Server is Busy. Please wait for some seconds...');
      }
      return Promise.reject(error);
    }
  );
}
//----------------------------End of Axios Interceptors-------------------------


function App()
{
    const [show, setShow]         = useState(false);
    const [msg, setMsg]           = useState();
    const [userType, setUserType] = useState();

    setupAxios(setShow, setMsg);
    return (
      <div>
      <Router history={browserHistory}>

        <UserContext.Provider value={{userType:userType,setUserType:setUserType}}>
          <ShowContext.Provider value={{setShow:setShow,setMsg:setMsg}}>
            <Header/>
            <Content/>
          </ShowContext.Provider>
        </UserContext.Provider>

        <AlertDismissible myShow={show} mySetShow={setShow} myMsg={msg}/>
        </Router>
      </div>
    );
}

export default App;
