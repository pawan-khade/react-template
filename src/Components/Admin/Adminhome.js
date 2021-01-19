import React, {useContext, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import {UserContext} from '../../App';

function Adminhome(props)
{
    const {userType, setUserType}   = useContext(UserContext);
    let history                     = useHistory();
    
    useEffect(() => 
    {
        if(props.location.state)
        {
          setUserType(props.location.state.userType);
        }
        else
        {
            history.replace('/login');
        }
    });
    
    
    return (
      <div>
        <div className="container-fluid">
            <h1 className="mt-4">Admin Home</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Admin Home</li>
            </ol>
            <div className="row col-lg-12">
                
            </div>

        </div>
      </div>
    );
}

export default Adminhome;
