import React, {useContext} from 'react';
import {UserContext} from '../../App';

function Adminhome(props)
{
    const {userType, setUserType}   = useContext(UserContext);
    setUserType(props.location.state.userType);
    
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
