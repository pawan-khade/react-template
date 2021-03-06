import React  from 'react';

function CountCard(props)
{
    return (
        <div className="col-lg-2 mb-2 que-no-list-btn-wid" style={{fontSize: "10px"}}>
          <center>
            <button type="button" onClick={props.onClick} className={'btn btn-'+props.color}>{props.count}</button>
          </center>
          <center>{props.label}</center>
        </div>
    );
}

export default CountCard;
