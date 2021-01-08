import React ,{ useState, useEffect, useContext }  from 'react';
import QuestionAnswer from "./Exam/QuestionAnswer";
import QuestionButtons from "./Exam/QuestionButtons";
import NextSaveButton from "./Exam/NextSaveButton";
import EndExamButton from "./Exam/EndExamButton";
import PreviousButton from "./Exam/PreviousButton";
import OverallSummery from "./Exam/OverallSummery";
import ReviewLater from "./Exam/ReviewLater";
import MyTimer from "./Exam/MyTimer.js";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {ShowContext} from '../App';



const serverPath = process.env.REACT_APP_SERVER_PROJPATH;

function Startexam(props)
{
  const {setShow,setMsg} = useContext(ShowContext);
  let history                         =   useHistory();
  if(!props.location.state)
  {
    history.replace("/studenthome") ;
  }

  let [myOption, setMyOption]               = useState();
  let originalSelectedOptions               = getSelectedOptions(props.location.state.questions);

  let [selectedOptions, setSelectedOptions] = useState(originalSelectedOptions);
  const questionIndex                       = props.location.state.currentQuestionIndex;

  let myReviewArray                         = getReviewOptions(props.location.state.questions);

  useEffect(() => {
    if(myOption)
    {
      setSelectedOptions(prev => {
        return {...prev, [questionIndex]: myOption}
      });
    }
  }, [myOption]);

  useEffect(() =>
  {
    window.addEventListener('blur', onBlur);
    window.myParameter    = props;
    window.setShow        = setShow;
    window.setMsg         = setMsg;
    window.myHistory      = history;
    return () =>
    {
      window.removeEventListener('blur', onBlur);
      window.myParameter    = '';
      window.setShow        = '';
      window.setMsg         = '';
      window.myHistory      = '';
    };
  });

  return (
    props.location.state ?
      <div className="row">
          <div className='card col-lg-12'>
              <div className="card-header bg-primary row" style={{color:"white"}}>
                <div className="col-lg-8">
                  <h5><b>Exam Name: {props.location.state.exam.paper.paper_name}</b></h5>
                </div>
                <div className="col-lg-4">
                      <i className="fas fa-clock fa-lg"></i> &nbsp;&nbsp;
                      <MyTimer data={props} />
                </div>
              </div>
          </div>

          <div className="card col-lg-8">
            <div className="card-body">
              <QuestionAnswer questions={props} setMyOption={setMyOption}  selectedOptions={selectedOptions}/>
              <hr/>
              <div className="col-lg-12 row">
                <PreviousButton data={props} setMyOption={setMyOption}/>
                <NextSaveButton data={props} myOption={myOption} setMyOption={setMyOption}/>
                <EndExamButton index={questionIndex} length={props.location.state.questions.length} data={props}/>
                <ReviewLater data={props} myReviewQuestions={myReviewArray} index={questionIndex}/>
              </div>
            </div>
          </div>
          <div className="col-lg-4" style={{float: "right"}}>
            <QuestionButtons qas={props}/>
            <OverallSummery data={props}/>
          </div>
      </div> : null
  );
}

const onBlur = async (evt) =>
{
  const exam                    = evt.currentTarget.myParameter.location.state.exam;
  const total_allowable_alerts  = evt.currentTarget.myParameter.location.state.exam.paper.exam_switch_alerts;
  let history                   = evt.currentTarget.myHistory;

  const token                   = JSON.parse(localStorage.getItem("token"));
  const ExamId                  = exam.id;
  const setShow                 = evt.currentTarget.setShow;
  const setMsg                  = evt.currentTarget.setMsg;

  const api = axios.create({baseURL:serverPath,headers: {'Authorization': 'Bearer '+token}});
  await api.put('/exam/'+ExamId,{"status": "windowswitch"})
  .then((res) => {
    if(res.data.status === 'success')
    {
      if(parseInt(res.data.switchedcount) === parseInt(total_allowable_alerts))
      {
          //---------------end Examination-----------------------------------
          handleEndExam(exam,history,setShow,setMsg,res.data.switchedcount);
          //-----------------------------------------------------------------
      }
      else if(parseInt(res.data.switchedcount)+ 5 === parseInt(total_allowable_alerts))
      {
        alert('Your Window switching limit is about to expire. Continuing switching window now will end your Examination abruptly.');
      }
      else
      {
        alert('Please do not switch window while exam is in progress. This Event will be Recorded.');
      }
    }
  })
  .catch((error) =>
  {
    alert('Please do not switch window while exam is in progress.');
  });
};

async function handleEndExam(exam,history,setShow,setMsg,cnt)
{
  const token     = JSON.parse(localStorage.getItem("token"));
  const ExamId    = exam.id;

  const api = axios.create({baseURL:serverPath,headers: {'Authorization': 'Bearer '+token}});
  const res = await api.put('/exam/'+ExamId,{"status": "end"})
  .then((res) => {
    if(res.data.status === 'success')
    {
      setShow(true);
      setMsg('Your Examination is Ended abruptly because you switched window '+cnt+' times.');
      history.replace("/studenthome");
    }
  })
  .catch((error) =>
  {
    alert('Please do not switch window while exam is in progress.');
  });
}


function getSelectedOptions(questions)
{
  let originalSelectedOptions = {};
  questions.map((question,index) =>
  {
    originalSelectedOptions[index] = question.stdanswer
  });
  return originalSelectedOptions;
}

function getReviewOptions(questions)
{
  let array = [];
  questions.map((question,index) =>
  {
      if(question.answered.indexOf('review') >= 0)
      {
        array[index] = true;
      }
      else
      {
        array[index] = false;
      }
  });
  return array;
}

export default Startexam;
