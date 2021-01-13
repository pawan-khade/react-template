import React, { useState , useEffect } from 'react';
import API from '../../api';
import CountCard from './CountCard';
import ExamCard from './ExamCard';

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

        const res = await API.get('/exam');
        const exams = await res.data;

        let unsortedData= exams.data;
        let sorted = {};
        sorted = unsortedData.sort(function(a,b)
        {
          return a.paper.from_date - b.paper.from_date;
        });
        //---------------------------------------------------------------------
        let compleated = 0;
        let yetToStart = 0;
        let resume     = 0;
        let expired    = 0;

        Object.keys(sorted).forEach(function(key)
        {
          if(sorted[key].examstatus === 'over')
          {
            compleated = compleated+1;
          }
          else if(sorted[key].examstatus === '')
          {
            yetToStart = yetToStart+1;
          }
          else if(sorted[key].examstatus === 'inprogress')
          {
            resume = resume+1;
          }
          else if(sorted[key].examstatus === 'expired')
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
