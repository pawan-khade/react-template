import React, {useState} from 'react';
import MathJax from 'react-mathjax-preview';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';


function Options(props) 
{
    const [isOpen, setIsOpen]     = useState(false);
    const projpath                =   process.env.REACT_APP_PROJPATH;
    let opt                       =   '';
    let optType                   =   '';
    let optImg                    =   '';
    let opt_path                  =   '';

    const questionIndex           =   props.data.questions.location.state.currentQuestionIndex;
    const selectedOptions         =   props.selectedOptions;

    if(props.opt)
    {
      opt                         =   props.opt.split(':$:')[0];
      optType                     =   props.opt.split(':$:')[1];
    }
    if(props.optimage)
    {
       optImg                      =   props.optimage.split(':$:')[0];
       optType                     =   props.optimage.split(':$:')[1];
       opt_path                    =   projpath+""+optImg;
    }

    return (
      selectedOptions!== undefined && questionIndex!== undefined ?
          <div className="col-lg-12 row" onClick={() => {props.setMyOption(optType);}} >
            <span>
              <input checked={verifyOption(questionIndex, selectedOptions, optType)} type="radio" name="option"  value={optType} onChange={() => {
              props.setMyOption(optType);
            }} />
            </span>
            <span style={{"margin-left":"10px"}}>
              <MathJax math={opt} />
            </span>
            {isOpen && (<Lightbox
              mainSrc={opt_path}
              onCloseRequest={() => setIsOpen(false)}
              />
            )}
            <img src={opt_path} alt="" onClick={() => setIsOpen(true)}/>
          </div>
      : null
    );
}

function verifyOption(questionIndex, selectedOptions, optType)
{
  //console.log(questionIndex+':'+selectedOptions[questionIndex]+':'+optType);
  if(selectedOptions[questionIndex])
  {
    return selectedOptions[questionIndex].trim() === optType.trim();
  }
  else
  {
    return selectedOptions[questionIndex] === optType;
  }
}

export default Options;
