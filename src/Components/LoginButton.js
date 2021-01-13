import React from 'react';
import API from '../api';
import { useHistory } from 'react-router-dom';

function LoginButton(props)
{
  let history = useHistory(props);

  async function loginLogout()
  {
    if(props.label === 'Logout')
    {
      //-----------Call Logout API and on success redirect to Login Page-------

      const res = await API.post('/logout');

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
