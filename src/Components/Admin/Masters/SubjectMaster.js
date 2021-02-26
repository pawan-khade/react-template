import React,{useState} from 'react';
import SubjectMasterForm from './SubjectMasterForm';
import UploadSubjects from './UploadSubjects';
import SubjectList from './SubjectList';

const SubjectMaster = () => {
    const [myList, setMyList]   = useState(true);

    return (
        <div>
            <div className="container-fluid">
                <h1 className="mt-4">Subject Master</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item active">Subject Master</li>
                </ol>
                <div className="row animate__animated animate__lightSpeedInLeft animate_slower">
                    <SubjectMasterForm setMyList={setMyList} myList={myList}/>
                    <UploadSubjects setMyList={setMyList} myList={myList}/>
                    <SubjectList setMyList={setMyList} myList={myList} />
                </div>
            </div>
        </div>
    );
};

export default SubjectMaster;