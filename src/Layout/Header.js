import React, { useState , useEffect, useContext } from 'react';
import LoginButton from '../Components/LoginButton';
import { useHistory, useLocation } from 'react-router-dom';
import {ShowContext} from '../App';
import {UserContext} from '../App';
import {LogoContext} from '../App';
import API from '../api';

function Header()
{
    const {setShow,setMsg}      = useContext(ShowContext);
    const {logoVal, setLogoVal} = useContext(LogoContext);
    const {currentUser }                  = useContext(UserContext);
    let history                         =   useHistory();
    let location                        =   useLocation();
    let [toggle, setToggle]             =   useState(true);
    let [isLoggedIn, setIsLoggedIn]     =   useState(false);
    let [isStartExam, setIsStartExam]   =   useState(false);
    let [isLoaded,setIsLoaded]          =   useState(false);
    let [myHeader, imgPath]             =   useHeader(setIsLoaded,logoVal);

    useEffect(() =>
    {
      let PathName = location.pathname;
      const searchString = process.env.REACT_APP_NON_AUTH_PATHS.split(' ').find((str) => str === PathName);
      if(PathName==='/startexam')
      {
        if(window.innerWidth < 1000)
        {
            setIsStartExam(true);
            setToggle(true);
            document.body.classList.remove('sb-nav-fixed');document.body.classList.remove('sb-sidenav-toggled');
        }
        else
        {
            setIsStartExam(true);
            setToggle(false);
            document.body.classList.add('sb-sidenav-toggled');document.body.classList.remove('sb-nav-fixed');
        }
      }
      else
      {
        setIsStartExam(false);
        setToggle(false);
        document.body.classList.add('sb-nav-fixed');document.body.classList.remove('sb-sidenav-toggled');
      }
      if(PathName!==searchString)
      {
          setIsLoggedIn(true);
      }
      else
      {
          setIsLoggedIn(false);
      }

      if(PathName === '/login')
      {
        setToggle(true);
        document.body.classList.remove('sb-sidenav-toggled');document.body.classList.remove('sb-nav-fixed');
      }
    },[location,history,setShow,setMsg]);


    return(
          !isStartExam ?
            <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                <a href={void(0)} className="navbar-brand"><img src={imgPath+'?val='+logoVal} height="50" width="50" alt="Logo" style={{borderRadius:"45%"}}></img> {myHeader}</a>

                {(location.pathname !== '/login') ?
                <button className="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" onClick={() => {toggleSidebar(setToggle,toggle)}}><i className="fas fa-bars"></i></button>
                :null}

               <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                     
                </form>
                { isLoggedIn ? <LoginButton url={'/logout'} label={'Logout'} setIsLoggedIn={setIsLoggedIn}/>: null}
            </nav>
            : null
    );
}

function toggleSidebar(setToggle,toggle)
{
    setToggle(!toggle);
    if(!toggle)
    {
        document.body.classList.add('sb-sidenav-toggled');document.body.classList.remove('sb-nav-fixed');
    }
    else
    {
        document.body.classList.add('sb-nav-fixed');document.body.classList.remove('sb-sidenav-toggled');
    }
}



function useHeader(setIsLoaded,logoVal)
{
    let [myHeader,setMyHeader]          =   useState('GudExams');
    let [imgPath,setImgPath]            =   useState('');

    useEffect(() =>
    {
        getHeaderData();
    },[logoVal]);
    
    async function getHeaderData()
    {
        await API.get('/configurations',{params :{"type":"headerconfig"}})
        .then(function (res) 
        {
            if(res.data.status === 'success')
            {
                setMyHeader(res.data.header);
                setImgPath(res.data.imgpath);
                setIsLoaded(true);
            }
            else
            {
                setMyHeader('GudExams');
                setImgPath('');
                setIsLoaded(true);
            }
        })
        .catch(function (error) 
        {
            setMyHeader('GudExams');
            setImgPath('');
            setIsLoaded(true);
        })
    }

    return [myHeader, imgPath];
}

export default Header;
