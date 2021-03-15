import React from 'react';

function OverallSummery(props) {
        return (
          <div className="col-lg-12" style={{float:"right",marginTop:"10px"}}>
              <div className='card col-lg-12'>
                  <div className="card-header bg-primary row" style={{color:"white"}}>
                    <div className="col-lg-12">
                      <h6><b><center>Overall Exam Summery</center></b></h6>
                    </div>
                  </div>
                  <div className="card-body col-lg-12 row">

                    <span>
                      <button className="btn btn-danger que-no-list-wid">{parseInt(props.data.location.state.currentQuestionIndex)+1}</button>
                    </span>
                    <span style={{fontSize:"8","margin-left":"10px"}}>
                      Current Question
                    </span>
                    <div className="col-lg-12">
                      <hr/>
                    </div>

                    <span>
                      <button className="btn btn-sm btn-success que-no-list-wid" style={{"margin-bottom":"5px"}}>{props.data.location.state.solvedQuestionIndexes.length}</button>
                    </span>
                    <span style={{fontSize:"8","margin-left":"10px"}}>
                      Attempted
                    </span>
                    <div className="col-lg-12">
                      
                    </div>
                    <span>
                      <button className="btn btn-sm btn-outline-dark que-no-list-wid" style={{"margin-bottom":"5px"}}>{props.data.location.state.unsolvedQuestionIndexes.length}</button>
                    </span>
                    <span style={{fontSize:"8","margin-left":"10px"}}>
                      Not Attempted
                    </span>
                    <div className="col-lg-12">
                      
                    </div>
                    <span>
                      <button className="btn btn-sm btn-primary que-no-list-wid" style={{"margin-bottom":"5px"}}>{props.data.location.state.markedSolvedIndexes.length}</button>
                    </span>
                    <span style={{fontSize:"8","margin-left":"10px"}}>
                      Attempted and Review
                    </span>
                    <div className="col-lg-12">
                      
                    </div>
                    <span>
                      <button className="btn btn-sm btn-warning que-no-list-wid" style={{"margin-bottom":"5px"}}>{props.data.location.state.markedUnsolvedIndexes.length}</button>
                    </span>
                    <span style={{fontSize:"8","margin-left":"10px"}}>
                      Not Attempted and Review
                    </span>
                    <div className="col-lg-12">
                      <hr/>
                    </div>

                    <div className="col-lg-12">
                      <h6><b>Total Attempted Questions:{parseInt(props.data.location.state.markedSolvedIndexes.length) + parseInt(props.data.location.state.solvedQuestionIndexes.length)}</b></h6>
                    </div>
                  </div>
              </div>
            </div>
        );
}

export default OverallSummery;
