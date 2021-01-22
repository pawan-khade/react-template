import React from 'react';
import { useHistory } from 'react-router-dom';

function QuestionButtons(props) {
  const qas           = props.qas.location.state.questions;
  const myIndex       = props.qas.location.state.currentQuestionIndex;
  let history         =   useHistory();
        return (
          <div className="col-lg-12" style={{float: "right"}}>
              <div className='card col-lg-12'>
                  <div className="card-header bg-primary row" style={{color:"white"}}>
                    <div className="col-lg-12">
                      <h6><b><center>Questions</center></b></h6>
                    </div>
                  </div>
                  <div className="card-body col-lg-12 row" style={{float:"right" ,width:"350px"}}>
                    {qas.map((qa,index) => (
                      <div className="col-lg-2" key={qa.qnid_sr} style={{margin:"2px"}}>

                          <input type="button" className={getColor(index,myIndex,qa)} value={qa.qnid_sr}  style={{margin:"2px"}} onClick={() => {changeIndex(props,index,history)}}/>

                      </div>
                    ))}
                  </div>
              </div>
            </div>
        );
}

function changeIndex(props,index,history)
{
  var originalSelectedOptions        = getSelectedOptions(props.qas.location.state.questions);

  const examDetailsButtons = {
    exam                               :  props.qas.location.state.exam,
    questions                          :  props.qas.location.state.questions,
    currentQuestionIndex               :  index,
    solvedQuestionIndexes              :  props.qas.location.state.solvedQuestionIndexes, unsolvedQuestionIndexes            :  props.qas.location.state.unsolvedQuestionIndexes,
    markedSolvedIndexes                :  props.qas.location.state.markedSolvedIndexes,
    markedUnsolvedIndexes              :  props.qas.location.state.markedUnsolvedIndexes
  }
  props.setSelectedOptions(originalSelectedOptions);
  props.setMyOption(undefined);
  history.replace("/startexam", examDetailsButtons) ;
}

function getSelectedOptions(questions)
{
  let originalSelectedOptions = {};
  questions.map((question,index) =>
  {
    originalSelectedOptions[index] = question.stdanswer
  });
  return originalSelectedOptions;
}

function getColor(index,myIndex,qa)
{
    if(index === myIndex) {return "btn btn-sm btn-danger";}
    switch (qa.answered) {
      case "unanswered"         : return "btn btn-sm btn-outline-dark";
      case "answered"           : return "btn btn-sm btn-success";
      case "answeredandreview"  : return "btn btn-sm btn-primary";
      default                   : return "btn btn-sm btn-warning";
    }
}

export default QuestionButtons;
