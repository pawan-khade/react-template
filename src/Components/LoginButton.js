import React, { useContext } from 'react';
import API from '../api';
import { useHistory } from 'react-router-dom';
import {UserContext} from '../App';

function LoginButton(props)
{
  let history                                     =   useHistory(props);
  const {currentUser, setCurrentUser}             =   useContext(UserContext);

  async function loginLogout()
  {
    if(props.label === 'Logout')
    {
      //-----------Call Logout API and on success redirect to Login Page-------

      const res = await API.post('/logout');

      if(res.data.status === 'Success')
      {
        setCurrentUser(undefined);
        await localStorage.clear();
        props.setIsLoggedIn(false);
        history.replace('/login');
      }
      //-----------------------------------------------------------------------
    }
    else
    {
        history.replace('/login');
    }
  }

    return (
        <div>
          <button onClick={() => {loginLogout(props)}} className="btn btn-primary">{props.label}</button>
        </div>
    );
}

export default LoginButton;
