import React, {useState} from 'react';
import TestMasterForm from './TestMasterForm';
import UploadTests from './UploadTests';
import TestList from './TestList';

const TestMaster = () => {
    const [myList, setMyList]   = useState(true);
    return (
        <div>
            <div className="container-fluid">
                <h1 className="mt-4">Test Master</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item active">Test Master</li>
                </ol>
                <div className="row animate__animated animate__pulse animate_slower">
                    <TestMasterForm myList={myList} setMyList={setMyList} />
                    <UploadTests myList={myList} setMyList={setMyList} />
                    <TestList myList={myList} setMyList={setMyList} />
                </div>
            </div>
        </div>
    );
};

export default TestMaster;