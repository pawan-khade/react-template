import React ,{ useState }  from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const serverPath = process.env.REACT_APP_SERVER_PROJPATH;

function Instructions(props)
{
  const [checked, setChecked]         =   useState(false);
  const [startexam, setStartexam]     =   useState(true);
  let history                         =   useHistory();

  let button = '';
  const exam = props.location.state;
  let BtnLabel = '';

  if(exam.examstatus==='inprogress')
  {
    BtnLabel = 'Continue Exam';
  }
  else
  {
    BtnLabel = 'Start Exam';
  }

  let  negativeMarks='';
  if(exam)
  {
    exam.paper.negative_marks===0 ?negativeMarks = 'No' : negativeMarks = 'Yes';
  }

  return (
      exam ?
      <div>
        <div className="container-fluid">
            <h1 className="mt-4">Exam Instructions</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Read Instructions Carefully...</li>
            </ol>
            <div className="col-lg-12">
                  <div className='card'>
                      <div className="card-header bg-primary" style={{color:"white"}}>
                        <h5><b>{exam.paper.paper_name} Instructions</b></h5>
                      </div>
                      <div className="card-body">
                        <ul>
                          <li> Welcome to Online Exam for {exam.paper.paper_name}</li>
                          <li> Exam has total {exam.paper.questions} Questions</li>
                          <li> Total time for Exam is {exam.paper.duration} Mins</li>
                          <li> Negative Marking Exam: <b>{negativeMarks}</b></li>
                        </ul>

                        <h1><i>Best of Luck for your Exam</i></h1>
                      </div>
                      <div className="card-footer">
                        <center>
                            <input type="checkbox" id="read" name="read" defaultChecked={checked} onChange={() => setChecked(!checked)} /> &nbsp;&nbsp;I have read and understood instructions.<br/><br/>
                            <button disabled={!checked} onClick={() => ExamStart(history,exam,setStartexam)} className="btn btn-success">{BtnLabel}</button>
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

async function ExamStart(history,exam,setStartexam)
{
  let examDetails = {}
  //------------------Start Exam------------------------------------------------
    if(await startMyExam(exam))
    {
        const myQuestions = await getQuestions(exam);
        if(myQuestions)
        {
          examDetails = {
          exam: exam,
          questions: myQuestions,
          currentQuestionIndex: 0,
          solvedQuestionIndexes              :  getIndexes(myQuestions,'answered'), unsolvedQuestionIndexes            :  getIndexes(myQuestions,'unanswered'),
          markedSolvedIndexes                :  getIndexes(myQuestions,'answeredandreview'),
          markedUnsolvedIndexes              :  getIndexes(myQuestions,'unansweredandreview'),
        }
        setStartexam(true);
        history.replace("/startexam", examDetails) ;
      }
    }
    else
    {
      setStartexam(false);
    }
  //----------------------------------------------------------------------------
}

async function startMyExam(exam)
{
  const token = JSON.parse(localStorage.getItem("token"));
  const ExamId = exam.id;

  const api = axios.create({baseURL:serverPath,headers: {'Authorization': 'Bearer '+token}});
  const res = await api.put('/exam/'+ExamId,{"status": "start"});

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
  const token = JSON.parse(localStorage.getItem("token"));
  const ExamId = exam.id;

  const api = axios.create({baseURL:serverPath,headers: {'Authorization': 'Bearer '+token}});
  const res = await api.get('/answer',{params: {"exam_id": ExamId}});
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
