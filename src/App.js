import React, { useState,useEffect } from 'react';
import Header from './Layout/Header';
import Content from './Layout/Content';
import AlertDismissible from './AlertDismissible';
import Popup from './popup';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import API from './api';

export const ShowContext  = React.createContext();
export const PopupContext = React.createContext();
export const UserContext  = React.createContext();

const browserHistory = createBrowserHistory({});

//----------------------Axios Interceptors--------------------------------------
function setupAxios(setShow, setMsg) 
{
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
      else if (status === 429)
      {
          setShow(true);
          setMsg('Server is Busy. Please wait for some seconds. Your Answers will not be saved till this message keeps appearing.');
      }
      return Promise.reject(error);
    }
  );
}
//----------------------------End of Axios Interceptors-------------------------


function App()
{
    const [popupShow, setPopupShow]         = useState(false);
    const [popupMsg, setPopupMsg]           = useState();
    const [show, setShow]                   = useState(false);
    const [msg, setMsg]                     = useState();
    const [currentUser, setCurrentUser]     = useState();


    useEffect(() => { whoAmI(setCurrentUser);},[]);

    setupAxios(setShow, setMsg);
    return (
      <div>
      <Router history={browserHistory}>
        <PopupContext.Provider value={{setPopupShow:setPopupShow,setPopupMsg:setPopupMsg}}>
          <UserContext.Provider value={{currentUser:currentUser,setCurrentUser:setCurrentUser}}>
            <ShowContext.Provider value={{setShow:setShow,setMsg:setMsg}}>
              <Header/>
              <Content/>
            </ShowContext.Provider>
          </UserContext.Provider>
        </PopupContext.Provider>

        <Popup setPopupShow={setPopupShow} popupShow={popupShow} popupMsg={popupMsg}/>
        <AlertDismissible myShow={show} mySetShow={setShow} myMsg={msg}/>
        </Router>
      </div>
    );
}

async function whoAmI(setCurrentUser)
{
  const res = await API.get('/whoAmI');
    if(res.data.status === 'Success')
    {
      setCurrentUser(res.data.data);
    }
}

export default App;
