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
export const LogoContext  = React.createContext();
export const FooterContext= React.createContext();
const browserHistory      = createBrowserHistory({});

function App()
{
    const [popupShow, setPopupShow]         = useState(false);
    const [popupMsg, setPopupMsg]           = useState();
    const [show, setShow]                   = useState(false);
    const [msg, setMsg]                     = useState();
    const [logoVal, setLogoVal]             = useState();
    const [footerVal, setFooterVal]         = useState();
    const [currentUser,setCurrentUser]      = useWhoAmI();
    
    setupAxios(setShow, setMsg);
    return (
      <div>
        <Router history={browserHistory}>
          <LogoContext.Provider value={{logoVal:logoVal,setLogoVal:setLogoVal}}>
            <PopupContext.Provider value={{setPopupShow:setPopupShow,setPopupMsg:setPopupMsg}}>
              <UserContext.Provider value={{currentUser:currentUser,setCurrentUser:setCurrentUser}}>
                <ShowContext.Provider value={{setShow:setShow,setMsg:setMsg}}>
                  <Header/>
                  <FooterContext.Provider value={{footerVal:footerVal,setFooterVal:setFooterVal}}>
                    <Content/>
                  </FooterContext.Provider>
                </ShowContext.Provider>
              </UserContext.Provider>
            </PopupContext.Provider>
          </LogoContext.Provider>

          <Popup setPopupShow={setPopupShow} popupShow={popupShow} popupMsg={popupMsg}/>
          <AlertDismissible myShow={show} mySetShow={setShow} myMsg={msg}/>
        </Router>
      </div>
    );
}

function useWhoAmI()
{
  const [currentUser, setCurrentUser]     = useState();

  useEffect(() => { whosMe();},[]);

  async function whosMe()
  {
    const res = await API.get('/whoAmI');
      if(res.data.status === 'Success')
      {
        setCurrentUser(res.data.data);
      }
  }

  return [
    currentUser,
    setCurrentUser
  ]
}


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
      const status = error.response;

      if ((status!== undefined) && (status.status === 401))
      {
        browserHistory.replace('/login');
      }
      else if ((status!== undefined) && (status.status === 429))
      {
          setShow(true);
          setMsg('Server is Busy. Please wait for some seconds. Your Response will not be saved till this message keeps appearing.');
      }
      else if(status === undefined || !status)
      {
        setShow(true);
        setMsg('There is some problem with server response.Your Response will not be saved till this message keeps appearing.');
      }

      if (!error.response) 
      {
        setShow(true);
        setMsg('Your Connection to server is lost. Please Contact Internet Service Provider');
      }
      return Promise.reject(error);
    }
  );
}
//----------------------------End of Axios Interceptors-------------------------

export default App;
