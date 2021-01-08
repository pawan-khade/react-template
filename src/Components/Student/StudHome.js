import React, { useState , useEffect } from 'react';
import axios from 'axios';
import CountCard from './CountCard';
import ExamCard from './ExamCard';

const serverPath = process.env.REACT_APP_SERVER_PROJPATH;

function StudHome()
{
  const [userRequest, setUserRequest] = useState({
    loading: true,
    myExams: null,
    numExams:0,
    compExams:0,
    yetToStartExam:0,
    resumeExam:0,
    expiredExam:0
  });
  useEffect(() =>
  {
    (async function anyNameFunction()
    {
        const token = JSON.parse(localStorage.getItem("token"));
        const api = axios.create({baseURL:serverPath,headers: {'Authorization': 'Bearer '+token}});
        const res = await api.get('/exam');
        const exams = await res.data;
        console.log(exams);
        //---------------------------------------------------------------------
        let compleated = 0;
        let yetToStart = 0;
        let resume     = 0;
        let expired    = 0;

        Object.keys(exams.data).forEach(function(key)
        {
          if(exams.data[key].examstatus === 'over')
          {
            compleated = compleated+1;
          }
          else if(exams.data[key].examstatus === '')
          {
            yetToStart = yetToStart+1;
          }
          else if(exams.data[key].examstatus === 'inprogress')
          {
            resume = resume+1;
          }
          else if(exams.data[key].examstatus === 'expired')
          {
            expired = expired+1;
          }
        });
        //---------------------------------------------------------------------

        setUserRequest({ loading:false, myExams:exams, numExams:exams.data.length,  compExams:compleated, yetToStartExam:yetToStart, resumeExam:resume, expiredExam:expired });

    })();
  },[]);

    return (
      !userRequest.loading ?
      <div>
        <div className="container-fluid">
            <h1 className="mt-4">Student Home</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Student Home</li>
            </ol>
            <div className="row col-lg-12">
              <CountCard count={userRequest.numExams} label={"All"} color={"danger"}/>
              <CountCard count={userRequest.compExams} label={"Compleated"} color={"success"}/>
              <CountCard count={userRequest.yetToStartExam} label={"Yet To Start"} color={"warning"}/>
              <CountCard count={userRequest.resumeExam} label={"Resume"} color={"primary"}/>
              <CountCard count={userRequest.expiredExam} label={"Expired"} color={"info"}/>
            </div>
            <br/><br/>
            <div className="row col-lg-12">
            {
              userRequest.myExams ? userRequest.myExams.data.map((exam) =>
              (
                  <ExamCard exam={exam} key={exam.id}/>
              )) : null
            }
            </div><br/>
        </div>
      </div> : ''
    );
}

export default StudHome;
