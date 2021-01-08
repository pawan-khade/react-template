import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function LoginButton(props)
{
  let history = useHistory(props);
  const serverPath = process.env.REACT_APP_SERVER_PROJPATH;

  async function loginLogout()
  {
    if(props.label === 'Logout')
    {
      //-----------Call Logout API and on success redirect to Login Page-------
      const token = JSON.parse(localStorage.getItem("token"));
      const api = axios.create({baseURL:serverPath,headers: {'Authorization': 'Bearer '+token}});
      const res = await api.post('/logout');

      if(res.data.status === 'Success')
      {
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
