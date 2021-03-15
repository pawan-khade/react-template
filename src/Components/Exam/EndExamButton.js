import React, { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import OverallSummery from "./OverallSummery";
import { useHistory } from 'react-router-dom';
import API from '../../api';


function EndExamButton(props) {
  const [show, setShow]                   = useState(false);
  const [showEnd,setShowEnd]              = useState(false);
  let history                             = useHistory();
  const handleClose = ()                  => setShow(false);
  const handleShow = ()                   => setShow(true);
  const index                             = parseInt(props.index);
  const length                            = parseInt(props.length);
  let isLast                              = useLast(index,length);

  

        return (
          isLast ?
          <>
            <div>
              <button className="btn btn-warning btn-sm ans-btns-mg-btm" onClick={handleShow}>End Exam</button>
            </div>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header style={{backgroundColor:"OliveDrab",color:"white"}}>
                    <Modal.Title><center>End Examination Warning!!!</center></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <OverallSummery data={props.data}/>
                    <center>
                      <h5>Are you sure to End the Exam?</h5>
                      <Button variant="success" onClick={() => {
                        setShow(false);setShowEnd(true);
                      }}>Yes</Button> &nbsp;&nbsp;
                      <Button variant="danger" onClick={() => {
                        setShow(false);
                      }}>No</Button>
                    </center>
                </Modal.Body>
            </Modal>


            <Modal show={showEnd} onHide={handleClose} size="sm">
                <Modal.Header style={{backgroundColor:"OliveDrab",color:"white"}}>
                    <Modal.Title><center>Warning !!!</center></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <center>
                      <h5><font color="red">Do you really want to end Exam?</font></h5>
                      <Button variant="success" onClick={() => {
                        handleEndExam(props,history);
                      }}>Yes</Button> &nbsp;&nbsp;
                      <Button variant="danger" onClick={() => {
                        setShowEnd(false);
                      }}>No</Button>
                    </center>
                </Modal.Body>
            </Modal>
          </>
            : null
        );
}

function useLast(index,length)
{
  const [isLast, setIsLast]               = useState(false);

  useEffect(() => {
    index === length-1 ? setIsLast(true):  setIsLast(false);
  },[index,length]);

  return isLast;
}

async function handleEndExam(props,history)
{
  const exam      = props.data.location.state.exam;
  const ExamId    = exam.id;

  const res = await API.put('/exam/'+ExamId,{"status": "end"});
  if(res.data.status === 'success')
  {
    history.replace("/studenthome");
  }
}

export default EndExamButton;
