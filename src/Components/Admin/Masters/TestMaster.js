import React, {useState} from 'react';


const TestMaster = () => {
    const [myList, setMyList]   = useState(true);
    return (
        <div>
            <div className="container-fluid">
                <h1 className="mt-4">Test Master</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item active">Test Master</li>
                </ol>
                <div className="row animate__animated animate__lightSpeedInLeft animate_slower">
                    
                </div>
            </div>
        </div>
    );
};

export default TestMaster;