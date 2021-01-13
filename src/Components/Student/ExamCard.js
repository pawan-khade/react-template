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

    const status      = props.exam.examstatus;
    const PaperName   = props.exam.paper.paper_name;
    TotalQuestions    = props.exam.paper.questions;
    ExamDuration      = props.exam.paper.duration;
    StartTime         = props.exam.paper.from_date;
    EndTime           = props.exam.paper.to_date;

    if(status === 'over' || status  === 'expired')
    {
      if(status ==='over')
      {
        BtnCaption='Completed';
        Theme = 'text-white bg-success'
        BtnTheme = 'btn btn-secondary';
      }
      else
      {
        BtnCaption='Expired';
        Theme = 'bg-warning';
        BtnTheme = 'btn btn-info';
      }
      myLink = <Link to="" className={BtnTheme} onClick={e => e.preventDefault()}>{BtnCaption}</Link>
    }
    else if(status==='' || status ==='inprogress')
    {
      if(status ==='')
      {
        BtnCaption='Start Exam';
        Theme = 'text-white bg-dark';
        BtnTheme = 'btn btn-primary';
      }
      else
      {
        BtnCaption='Continue Exam';
        Theme = 'text-white bg-primary';
        BtnTheme = 'btn btn-success';
      }
      myLink = <Link to={{pathname: '/instructions',state: props.exam }} className={BtnTheme}>{BtnCaption}</Link>;
    }

    const userRequest = { btnCaption:BtnCaption, paperName:PaperName, startTime:StartTime,  endTime:EndTime, totQuestions:TotalQuestions, examDuration:ExamDuration, theme:Theme, btnTheme:BtnTheme }
    return (
            <div className="col-lg-4">
              <div className='card' style={{minHeight:"370px",margin:"10px"}}>
                  <div className={"card-header "+userRequest.theme}>
                    <b>{userRequest.paperName}</b>
                  </div>
                  <div className="card-body">
                    <h6 className="card-title"><b>Exam Details</b></h6>
                    <ul>
                        <li>Start Time      : <Moment format="YYYY-MM-DD hh:mm:ss z">{userRequest.startTime}</Moment></li>
                        <li>End Time        : <Moment format="YYYY-MM-DD hh:mm:ss z">{userRequest.endTime}</Moment></li>
                        <li>No of Questions : {userRequest.totQuestions}</li>
                        <li>Exam Duration   : {userRequest.examDuration}</li>
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

export default ExamCard;
