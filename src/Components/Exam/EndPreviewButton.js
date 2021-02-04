import React from 'react';
import { useHistory } from 'react-router-dom';

function EndPreviewButton(props) 
{
  let history                             = useHistory();
    return (
          <>
            <div className="col-lg-3">
              <button className="btn btn-warning" onClick={() => history.replace("/adminhome")}>End Preview</button>
            </div>
          </>
    );
}

export default EndPreviewButton;
