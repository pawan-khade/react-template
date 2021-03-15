import React, {useState,useEffect} from 'react';
import Options from "./Options";
import MathJax from 'react-mathjax-preview';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

function QuestionAnswer(props) {
  const questions             = props.questions.location.state.questions;
  const index                 = props.questions.location.state.currentQuestionIndex;
  const [isOpen, setIsOpen]   = useState(false);
  const showMarks             = parseInt(props.questions.location.state.exam.paper.question_marks);
  const shuffleOptions        = parseInt(props.questions.location.state.exam.paper.option_shuffle);

  //------------------------------Question Variables----------------------------
  let  question       =   '';
  const projpath      =   process.env.REACT_APP_PROJPATH;
  let question_path   =  '';
  //----------------------------------------------------------------------------

  if(questions[index] && !questions[index].question.qu_fig)
  {
    question = questions[index].question.question;
  }
  else
  {
    if(questions[index])
    {
      question = questions[index].question.question;
      question_path = projpath+""+questions[index].question.qu_fig;
    }
  }

  return (
    questions[index] ?
          <div className="col-lg-12 row">
            
            <div className="col-lg-12">
              <b>Question {questions[index].qnid_sr}:</b>
            </div>
            <div className="col-lg-12" style={{height:"150px", overflow:"auto"}}>
                {showMarks ? <div style={{float:'right'}}><b>{'Marks: '+questions[index].marks}</b></div>:null}

                <MathJax math={question} /> 

                <br/>
                {isOpen && (<Lightbox
                  mainSrc={question_path}
                  onCloseRequest={() => setIsOpen(false)}
                  />
                )}
              <img src={question_path} alt="" onClick={() => setIsOpen(true)}/>
            </div>

            <div className="col-lg-12">
              <hr/>
            </div>

            <div className="col-lg-12" style={{height:"255px", overflowY:"scroll"}}>

              <Options id="optiona" opt={questions[index].question.optiona} optimage={questions[index].question.a1} qu={questions[index]} setMyOption={props.setMyOption} data={props} selectedOptions={props.selectedOptions} />
              <hr/>
              <Options id="optionb" opt={questions[index].question.optionb} optimage={questions[index].question.a2} qu={questions[index]} setMyOption={props.setMyOption} data={props} selectedOptions={props.selectedOptions} />
              <hr/>
              <Options id="optionc" opt={questions[index].question.optionc} optimage={questions[index].question.a3} qu={questions[index]} setMyOption={props.setMyOption} data={props} selectedOptions={props.selectedOptions} />
              <hr/>
              <Options id="optiond" opt={questions[index].question.optiond} optimage={questions[index].question.a4} qu={questions[index]} setMyOption={props.setMyOption} data={props} selectedOptions={props.selectedOptions} />

            </div>
          </div>
          :null
  );
}

export default QuestionAnswer;
