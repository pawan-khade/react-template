import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

function ExamCard(props)
{
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

          myLink = <Link to={void(0)} className={BtnTheme}>{BtnCaption}</Link>;
        }
        else
        {
          myLink = <Link to={{pathname: '/instructions',state: {exam:props.exam,role:'STUDENT'}}} className={BtnTheme}>{BtnCaption}</Link>;
        }
      }
      else
      {
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
