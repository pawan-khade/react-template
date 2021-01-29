import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import API from '../../api';
import {ShowContext} from '../../App';

function NextSaveButton(props) {
        const {setShow,setMsg} = useContext(ShowContext);

        const [islast, setIslast]   = useState(false)
        const myIndex               = parseInt(props.data.location.state.currentQuestionIndex);
        let history                 = useHistory();
        const maxQuestions          = parseInt(props.data.location.state.questions.length);

        useEffect(() =>
        {
          myIndex < (maxQuestions) ? setIslast(false) : setIslast(true);
        },[myIndex,maxQuestions]);

        console.log('myOption', props.myOption);
        return (
            <div className="col-lg-3">
                <button className="btn btn-primary"
                onClick={() => {
                  saveAndChangeIndex(props,(myIndex+1),history,maxQuestions,props.myOption,setShow,setMsg)
                }}
                disabled={islast}>Save & Next</button>
            </div>
        );
}

async function saveAndChangeIndex(props,index,history,maxQuestions,myOption,setShow,setMsg)
{
  let myQuestions           = props.data.location.state.questions;
  const myIndex             = (index-1);
  const curOptionStatus     = myQuestions[myIndex].answered;
  const answerId            = myQuestions[myIndex].id;
  let newOptionStatus       = '';

  let myUnsolvedQuestionIndexes   =  props.data.location.state.unsolvedQuestionIndexes;
  let mySolvedQuestionIndexes     =  props.data.location.state.solvedQuestionIndexes;
  let myMarkedUnsolvedIndexes     =  props.data.location.state.markedUnsolvedIndexes;
  let myMarkedSolvedIndexes       =  props.data.location.state.markedSolvedIndexes;

  //-----------------------Find new option status2---------------------------
    if(curOptionStatus === 'unanswered'){
      newOptionStatus = 'answered';
    }
    else if(curOptionStatus === 'unansweredandreview'){
      newOptionStatus = 'answeredandreview';
    }
    else {
      newOptionStatus = curOptionStatus;
    }
    //-----------------------------------------------------------------

  if(myOption !== undefined && myOption !== null)
  {
    //-----------------------Send Data to Server--------------------------------
    const ExamId = props.data.location.state.exam.id;
    await API.put('/answer/'+answerId,{"type":"saveanswer","answered": newOptionStatus, "stdanswer": myOption, "answer_by": ExamId})
    .then(res =>
     {
         if(res.data.status === 'success')
         {
           //-----------------------Save Data to Local Array---------------------------
             if(curOptionStatus === 'unanswered'){
               newOptionStatus = 'answered';
               myQuestions[myIndex].answered = newOptionStatus;
               myQuestions[myIndex].stdanswer = myOption;
               myUnsolvedQuestionIndexes = myUnsolvedQuestionIndexes.filter(item => item !== myIndex);
               mySolvedQuestionIndexes.push(myIndex);
               myUnsolvedQuestionIndexes.sort();
               mySolvedQuestionIndexes.sort();
             }
             else if(curOptionStatus === 'unansweredandreview'){
               newOptionStatus = 'answeredandreview';
               myQuestions[myIndex].answered = newOptionStatus;
               myQuestions[myIndex].stdanswer = myOption;
               myMarkedUnsolvedIndexes = myMarkedUnsolvedIndexes.filter(item => item !== myIndex);
               myMarkedSolvedIndexes.push(myIndex);
               myMarkedUnsolvedIndexes.sort();
               myMarkedSolvedIndexes.sort();
             }
             else {
               newOptionStatus = curOptionStatus;
             }
             //-----------------------------------------------------------------
             var originalSelectedOptions        = getSelectedOptions(myQuestions);

             if(index < maxQuestions)
             {
               const examDetailsButtons = {
                 exam                               :  props.data.location.state.exam,
                 questions                          :  myQuestions,
                 currentQuestionIndex               :  myIndex+1,
                 solvedQuestionIndexes              :  mySolvedQuestionIndexes, unsolvedQuestionIndexes            :  myUnsolvedQuestionIndexes,
                 markedSolvedIndexes                :  myMarkedSolvedIndexes,
                 markedUnsolvedIndexes              :  myMarkedUnsolvedIndexes
               }
               props.setMyOption(undefined);
               history.replace("/startexam", examDetailsButtons) ;
             }
             if(index === maxQuestions)
             {
               const examDetailsButtons = {
                 exam                               :  props.data.location.state.exam,
                 questions                          :  myQuestions,
                 currentQuestionIndex               :  myIndex,
                 solvedQuestionIndexes              :  mySolvedQuestionIndexes, unsolvedQuestionIndexes            :  myUnsolvedQuestionIndexes,
                 markedSolvedIndexes                :  myMarkedSolvedIndexes,
                 markedUnsolvedIndexes              :  myMarkedUnsolvedIndexes
               }
               props.setSelectedOptions(originalSelectedOptions);
               props.setMyOption(undefined);
               history.replace("/startexam", examDetailsButtons) ;
             }
         }
     })
    .catch(error =>
     {
       if(error.response.status !== 429)
       {
           let examDetails = {};
           const myQuestions = getQuestions(props.data.location.state.exam);
           if(myQuestions)
           {
             examDetails = {
             exam                               :  props.data.location.state.exam,
             questions                          :  myQuestions,
             currentQuestionIndex               :  myIndex,
             solvedQuestionIndexes              :  getIndexes(myQuestions,'answered'), unsolvedQuestionIndexes            :  getIndexes(myQuestions,'unanswered'),
             markedSolvedIndexes                :  getIndexes(myQuestions,'answeredandreview'),
             markedUnsolvedIndexes              :  getIndexes(myQuestions,'unansweredandreview'),
             }
             props.setMyOption(undefined);
             history.replace("/startexam", examDetails) ;
           }
        }
        else
        {
           setShow(true);
           setMsg('Server is Busy. Please wait for some Seconds...');
           if(index < maxQuestions)
           {
             const examDetailsButtons = {
             exam                               :  props.data.location.state.exam,
             questions                          :  props.data.location.state.questions,
             currentQuestionIndex               :  myIndex,
             solvedQuestionIndexes              :  props.data.location.state.solvedQuestionIndexes, unsolvedQuestionIndexes            :  props.data.location.state.unsolvedQuestionIndexes,
             markedSolvedIndexes                :  props.data.location.state.markedSolvedIndexes,
             markedUnsolvedIndexes              :  props.data.location.state.markedUnsolvedIndexes,
             }
             props.setMyOption(undefined);
             history.replace("/startexam", examDetailsButtons) ;
           }
        }
     });
    //--------------------------------------------------------------------------
  }
  else
  {
    if(index < maxQuestions)
    {
      const examDetailsButtons = {
      exam                               :  props.data.location.state.exam,
      questions                          :  props.data.location.state.questions,
      currentQuestionIndex               :  myIndex+1,
      solvedQuestionIndexes              :  props.data.location.state.solvedQuestionIndexes, unsolvedQuestionIndexes            :  props.data.location.state.unsolvedQuestionIndexes,
      markedSolvedIndexes                :  props.data.location.state.markedSolvedIndexes,
      markedUnsolvedIndexes              :  props.data.location.state.markedUnsolvedIndexes,
      }
      props.setMyOption(undefined);
      history.replace("/startexam", examDetailsButtons) ;
    }
  }
}


async function getQuestions(exam)
{
  const ExamId = exam.id;
  const res = await API.get('/answer',{params: {"exam_id": ExamId}});

  if(res.data.status === 'success')
  {
    return res.data.data;
  }
  else
  {
    return null;
  }
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


function getIndexes(myQuestions,searchString)
{
  let arr     = [];
  myQuestions.forEach(function(question,index){
    if(question.answered === searchString)
    {
      arr.push(index);
    }
  });
  return arr;
}

export default NextSaveButton;
