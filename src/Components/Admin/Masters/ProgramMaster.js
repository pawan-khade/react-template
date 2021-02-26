import React, {useState} from 'react';
import ProgramMasterForm from '../Masters/ProgramMasterForm';
import UploadPrograms from '../Masters/UploadPrograms';
import ProgramList from "../Masters/ProgramList";

const ProgramMaster = () => {
    const [myList, setMyList]   = useState(true);
    return (
        <div>
            <div className="container-fluid">
                <h1 className="mt-4">Program Master</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item active">Program Master</li>
                </ol>
                <div className="row animate__animated animate__lightSpeedInLeft animate_slower">
                    <ProgramMasterForm setMyList={setMyList} myList={myList}/>
                    <UploadPrograms setMyList={setMyList} myList={myList}/>
                    <ProgramList setMyList={setMyList} myList={myList}/>
                </div>
            </div>
        </div>
    );
};

export default ProgramMaster;