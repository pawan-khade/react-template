import React,{useEffect,useContext} from 'react';
import { Link,useHistory } from 'react-router-dom';
import Moment from 'react-moment';
import CountDownButton from './CountDownButton';
import API from '../../api';
import Axios from 'axios';
import {PopupContext} from '../../App';

function ExamCard(props)
{   
    const {setPopupShow,setPopupMsg}  =   useContext(PopupContext);
    let history         = useHistory();
    let BtnCaption      = '';
    let StartTime       = '';
    let EndTime         = '';
    let TotalQuestions  = 0;
    let ExamDuration    = 0;
    let Theme           = '';
    let BtnTheme        = '';
    let myLink          = '';
    let Now             = '';
    let status          = '';

    StartTime         = props.exam.paper.from_date;
    EndTime           = props.exam.paper.to_date;
    Now               = props.exam.now;
    //----------------------Dynamic status------------------------------------------
      if(EndTime < Now)
      {
        status='expired';
      }
      else if(props.exam.examstatus==='inprogress')
      {
        status = 'inprogress';
      }
    //------------------------------------------------------------------------------
    if(props.exam.examstatus==='over')
    {
      status        = props.exam.examstatus;
    }
    const PaperName   = props.exam.paper.paper_name;
    TotalQuestions    = props.exam.paper.questions;
    ExamDuration      = props.exam.paper.duration;


    //---------------------Status according to database-------------------------

    if(status === 'over' || status  === 'expired')
    {
      if(status ==='over')
      {
        BtnCaption='Completed';
        Theme = 'text-white bg-success'
        BtnTheme = 'btn btn-success';
      }
      else
      {
        BtnCaption='Expired';
        Theme = 'bg-info';
        BtnTheme = 'btn btn-info';
      }
      myLink = <Link to={void(0)} className={BtnTheme} onClick={e => e.preventDefault()}>{BtnCaption}</Link>
    }
    else if(status==='' || status ==='inprogress')
    {
      if(status ==='')
      {
        BtnCaption='Start Exam';
        Theme = 'text-white bg-warning';
        BtnTheme = 'btn btn-warning';
        if(StartTime > Now)
        {
          BtnCaption='Coming Soon';
          Theme = 'bg-warning';
          BtnTheme = 'btn btn-warning';

          myLink = <CountDownButton  StartTime ={StartTime} Now={Now} exam={props.exam} role='STUDENT'/>
        }
        else
        {
          myLink = <Link onClick={() => {
            getParallelData(props.exam.paper.id,setPopupShow,setPopupMsg,history,props);
          }} className={BtnTheme}>{BtnCaption}</Link>;
        }
      }
      else
      {
        console.log(props.exam);
        BtnCaption='Continue Exam';
        Theme = 'text-white bg-primary';
        BtnTheme = 'btn btn-primary';
        myLink = <Link to={{pathname: '/instructions',state: {exam:props.exam,role:'STUDENT'}}} className={BtnTheme}>{BtnCaption}</Link>;
      }
    }
//------------------------------------------------------------------------------
    const userRequest = { btnCaption:BtnCaption, paperName:PaperName, startTime:StartTime,  endTime:EndTime, totQuestions:TotalQuestions, examDuration:ExamDuration, theme:Theme, btnTheme:BtnTheme }
    return (
            <div className="col-lg-4">
              <div className='card' style={{minHeight:"400px",margin:"10px"}}>
                  <div className={"card-header "+userRequest.theme}>
                    <b>{userRequest.paperName}</b>
                  </div>
                  <div className="card-body">
                    <h6 className="card-title"><b>Exam Details</b></h6>
                    <ul>
                        <li><b>Start Time      :</b> <Moment format="MMMM Do YYYY, H:mm:ss A">{userRequest.startTime}</Moment></li>
                        <li><b>End Time        :</b> <Moment format="MMMM Do YYYY, H:mm:ss A">{userRequest.endTime}</Moment></li>
                        <li><b>Time Zone:</b> {getTimezoneName()} {Intl.DateTimeFormat().resolvedOptions().timeZone}</li>
                        <li><b>No of Questions :</b> {userRequest.totQuestions}</li>
                        <li><b>Exam Duration   :</b> {userRequest.examDuration}</li>
                    </ul>
                  </div>
                  <div className="card-footer">
                    <center>
                      {myLink}
                    </center>
                  </div>
              </div>
            </div>
    );
}
async function getParallelData(paperId,setPopupShow,setPopupMsg,history,props)
{
  let subjectData = null;
    let topicData   = null;
    let TotalMarks  =   0;
    let TotalQuest  =   0;
    let TopicSumMarks=  0;
    let TopicSumQuest=  0;

    //--------------Get Topic Data---------------------------------------------------
    await Axios.all([
        API.get('/paper/'+paperId),
        API.get('/subject/topic',{params:{'type':'single','paperId':paperId}})
    ])
    .then(responseArr => 
    {
        if(responseArr[0].data.status==='success')
        {
            subjectData = responseArr[0].data.data;
            
            if(subjectData)
            {
                TotalMarks = subjectData.marks;
                TotalQuest = subjectData.questions;
            }
        }
        
        if(responseArr[1].data.status==='success')
        {
            topicData = responseArr[1].data.data;
            if(topicData)
            {
                topicData.forEach(record => {
                    TopicSumMarks = TopicSumMarks + record.questions*record.marks;
                    TopicSumQuest = TopicSumQuest + record.questions;
                });
            }
        }

        if((TotalMarks !==  TopicSumMarks))
        {
          setPopupShow(true);
          setPopupMsg('Total Marks for Subject not matching with Topic wise Total Marks. Can not start Examination.');
        }
        if(TotalMarks === 0)
        {
          setPopupShow(true);
          setPopupMsg('Total Marks for this Subject not yet set. Can not start Examination.');
        }
        if(TopicSumMarks === 0)
        {
          setPopupShow(true);
          setPopupMsg('Topic Entry for this subject not yet done. Can not start Examination.');
        }

        if((TotalQuest !==  TopicSumQuest))
        {
          setPopupShow(true);
          setPopupMsg('Total Questions for Subject not matching with Topic wise Total Questions. Can not start Examination.');
        }
        if(TotalQuest === 0)
        {
          setPopupShow(true);
          setPopupMsg('Total Questions for this Subject not yet set. Can not start Examination.');
        }
        if(TopicSumQuest === 0)
        {
          setPopupShow(true);
          setPopupMsg('Topic Entry for this subject not yet done. Can not start Examination.');
        }

        if((TotalMarks ===  TopicSumMarks) && (TotalQuest ===  TopicSumQuest))
        {
          history.push({pathname: '/instructions',state: {exam:props.exam,role:'STUDENT'}});
        }
    });
}
function getTimezoneName()
{
  const today         = new Date();
  const short         = today.toLocaleDateString(undefined);
  const full          = today.toLocaleDateString(undefined, { timeZoneName: 'long' });
  const shortIndex    = full.indexOf(short);
  if (shortIndex >= 0)
  {
    const trimmed     = full.substring(0, shortIndex) + full.substring(shortIndex + short.length);
    return trimmed.replace(/^[\s,.\-:;]+|[\s,.\-:;]+$/g, '');
  }
  else
  {
    return full;
  }
}

export default ExamCard;
