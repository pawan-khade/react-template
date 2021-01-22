import React, { useState , useEffect, useContext } from 'react';
import LoginButton from '../Components/LoginButton';
import { useHistory, useLocation } from 'react-router-dom';
import {ShowContext} from '../App';
import API from '../api';

function Header()
{
    const {setShow,setMsg} = useContext(ShowContext);

    let history                         =   useHistory();
    let location                        =   useLocation();
    let [toggle, setToggle]             =   useState(true);
    let [isLoggedIn, setIsLoggedIn]     =   useState(false);
    let [isStartExam, setIsStartExam]   =   useState(false);
    let [isLoaded,setIsLoaded]          =   useState(false);
    let [myHeader,setMyHeader]          =   useState('GudExams');

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
            setToggle(true);
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
    },[location,history,setShow,setMsg]);

    useEffect(() =>
    {
        getHeaderData(setIsLoaded,setMyHeader);
    },[]);


    return(
          !isStartExam ?
            <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                <a className="navbar-brand" href={void(0)}><img src="assets/images/logo.png" height="50" width="50"></img> {myHeader}</a>
                <button className="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" onClick={() => {toggleSidebar(setToggle,toggle)}}><i className="fas fa-bars"></i></button>

                <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button"><i className="fas fa-search"></i></button>
                        </div>
                    </div>
                </form>
                { isLoggedIn ? <LoginButton url={'/logout'} label={'Logout'} setIsLoggedIn={setIsLoggedIn}/>: <LoginButton url={'/login'} label={'Login'}/>}
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

async function getHeaderData(setIsLoaded,setMyHeader)
{
    await API.get('/configurations',{params :{"type":"headerconfig"}})
    .then(function (res) 
    {
        if(res.data.status === 'success')
        {
            setMyHeader(res.data.header);
            setIsLoaded(true);
        }
        else
        {
            setMyHeader('GudExams');
            setIsLoaded(true);
        }
    })
    .catch(function (error) 
    {
        setMyHeader('GudExams');
        setIsLoaded(true);
    })
}

export default Header;
