import React, { useState,useEffect, useContext } from 'react';
import Webcam from "react-webcam";
import { useHistory } from 'react-router-dom';
import {PopupContext} from '../../App';
import API from '../../api';
import {UserContext} from '../../App';


const WebCamCapture = (props) => {
    const {currentUser, setCurrentUser}     = useContext(UserContext);
    let CaptureTime                         = parseInt(props.CaptureTime) * 1000;
    
    if(CaptureTime === 0 || CaptureTime === '0')
    {
      CaptureTime = 9999999;
    }
    const webcamRef                         = React.useRef(null);
    const [imgSrc, setimgSrc]               = useState(null);
    const videoConstraints                  = {facingMode: "user"};
    let history                             = useHistory();
    const {setPopupShow,setPopupMsg}        = useContext(PopupContext);
    const exam                              = props.exam;
    const CapTime                           = props;
    const capture1                          = props.capture;
    

    const capture                = React.useCallback(
    () => 
        { 
          if(webcamRef)
          {
              const imageSrc            = webcamRef.current.getScreenshot();
              setimgSrc(imageSrc); 
              if(capture1 !== 'no')
              {
                //-----------------Specifically for getting value instead of Promise-----
                (async () => 
                {
                  let res = await storeSnap(exam,imageSrc);
                  let snapid = res.data.snapid;
                  if(snapid && props.isProctored)
                  {
                    ProcessImage(imageSrc,exam,snapid,setPopupShow,setPopupMsg);
                  }
                })();
                //-----------------------------------------------------------------------
              }
          }
        },
        [webcamRef,setimgSrc,exam]
    );

    useEffect(() => {    
        navigator.mediaDevices.getUserMedia({ video: true, voice: true })
        .then(function(stream) 
        {
            props.setMyCameraPerm(true);
        })
        .catch(function(err) 
        {
            props.setMyCameraPerm(false);
            setPopupShow(true);
            setPopupMsg('Without Camera Premission Examination can not be started.');
            if(currentUser && currentUser.role === 'STUDENT')
            {
                history.replace('/studenthome');
            }
            else if(currentUser && currentUser.role === 'ADMIN')
            {
                history.replace('/adminexamreport');
            }
        });
        let myCapture = setInterval(capture, CaptureTime);

        //------------------Cleanup-----------------------------------------
        return () => {
            clearInterval(myCapture);
        }
        //------------------------------------------------------------------
    },[history.location,capture,history,props,setPopupMsg,setPopupShow]);   

    let webCamStyle = '';

    if(props.show==='no')
    {
        webCamStyle = {display:'none'};
    }
    else
    {
        webCamStyle = {display:'block'};
    }
  
    return (
        <div className="col-lg-12" style={{margin:"20px"}} style={webCamStyle}>
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
    return await API.post('/proctor/',{"type": "snapshot","exam":exam,"image":image});
  }


  function ProcessImage(file,exam,snapid,setPopupShow,setPopupMsg) 
  {
        AnonLog();
        var image = null;
        
        var jpg = true;
        try
        {
            image = atob(file.split("data:image/jpeg;base64,")[1]);
        }
        catch (e)
        {
          jpg = false;
        }
        if (jpg == false)
        {
          try
          {
            image = atob(file.split("data:image/png;base64,")[1]);
          }
          catch (e)
          {
            console.log("Not an image file Rekognition can process");
            return;
          }
        }
        //unencode image bytes for Rekognition DetectFaces API
        var length = image.length;
        var imageBytes = new ArrayBuffer(length);
        var ua = new Uint8Array(imageBytes);
        for (var i = 0; i < length; i++)
        {
          ua[i] = image.charCodeAt(i);
        }
        //Call Rekognition
        DetectFaces(imageBytes,exam,snapid,setPopupShow,setPopupMsg);
  }
  //----------------------------------------------------------------------------

  //--------------------Provides anonymous log on to AWS services---------------
  function AnonLog()
  {
    // Configure the credentials provider to use your identity pool
    window.AWS.config.region = 'ap-south-1'; // Region
    window.AWS.config.credentials = new window.AWS.CognitoIdentityCredentials(
    {
        IdentityPoolId: 'ap-south-1:948e3fb3-7805-4620-8c28-aafcfdebfbd5',
    });
    // Make the call to obtain credentials
    window.AWS.config.credentials.get(function ()
    {
      // Credentials will be available when this function is called.
      var accessKeyId = window.AWS.config.credentials.accessKeyId;
      var secretAccessKey = window.AWS.config.credentials.secretAccessKey;
      var sessionToken = window.AWS.config.credentials.sessionToken;
    });
  }
  //----------------------------------------------------------------------------

  //------------------Face Detection Logic--------------------------------------

  function DetectFaces(imageData,exam,snapid,setPopupShow,setPopupMsg)
  {
    window.AWS.region = "ap-south-1";
    var rekognition = new window.AWS.Rekognition();
    var params = {
      Image: {
        Bytes: imageData
      },
      Attributes: [
        'ALL',
      ]
    };

    rekognition.detectFaces(params, function (err, data)
    {
      if (err) console.log(err, err.stack); // an error occurred
      else
      {
        if(data.FaceDetails.length > 0)
        {
          data.FaceDetails.map( async (element) => 
          {
            const agerange        = element.AgeRange.Low+'-'+element.AgeRange.High;
            const beard           = element.Beard.Value;
            const eyeglasses      = element.Eyeglasses.Value;
            const eyesopen        = element.EyesOpen.Value;
            const gender          = element.Gender.Value;
            const mustache        = element.Mustache.Value;
            const smile           = element.Smile.Value;
            const sunglasses      = element.Sunglasses.Value;
            const examid          = exam;

            let res = await API.post('/proctorDetails/',{"examid":examid,"snapid":snapid,"agerange":agerange,"beard":beard,"eyeglasses":eyeglasses,"eyesopen":eyesopen,"gender":gender,"mustache":mustache,"smile":smile,"sunglasses":sunglasses});

            console.log(res);
          });

          if(data.FaceDetails.length > 1)
          {
            //----------------------message for more than one person detection-------------
            setPopupShow(true);
            setPopupMsg('There are more than one persons sitting with you while taking examination. This  event will be recorded...');
            //-----------------------------------------------------------------------------
          }
        }
        else
        {
          //----------------------message for no person detection--------------------------
          setPopupShow(true);
          setPopupMsg('Either no person is taking examination or Camera of your device is not working or it might be intentionally blocked while taking examination. This event will be recorded...');
          //-------------------------------------------------------------------------------
        }
      }
    });
  }

  //----------------------------------------------------------------------------

  export default WebCamCapture;