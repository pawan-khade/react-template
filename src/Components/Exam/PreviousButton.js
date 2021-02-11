import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function PreviousButton(props) {
        const [isfirst, setIsfirst]  = useState(false)
        const myIndex               = parseInt(props.data.location.state.currentQuestionIndex);
        let history                 = useHistory();

        useEffect(() =>
        {
          myIndex === 0 ? setIsfirst(true) : setIsfirst(false);
        },[props,myIndex]);

        return (
            <div className="col-lg-2">
                <button className="btn btn-primary" onClick={() => {props.setMyOption(undefined);
                  changeIndex(props,(myIndex-1),history)}}
                disabled={isfirst}>Previous</button>
            </div>
        );
}

function changeIndex(props,index,history)
{
  if(index >= 0)
  {
    const examDetailsButtons = {
      preview                            :  props.data.location.state.preview,
      exam                               :  props.data.location.state.exam,
      questions                          :  props.data.location.state.questions,
      currentQuestionIndex               :  index,
      solvedQuestionIndexes              :  props.data.location.state.solvedQuestionIndexes, unsolvedQuestionIndexes            :  props.data.location.state.unsolvedQuestionIndexes,
      markedSolvedIndexes                :  props.data.location.state.markedSolvedIndexes,
      markedUnsolvedIndexes              :  props.data.location.state.markedUnsolvedIndexes
    }
    history.replace("/startexam", examDetailsButtons) ;
  }
}


export default PreviousButton;
