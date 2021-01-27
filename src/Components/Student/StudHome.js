import React, { useState , useEffect, useContext } from 'react';
import API from '../../api';
import CountCard from './CountCard';
import ExamCard from './ExamCard';
import { useLocation } from 'react-router-dom';
import {UserContext} from '../../App';
import ClipLoader from "react-spinners/ClipLoader";

function StudHome()
{
  const location                                  =   useLocation();
  const {currentUser, setCurrentUser}             =   useContext(UserContext);
  let [loading, setLoading]                       =   useState(true);

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
    getExamData(setUserRequest,setLoading);
  },[]);

  return (
      !userRequest.loading && currentUser && !loading?
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
              <CountCard count={userRequest.numExams} label={"All"} color={"danger"} onClick={() => {getExamData(setUserRequest,setLoading);}}/>
              <CountCard count={userRequest.compExams} label={"Completed"} color={"success"} onClick={() => {getExamData(setUserRequest,setLoading,'over');}}/>
              <CountCard count={userRequest.yetToStartExam} label={"Yet To Start"} color={"warning"} onClick={() => {getExamData(setUserRequest,setLoading,'yettostart');}}/>
              <CountCard count={userRequest.resumeExam} label={"Resume"} color={"primary"} onClick={() => {getExamData(setUserRequest,setLoading,'inprogress');}}/>
              <CountCard count={userRequest.expiredExam} label={"Expired"} color={"info"} onClick={() => {getExamData(setUserRequest,setLoading,'expired');}}/>
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
      </div> : 
      <div className="col-lg-12" style={{position:"absolute",top:"40%",left:"50%"}}>
        <ClipLoader color={'#ff0000'} loading={loading} size={200} />
      </div>
  );
}


async function getExamData(setUserRequest,setLoading,filter1='All')
{
        setLoading(true);
        const res = await API.get('/exam');
        const exams = await res.data;
        console.log(exams.data);
        //-------------------Sort data according to exam date for cards---------
        let unsortedData= exams.data;
        let sorted = {};
        sorted = unsortedData.sort(function(a,b)
        {
          return a.paper.from_date - b.paper.from_date;
        });
        //----------------------------------------------------------------------
        let i               = 0;
        let compleated      = 0;
        let yetToStart      = 0;
        let resume          = 0;
        let expired         = 0;
        let EndTime         = '';
        let Now             = '';
        let overIndex          = Array();
        let inprogressIndex    = Array();
        let yetToStartIndex    = Array();
        let expiredIndex       = Array();

        console.log(sorted);

        Object.keys(sorted).forEach(function(key)
        {
          EndTime           = sorted[key].paper.to_date;
          Now               = sorted[key].now;

          if(sorted[key].examstatus === 'over')
          {
            compleated = compleated+1;
            overIndex.push(key);
          }
          else if(sorted[key].examstatus === '')
          {
            if(EndTime < Now)
            {
              expired = expired+1;
              expiredIndex.push(key);
            }
            else
            {
              yetToStart = yetToStart+1;
              yetToStartIndex.push(key);
            }
          }
          else if(sorted[key].examstatus === 'inprogress')
          {
            if(EndTime < Now)
            {
              expired = expired+1;
              expiredIndex.push(key);
            }
            else
            {
              resume = resume+1;
              inprogressIndex.push(key);
            }
          }
          else if(sorted[key].examstatus === 'expired')
          {
            expired = expired+1;
            expiredIndex.push(key);
          }
        });

        //---------------------------Filtering array based on examStatus-------
        if(filter1 === 'over')
        {
          for(i=0;i< inprogressIndex.length;i++)
          {
            delete sorted[inprogressIndex[i]];
          }
          
          for(i=0;i< yetToStartIndex.length;i++)
          {
            delete sorted[yetToStartIndex[i]];
          }
          
          for(i=0;i< expiredIndex.length;i++)
          {
            delete sorted[expiredIndex[i]];
          }
        }
        else if(filter1 === 'inprogress')
        {
          for(i=0;i< overIndex.length;i++)
          {
            delete sorted[overIndex[i]];
          }
          
          for(i=0;i< expiredIndex.length;i++)
          {
            delete sorted[expiredIndex[i]];
          }

          for(i=0;i< yetToStartIndex.length;i++)
          {
            delete sorted[yetToStartIndex[i]];
          }
        }
        else if(filter1 === 'expired')
        {
          for(i=0;i< overIndex.length;i++)
          {
            delete sorted[overIndex[i]];
          }
          
          for(i=0;i< yetToStartIndex.length;i++)
          {
            delete sorted[yetToStartIndex[i]];
          }

          for(i=0;i< inprogressIndex.length;i++)
          {
            delete sorted[inprogressIndex[i]];
          }
        }
        else if(filter1 === 'yettostart')
        {
          for(i=0;i< overIndex.length;i++)
          {
            delete sorted[overIndex[i]];
          }
          
          for(i=0;i< expiredIndex.length;i++)
          {
            delete sorted[expiredIndex[i]];
          }

          for(i=0;i< inprogressIndex.length;i++)
          {
            delete sorted[inprogressIndex[i]];
          }
        }
        //---------------------------------------------------------------------
        setUserRequest({ loading:false, myExams:exams, numExams:exams.data.length,  compExams:compleated, yetToStartExam:yetToStart, resumeExam:resume, expiredExam:expired });
        setLoading(false);
}

export default StudHome;
