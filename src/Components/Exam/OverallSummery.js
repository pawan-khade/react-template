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
                  <div className="card-body col-lg-12 row" style={{float:"right" ,width:"350px"}}>

                    <div className="col-lg-2" style={{marginBottom:"5px"}}>
                      <button className="btn btn-danger" style={{height:"30px"}}> </button>
                    </div>
                    <div className="col-lg-10" style={{fontSize:"8"}}>
                      Current Question
                    </div>
                    <div className="col-lg-12">
                      <hr/>
                    </div>

                    <div className="col-lg-2" style={{marginBottom:"5px"}}>
                      <button className="btn btn-sm btn-success">{props.data.location.state.solvedQuestionIndexes.length}</button>
                    </div>
                    <div className="col-lg-10" style={{fontSize:"8"}}>
                      Attempted
                    </div>

                    <div className="col-lg-2" style={{marginBottom:"5px"}}>
                      <button className="btn btn-sm btn-outline-dark">{props.data.location.state.unsolvedQuestionIndexes.length}</button>
                    </div>
                    <div className="col-lg-10" style={{fontSize:"8"}}>
                      Not Attempted
                    </div>

                    <div className="col-lg-2" style={{marginBottom:"5px"}}>
                      <button className="btn btn-sm btn-primary">{props.data.location.state.markedSolvedIndexes.length}</button>
                    </div>
                    <div className="col-lg-10" style={{fontSize:"8"}}>
                      Attempted and Review
                    </div>

                    <div className="col-lg-2">
                      <button className="btn btn-sm btn-warning">{props.data.location.state.markedUnsolvedIndexes.length}</button>
                    </div>
                    <div className="col-lg-10" style={{fontSize:"8"}}>
                      Not Attempted and Review
                    </div>
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
