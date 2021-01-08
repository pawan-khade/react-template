import React from 'react';
import Alert from "react-bootstrap/Alert";

function AlertDismissible(props)
{
  return (
    props.myShow && props.myMsg ?
      <Alert
        variant={"dark"}
        onClose={() => props.mySetShow(false)}
        dismissible
        style={{position:"fixed",top:"83%",width:"58%",left:"22%",zIndex:"99999"}}
        >
        {props.myMsg}
      </Alert> : null
  );
}

export default AlertDismissible;
