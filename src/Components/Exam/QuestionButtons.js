import React from 'react';
import { useHistory } from 'react-router-dom';

function QuestionButtons(props) {
  const qas           = props.qas.location.state.questions;
  const myIndex       = props.qas.location.state.currentQuestionIndex;
  let history         =   useHistory();
        return (
          <div className="col-lg-12">
              <div className='card col-lg-12'>
                  <div className="card-header bg-primary row">
                    <div className="col-lg-12">
                      <h6><b><center>Questions</center></b></h6>
                    </div>
                  </div>
                  <div className="card-body col-lg-12 row">
                    {qas.map((qa,index) => (
                      <div className="col-md-2 mb-2 que-no-list-btn-wid" key={qa.qnid_sr}>
                          <input type="button" className={getColor(index,myIndex,qa)} value={qa.qnid_sr}  onClick={() => {changeIndex(props,index,history)}}/>

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
    preview                            :  props.qas.location.state.preview,
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
  originalSelectedOptions = questions.map((question,index) =>
  {
    return question.stdanswer
  });
  return originalSelectedOptions;
}

function getColor(index,myIndex,qa)
{
    if(index === myIndex) {return "btn btn-sm btn-danger que-no-list-wid";}
    switch (qa.answered) {
      case "unanswered"         : return "btn btn-sm btn-outline-dark que-no-list-wid";
      case "answered"           : return "btn btn-sm btn-success que-no-list-wid";
      case "answeredandreview"  : return "btn btn-sm btn-primary que-no-list-wid";
      default                   : return "btn btn-sm btn-warning que-no-list-wid";
    }
}

export default QuestionButtons;
