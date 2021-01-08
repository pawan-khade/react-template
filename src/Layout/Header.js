import React, { useState , useEffect, useContext } from 'react';
import LoginButton from '../Components/LoginButton';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import {ShowContext} from '../App';


function Header()
{
    const {setShow,setMsg} = useContext(ShowContext);

    let history                         =   useHistory();
    let location                        =   useLocation();
    let [toggle, setToggle]             =   useState(true);
    let [isLoggedIn, setIsLoggedIn]     =   useState(false);

    useEffect(() =>
    {
      let PathName = location.pathname;
      const serverPath = process.env.REACT_APP_SERVER_PROJPATH;
      const searchString = process.env.REACT_APP_NON_AUTH_PATHS.split(' ').find((str) => str === PathName);

      if(PathName!==searchString)
      {

          (async function anyNameFunction()
          {
            const token = JSON.parse(localStorage.getItem("token"));
            const api = axios.create({baseURL:serverPath,headers: {'Authorization': 'Bearer '+token}});
            await api.get('/isLoggedIn')
             .then((res) => {
               res.data.status === 'success' ? setIsLoggedIn(true):setIsLoggedIn(false);
             })
             .catch((error) =>
             {
               if(error.response.status !== 429)
               {
                 setIsLoggedIn(false);
                 history.replace('/login');
               }
               else
               {
                 setShow(true);
                 setMsg('Server is Busy. Please wait for some seconds...');
               }
             });
          })();
      }
    },[location,history,setShow,setMsg]);


    return(
            <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                <a className="navbar-brand" href="_blank">GudExams</a>
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
    );
}

function toggleSidebar(setToggle,toggle)
{
    setToggle(toggle =!toggle);
    if(!toggle)
    {
        document.body.classList.add('sb-sidenav-toggled');document.body.classList.remove('sb-nav-fixed');
    }
    else
    {
        document.body.classList.add('sb-nav-fixed');document.body.classList.remove('sb-sidenav-toggled');
    }
}

export default Header;
