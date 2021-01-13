import React, { useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import OverallSummery from "./OverallSummery";
import { useHistory } from 'react-router-dom';
import API from '../../api';


function EndExamButton(props) {
  const [isLast, setIsLast]               = useState(false);
  const [show, setShow]                   = useState(false);
  let history                             = useHistory();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const index = parseInt(props.index);
  const length= parseInt(props.length);

  useEffect(() => {
    index === length-1 ? setIsLast(true):  setIsLast(false);
  },[index,length]);
        return (
          isLast ?
          <>
            <div className="col-lg-3">
              <button className="btn btn-warning" onClick={handleShow}>End Exam</button>
            </div>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Body>
                    <OverallSummery data={props.data}/>
                    <center>
                      <h5>Are you sure to End the Exam?</h5>
                      <Button variant="success" onClick={() => {
                        handleEndExam(props,history);
                      }}>Yes</Button> &nbsp;&nbsp;
                      <Button variant="danger" onClick={handleClose}>No</Button>
                    </center>
                </Modal.Body>
            </Modal>
          </>
            : null
        );
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
