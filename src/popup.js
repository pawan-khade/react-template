import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function Popup(props)
{
  const handleClose = () => props.setPopupShow(false);

  return (
    (props.popupShow && props.popupMsg!== undefined) ? 
        <Modal show={props.setPopupShow} onHide={handleClose} backdrop="static" size="lg">
            <Modal.Header closeButton style={{backgroundColor:"OliveDrab",color:"white"}}>
                <Modal.Title>Important Message</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="col-lg-12">
                    <h6>{props.popupMsg}</h6>
                </div>
                <hr/>
                <div className="col-lg-12">
                    <Button variant="danger" onClick={handleClose} style={{float:"right"}}>Close</Button>
                </div>
            </Modal.Body>
        </Modal>
    : null
  );
}

export default Popup;
