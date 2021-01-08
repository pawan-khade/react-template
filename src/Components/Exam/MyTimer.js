import React ,{ useState, useEffect }  from 'react';
import CountdownTimer from "react-component-countdown-timer";
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const serverPath = process.env.REACT_APP_SERVER_PROJPATH;

function MyTimer(props) {
        let [timer, setTimer]             =   useState();

        const exam = props.data.location.state.exam;
        const examId = exam.id;
        const examDuration = exam.paper.duration;
        let history                             = useHistory();

        useEffect(() =>
        {
                getTimer(setTimer,examId,examDuration);
                const heartBeatDuration = process.env.REACT_APP_HEART_BEAT_DURATION;
                //------------Elapsed Time Book Keeping-------------------------------
                let myInterval = setInterval(() => {
                    manageExamSession(setTimer,examId,examDuration)
                }, heartBeatDuration)
                //--------------------------------------------------------------------
                //--------------Cleanup Function--------------------------------------
                return () => {
                    clearInterval(myInterval);
                }
                //--------------------------------------------------------------------
        },[examId, examDuration]);

        return (
            timer ? <CountdownTimer count={timer} hideDay size={20} backgroundColor="#007bff" color="#ffffff" onEnd={() => {handleEndExam(props,history);}}/> : null
        );
}

async function handleEndExam(props,history)
{
  const exam      = props.data.location.state.exam;
  const token     = JSON.parse(localStorage.getItem("token"));
  const ExamId    = exam.id;

  const api = axios.create({baseURL:serverPath,headers: {'Authorization': 'Bearer '+token}});
  const res = await api.put('/exam/'+ExamId,{"status": "end"});
  if(res.data.status === 'success')
  {
    history.replace("/studenthome");
  }
}

async function getTimer(setTimer,examId, examDuration)
{
  const duration = examDuration * 60;
  const token = JSON.parse(localStorage.getItem("token"));

  const api = axios.create({baseURL:serverPath,headers: {'Authorization': 'Bearer '+token}});
  await api.get('/examSession',{params: {"exam_id": examId}})
  .then((res) => {
    const timerData = res.data;
    setTimer(duration - timerData.elapsedTime);
  })
  .catch((error) =>
  {
    console.log(error.response.status);
  });
}

async function manageExamSession(setTimer,examId, examDuration)
{
  const duration = examDuration * 60;
  const token = JSON.parse(localStorage.getItem("token"));

  const api = axios.create({baseURL:serverPath,headers: {'Authorization': 'Bearer '+token}});
  await api.put('/examSession',{"exam_id": examId})
  .then((res) => {
    const timerData = res.data;
    setTimer(duration - timerData.elapsedTime);
  })
  .catch((error) =>
  {
    console.log(error.response.status);
  });
}


export default MyTimer;
