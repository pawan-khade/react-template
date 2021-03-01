import React,{useState} from 'react';
import {useLocation} from 'react-router-dom';
import AddTopicForm from './AddTopicForm';
import UploadTopics from './UploadTopics';
import TopicList from './TopicList';

const AddTopic = () => {
    const [myList, setMyList]   = useState(true);
    const location              = useLocation();

    const paperId               = location.state.paperId;
    const paperCode             = location.state.paperCode;
    const paperName             = location.state.paperName;

    return (
        <div>
            <div className="container-fluid">
                <h1 className="mt-4">Topic Master</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item active">Topic Master</li>
                </ol>
                <div className="row animate__animated animate__lightSpeedInLeft animate_slower">
                    <AddTopicForm myList={myList} setMyList={setMyList} paperId={paperId} paperCode={paperCode} paperName={paperName}/>
                    <UploadTopics myList={myList} setMyList={setMyList} paperId={paperId} paperCode={paperCode} paperName={paperName}/>
                    <TopicList myList={myList} setMyList={setMyList} paperId={paperId} paperCode={paperCode} paperName={paperName} />
                </div>
            </div>
        </div>
    );
};

export default AddTopic;