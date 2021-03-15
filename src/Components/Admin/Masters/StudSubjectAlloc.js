import React, {useState} from 'react';
import UploadStudentSubjectAlloc from './UploadStudentSubjectAlloc';
import StudentSubjectList from './StudentSubjectList';

const StudSubjectAlloc = () => {
    const [myList, setMyList]   = useState(true);
    return (
        <div>
            <div className="container-fluid">
                <h1 className="mt-4">Student Subject Allocation</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item active">Student Subject Allocation</li>
                </ol>
                <div className="row animate__animated animate__pulse animate_slower">
                    <UploadStudentSubjectAlloc setMyList={setMyList} myList={myList}/>
                    <StudentSubjectList setMyList={setMyList} myList={myList}/>
                </div>
            </div>
        </div>
    );
};

export default StudSubjectAlloc;