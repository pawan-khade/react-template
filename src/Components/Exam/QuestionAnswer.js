import React from 'react';
import Options from "./Options";
import MathJax from 'react-mathjax-preview';

function QuestionAnswer(props) {
  const questions     = props.questions.location.state.questions;
  const index         = props.questions.location.state.currentQuestionIndex;

  //console.log(stdanswer);
  //------------------------------Question Variables----------------------------
  let  question       =   '';
  const projpath      =   process.env.REACT_APP_PROJPATH;
  let question_path   =  '';
  //----------------------------------------------------------------------------

  if(!questions[index].question.qu_fig)
  {
    question = questions[index].question.question;
  }
  else
  {
    question = questions[index].question.question;
    question_path = projpath+""+questions[index].question.qu_fig;
  }

  return (
          <div className="col-lg-12 row">
            <div className="col-lg-12">
              <b>Question {questions[index].qnid_sr}:</b>
            </div>
            <div className="col-lg-12" style={{height:"200px", overflow:"auto"}}>
                <MathJax math={question} />
                <br/>
              <img src={question_path} alt=""/>
            </div>

            <div className="col-lg-12">
              <hr/>
            </div>

            <div className="col-lg-12" style={{height:"190px", overflow:"auto"}}>

              <Options id="optiona" opt={questions[index].question.optiona} optimage={questions[index].question.a1} qu={questions[index]} setMyOption={props.setMyOption} data={props} selectedOptions={props.selectedOptions} />

              <Options id="optionb" opt={questions[index].question.optionb} optimage={questions[index].question.a2} qu={questions[index]} setMyOption={props.setMyOption} data={props} selectedOptions={props.selectedOptions} />

              <Options id="optionc" opt={questions[index].question.optionc} optimage={questions[index].question.a3} qu={questions[index]} setMyOption={props.setMyOption} data={props} selectedOptions={props.selectedOptions} />

              <Options id="optiond" opt={questions[index].question.optiond} optimage={questions[index].question.a4} qu={questions[index]} setMyOption={props.setMyOption} data={props} selectedOptions={props.selectedOptions} />

            </div>
          </div>
  );
}

export default QuestionAnswer;
