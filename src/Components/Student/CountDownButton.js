import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import CountdownTimer from "react-component-countdown-timer";

const CountDownButton = (props) => {
    let fromTime                =   props.StartTime;
    let now                     =   props.Now;

    const [remTime,setRemNow]      =   useState(fromTime-now);

    useEffect(()=> {
        let  interval = setInterval(() => {
            setRemNow(remTime-1000);
        }, 1000);

        return () => clearInterval(interval); 
    },[remTime]);
    
    return (
        <div>
            {Math.round(remTime/1000) > 0 ?
            <button className='btn btn-warning'>Exam Starts in <b><CountdownTimer count={Math.round(remTime/1000)} backgroundColor="#FFC107" /></b></button>
            :
            <Link to={{pathname: '/instructions',state: {exam:props.exam,role:props.role}}} className='btn btn-warning'>Start Exam</Link>
            }
        </div>
    );
};

export default CountDownButton;