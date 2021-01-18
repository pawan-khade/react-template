import React, { useState,useEffect, useContext } from 'react';
import Webcam from "react-webcam";
import { useHistory } from 'react-router-dom';
import {ShowContext} from '../../App';
import API from '../../api';

const CaptureTime = process.env.REACT_APP_PHOTO_CAPTURE_TIME * 1000;

const WebCamCapture = (props) => {
    const webcamRef             = React.useRef(null);
    const [imgSrc, setimgSrc]   = useState(null);
    const videoConstraints      = {facingMode: "user"};
    let history                 = useHistory();
    const {setShow,setMsg}      = useContext(ShowContext);
    const exam = props.exam;
    
  
    useEffect(() => {    
        navigator.mediaDevices.getUserMedia({ video: true, voice: true })
        .then(function(stream) 
        {
            props.setMyCameraPerm(true);
        })
        .catch(function(err) 
        {
            props.setMyCameraPerm(false);
            setShow(true);
            setMsg('Without Camera Premission Examination can not be started.');
            history.replace('/studenthome');
        });
        let myCapture = setInterval(capture, CaptureTime);

        //------------------Cleanup-----------------------------------------
        return () => {
            clearInterval(myCapture);
        }
        //------------------------------------------------------------------
    },[history.location]);  

    const capture                = React.useCallback(
      () => 
      { 
        if(webcamRef)
        {
            const imageSrc           = webcamRef.current.getScreenshot();
            setimgSrc(imageSrc);  
            storeSnap(exam,imageSrc);
        }
      },
      [webcamRef,setimgSrc]
    );
  
    return (
        <div className="col-lg-12" style={{margin:"20px"}}>
            <center>
                <Webcam
                audio={false}
                height={400}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={300}
                videoConstraints={videoConstraints}
                screenshotQuality={"1"}
                />
            </center>
        </div>
    );
  };    

  async function storeSnap(exam,image)
  {
    await API.post('/proctor/',{"type": "snapshot","exam":exam,"image":image})
    .then((res) => {
        console.log('snap stored successfully');
    })
    .catch((error) =>
    {
        console.log('problem storing snapshot');
    });
  }

  export default WebCamCapture;