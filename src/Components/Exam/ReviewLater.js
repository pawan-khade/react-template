import React from 'react';
import API from '../../api';
import { useHistory } from 'react-router-dom';


function ReviewLater(props) {

        let myReviewArray     = props.myReviewQuestions;
        const questionIndex   = props.index;
        let history           = useHistory();
        const reviewVal       = myReviewArray[questionIndex];

        return (
            <div className="col-lg-3">
              <input type="checkbox" name="reviewlater" checked={reviewVal} onChange={() => {
                toggleReview(reviewVal,questionIndex,props,history);
              }}/> To be Reviewed Later
            </div>
        );
}

async function toggleReview(reviewVal,questionIndex,props,history,setCheckValue,checkValue)
{
  let questions = props.data.location.state.questions;

  const origAnswerType = questions[questionIndex].answered;
  const answerId       = questions[questionIndex].id;
  let newAnswerType ='unanswered';

  let myUnsolvedQuestionIndexes   =  props.data.location.state.unsolvedQuestionIndexes;
  let mySolvedQuestionIndexes     =  props.data.location.state.solvedQuestionIndexes;
  let myMarkedUnsolvedIndexes     =  props.data.location.state.markedUnsolvedIndexes;
  let myMarkedSolvedIndexes       =  props.data.location.state.markedSolvedIndexes;


  if(origAnswerType === 'answered')
  {
    newAnswerType = 'answeredandreview';

    mySolvedQuestionIndexes = mySolvedQuestionIndexes.filter(item => item !== questionIndex);
    myMarkedSolvedIndexes.push(questionIndex);

  }
  else if(origAnswerType === 'unanswered')
  {
    newAnswerType = 'unansweredandreview';

    myUnsolvedQuestionIndexes = myUnsolvedQuestionIndexes.filter(item => item !== questionIndex);
    myMarkedUnsolvedIndexes.push(questionIndex);

  }
  else if(origAnswerType === 'answeredandreview')
  {
    newAnswerType = 'answered';

    myMarkedSolvedIndexes = myMarkedSolvedIndexes.filter(item => item !== questionIndex);
    mySolvedQuestionIndexes.push(questionIndex);

  }
  else if(origAnswerType === 'unansweredandreview')
  {
    newAnswerType = 'unanswered';

    myMarkedUnsolvedIndexes = myMarkedUnsolvedIndexes.filter(item => item !== questionIndex);
    myUnsolvedQuestionIndexes.push(questionIndex);

  }
  myMarkedUnsolvedIndexes.sort();
  myMarkedSolvedIndexes.sort();
  mySolvedQuestionIndexes.sort();
  myUnsolvedQuestionIndexes.sort();

  questions[questionIndex].answered = newAnswerType;
  //---------------Update answer to Database------------------------------------
  await API.put('/answer/'+answerId,{"type":"savereview","answered": newAnswerType})
  .then(res =>
   {
       if(res.data.status === 'success')
       {
         const examDetailsButtons = {
         exam                               :  props.data.location.state.exam,
         questions                          :  questions,
         currentQuestionIndex               :  questionIndex,
         solvedQuestionIndexes              :  mySolvedQuestionIndexes, unsolvedQuestionIndexes            :  myUnsolvedQuestionIndexes,
         markedSolvedIndexes                :  myMarkedSolvedIndexes,
         markedUnsolvedIndexes              :  myMarkedUnsolvedIndexes,
         }
         history.replace("/startexam", examDetailsButtons) ;
       }
  })
  .catch(error =>
  {
       const examDetailsButtons = {
       exam                               :  props.data.location.state.exam,
       questions                          :  props.data.location.state.questions,
       currentQuestionIndex               :  questionIndex,
       solvedQuestionIndexes              :  props.data.location.state.solvedQuestionIndexes, unsolvedQuestionIndexes            :  props.data.location.state.unsolvedQuestionIndexes,
       markedSolvedIndexes                :  props.data.location.state.markedSolvedIndexes,
       markedUnsolvedIndexes              :  props.data.location.state.markedUnsolvedIndexes,
       }
       history.replace("/startexam", examDetailsButtons) ;
  });
  //----------------------------------------------------------------------------
}

export default ReviewLater;
