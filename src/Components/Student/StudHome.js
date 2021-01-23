import React, { useState , useEffect, useContext } from 'react';
import API from '../../api';
import CountCard from './CountCard';
import ExamCard from './ExamCard';
import { useLocation } from 'react-router-dom';
import {UserContext} from '../../App';

function StudHome()
{
  const location                                  =   useLocation();
  const {currentUser, setCurrentUser}             =   useContext(UserContext);

  const [userRequest, setUserRequest] = useState({
    loading: true,
    myExams: null,
    numExams:0,
    compExams:0,
    yetToStartExam:0,
    resumeExam:0,
    expiredExam:0
  });

  //------------------------Restraining back button of browser--------------------
  useEffect(() => 
  {
    window.history.pushState(location.state, '', '/studenthome');
  }, [location]);
  //------------------------------------------------------------------------------

  useEffect(() =>
  {
    (async function anyNameFunction()
    {
        const res = await API.get('/exam');
        const exams = await res.data;

        //-------------------Sort data according to exam date for cards---------
        let unsortedData= exams.data;
        let sorted = {};
        sorted = unsortedData.sort(function(a,b)
        {
          return a.paper.from_date - b.paper.from_date;
        });
        //----------------------------------------------------------------------

        let compleated = 0;
        let yetToStart = 0;
        let resume     = 0;
        let expired    = 0;
        let EndTime    = '';
        let Now        = '';

        Object.keys(sorted).forEach(function(key)
        {
          EndTime           = sorted[key].paper.to_date;
          Now               = sorted[key].now;

          if(sorted[key].examstatus === 'over')
          {
            compleated = compleated+1;
          }
          else if(sorted[key].examstatus === '')
          {
            if(EndTime < Now)
            {
              expired = expired+1;
            }
            else
            {
              yetToStart = yetToStart+1;
            }
          }
          else if(sorted[key].examstatus === 'inprogress')
          {
            if(EndTime < Now)
            {
              expired = expired+1;
            }
            else
            {
              resume = resume+1;
            }
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
      !userRequest.loading && currentUser ?
      <div>
        <div className="container-fluid">
            <h1 className="mt-4">Student Home</h1>
            <ol className="breadcrumb mb-4">
              <li className="breadcrumb-item active">
                <b>Student Name:</b> {currentUser.name} 
                &nbsp;&nbsp;&nbsp;
                <b>Enrollment No:</b> ({currentUser.username})
              </li>
            </ol>
            <div className="row col-lg-12">
              <CountCard count={userRequest.numExams} label={"All"} color={"danger"}/>
              <CountCard count={userRequest.compExams} label={"Completed"} color={"success"}/>
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
