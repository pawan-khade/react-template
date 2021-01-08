import React from 'react';
import { Link } from 'react-router-dom';

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

    if(status === 'over' || status  === 'expired')
    {
      BtnCaption='Completed';
      StartTime=props.exam.startedon;
      EndTime=props.exam.endon;
      if(status ==='over')
      {
        Theme = 'text-white bg-success'
        BtnTheme = 'btn btn-secondary';
      }
      else
      {
        Theme = 'text-white bg-dark';
        BtnTheme = 'btn btn-info';
      }
      myLink = <Link to="" className={BtnTheme} onClick={e => e.preventDefault()}>{BtnCaption}</Link>
    }
    else if(status==='' || status ==='inprogress')
    {
      StartTime=props.exam.paper.from_date+' '+props.exam.paper.from_time;
      EndTime=props.exam.paper.to_date+' '+props.exam.paper.to_time;
      if(status ==='')
      {
        BtnCaption='Start Exam';
        Theme = 'bg-light';
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
              <div className='card'>
                  <div className={"card-header "+userRequest.theme}>
                    <b>{userRequest.paperName}</b>
                  </div>
                  <div className="card-body">
                    <h6 className="card-title"><b>Exam Details</b></h6>
                    <ul>
                        <li>Start Time      : {userRequest.startTime}</li>
                        <li>End Time        : {userRequest.endTime}</li>
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
