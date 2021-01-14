import React, {useState} from 'react';
import MathJax from 'react-mathjax-preview';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';


function Options(props) {
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
          <div className="col-lg-12 row">
            <div className="col-lg-1">
              <input checked={verifyOption(questionIndex, selectedOptions, optType)} type="radio" name="option"  value={optType} onChange={() => {
              props.setMyOption(optType);
            }} />
            </div>
            <div className="col-lg-11">
              <MathJax math={opt} />
            </div>
            {isOpen && (<Lightbox
              mainSrc={opt_path}
              onCloseRequest={() => setIsOpen(false)}
              />
            )}
            <img src={opt_path} alt="" onClick={() => setIsOpen(true)}/>
          </div>
    );
}

function verifyOption(questionIndex, selectedOptions, optType){
  return selectedOptions[questionIndex] === optType;
}

export default Options;
