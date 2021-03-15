import React from 'react';
import { useHistory } from 'react-router-dom';

function EndPreviewButton(props) 
{
  let history                             = useHistory();
    return (
          <>
            <div>
              <button className="btn btn-warning btn-sm ans-btns-mg-btm" onClick={() => history.replace("/adminhome")}>End Preview</button>
            </div>
          </>
    );
}

export default EndPreviewButton;
