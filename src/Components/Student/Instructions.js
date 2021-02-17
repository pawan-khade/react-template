import React ,{ useState, useEffect, useContext }  from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import API from '../../api';
import WebCamCapture from '../Exam/WebCamCapture';
import {UserContext} from '../../App';

function useOptions()
{
  let history                           =   useHistory();
  let location                          =   useLocation();
  let [exam, setExam]                   =   useState();
  let myExam                            =   undefined;
  

  if(location.state && location.state.exam)
  {
    myExam = location.state.exam;
    //console.log(myExam);
  }
  useEffect(() =>
  {
    if (myExam)
    {
      setExam(myExam);
    }
    else
    {
      if(location.state && location.state.role === 'STUDENT')
      {
        history.replace("/studenthome");
      }
      else
      {
        history.replace("/adminexamreport");
      }
    }
  }, [myExam,history]);

  return exam;
}

function Instructions(props)
{
  const [checked, setChecked]         =   useState(false);
  const [startexam, setStartexam]     =   useState(true);
  let history                         =   useHistory();
  let exam                            =   useOptions();
  let location                        =   useLocation();
  let [myCameraPerm, setMyCameraPerm] =   useState(false);
  const {currentUser, setCurrentUser} =   useContext(UserContext);

  let button = '';
  let BtnLabel = '';
  let  negativeMarks='';
  if(exam)
  {
        if(exam.examstatus==='inprogress')
        {
          BtnLabel = 'Continue Exam';
        }
        else
        {
          BtnLabel = 'Start Exam';
        }

        if(location.state.role === 'ADMIN')
        {
          BtnLabel = 'Preview Exam';
        }

        exam.paper.negative_marks===0 ?negativeMarks = 'No' : negativeMarks = 'Yes';
  }

  return (
      exam ?
      <div className="animate__animated animate__flash animate_slower">
        <div className="container-fluid">
            <h1 className="mt-4">Exam Instructions</h1>
            <div className="breadcrumb col-lg-12 row">
                <div className="breadcrumb-item active col-lg-10">Read Instructions Carefully...</div>
                <div className="col-lg-2">{currentUser.role==='STUDENT' ? <Link to="studenthome" className="btn btn-danger btn-sm">Go Back</Link>: <Link to="adminexamreport" className="btn btn-danger btn-sm">Go Back</Link>}</div>
            </div>
            <div className="col-lg-12">
                  <div className='card'>
                      <div className="card-header bg-primary" style={{color:"white"}}>
                        <h5><b>{exam.paper.paper_name}({exam.paper.paper_code}) Instructions</b></h5>
                      </div>
                      <div className="card-body">
                        <div className="col-lg-8">
                          <ul>
                            <li> Welcome to Online Exam for {exam.paper.paper_name}</li>
                            <li> Exam has total {exam.paper.questions} Questions</li>
                            <li> Total time for Exam is {exam.paper.duration} Mins</li>
                            <li> Negative Marking Exam: <b>{negativeMarks}</b></li>
                            <li> Close all other windows/apps</li>
                            <li> Do not close browser/app before logging out</li>
                          </ul>

                          <h1><i>Best of Luck for your Exam</i></h1>
                        </div>
                        <div className="col-lg-4">
                          <WebCamCapture exam={location.state.exam.id} setMyCameraPerm={setMyCameraPerm} show={'no'} CaptureTime={location.state.exam.paper.capture_interval} isProctored={location.state.exam.paper.proctoring}/>
                        </div>
                      </div>
                      <div className="card-footer">
                        <center>
                            <input type="checkbox" id="read" name="read" defaultChecked={checked} onChange={() => setChecked(!checked)}/> &nbsp;&nbsp;I have read and understood instructions.<br/><br/>
                            {BtnLabel!=='Preview Exam' ?
                            <button disabled={(!checked || !myCameraPerm)} onClick={() => ExamStart(history,exam,setStartexam,location)} 
                            className="btn btn-success">{BtnLabel}</button>
                            :
                            <button disabled={(!checked || !myCameraPerm)} onClick={() => {ExamPreview(history,exam,setStartexam,location);}} className="btn btn-success">{BtnLabel}</button>
                            }
                        </center>
                      </div>
                  </div>
            </div>
            <br/>
            <div>{!startexam && (
                <div className="alert alert-info">Problem Starting Examination</div>
            )}</div>
        </div>
      </div> : ''
    );
}

function checkCameraPermissions(setStartexam)
{
  setStartexam(true);
}

async function ExamPreview(history,exam,setStartexam,location)
{
  let examDetails = {}
  //------------------Start Exam------------------------------------------------
  if(location.state.role !== 'STUDENT')
  {
        const myQuestions = await getPreviewQuestions(exam);
        if(myQuestions)
        {
          examDetails = {
          preview                             : true,
          exam                                : exam,
          questions                           : myQuestions,
          currentQuestionIndex                : 0,
          solvedQuestionIndexes               : [], 
          unsolvedQuestionIndexes             : [],
          markedSolvedIndexes                 : [],
          markedUnsolvedIndexes               : [],
        }
        setStartexam(true);
        history.replace("/startexam", examDetails) ;
      }
  }
  else
  {
    setStartexam(false);
  }
}


async function ExamStart(history,exam,setStartexam,location)
{
  let examDetails = {}
  //------------------Start Exam------------------------------------------------
  if(location.state.role === 'STUDENT')
  {
    if(await startMyExam(exam))
    {
        const myQuestions = await getQuestions(exam);
        if(myQuestions)
        {
          //console.log(myQuestions);
          examDetails = {
          preview                             :   false,
          exam                                :   exam,
          questions                           :   myQuestions,
          currentQuestionIndex                :   0,
          solvedQuestionIndexes               :   getIndexes(myQuestions,'answered'), unsolvedQuestionIndexes             :   getIndexes(myQuestions,'unanswered'),
          markedSolvedIndexes                 :   getIndexes(myQuestions,'answeredandreview'),
          markedUnsolvedIndexes               :   getIndexes(myQuestions,'unansweredandreview'),
        }
        setStartexam(true);
        history.replace("/startexam", examDetails) ;
      }
    }
    else
    {
      setStartexam(false);
    }
  }
  //----------------------------------------------------------------------------
}

async function startMyExam(exam)
{
  const ExamId = exam.id;

  const res = await API.put('/exam/'+ExamId,{"status": "start"});

  if(res.data.status === 'success')
  {
    return 1;
  }
  else
  {
    return 0;
  }
}


async function getQuestions(exam)
{
  const ExamId = exam.id;

  const res = await API.get('/answer',{params: {"exam_id": ExamId}});
  if(res.data.status === 'success')
  {
    return res.data.data;
  }
  else
  {
    return null;
  }
}

async function getPreviewQuestions(exam)
{
  const PaperId = exam.paper.id;

  const res = await API.get('/questions/'+PaperId,{params: {"type" : "preview"}});
  if(res.data.status === 'success')
  {
    return res.data.data;
  }
  else
  {
    return null;
  }
}

function getIndexes(myQuestions,searchString)
{
  let arr     = [];

  myQuestions.forEach(function(question,index){
    if(question.answered === searchString)
    {
      arr.push(index);
    }
  });
  return arr;
}

export default Instructions;
