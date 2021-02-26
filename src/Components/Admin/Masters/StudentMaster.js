import React, {useState} from 'react';
import StudentMasterForm from '../Masters/StudentMasterForm';
import UploadStudents from '../Masters/UploadStudents';
import StudentList from "../Masters/StudentList";

const StudentMaster = () => {
    const [myList, setMyList]   = useState(true);
    return (
        <div>
            <div className="container-fluid">
                <h1 className="mt-4">Student Master</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item active">Student Master</li>
                </ol>
                <div className="row animate__animated animate__lightSpeedInLeft animate_slower">
                    <StudentMasterForm setMyList={setMyList} myList={myList}/>
                    <UploadStudents setMyList={setMyList} myList={myList}/>
                    <StudentList setMyList={setMyList} myList={myList}/>
                </div>
            </div>
        </div>
    );
};
export default StudentMaster;