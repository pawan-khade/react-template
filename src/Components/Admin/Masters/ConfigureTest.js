import React, {useState,useEffect} from 'react';
import { Formik } from 'formik';
import API from '../../../api';
import {ShowContext} from '../../../App';
import { Link } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import { useHistory } from 'react-router-dom';

const ConfigureTest = (props) => {
    const paperId           =   props.location.state.paperId;
    const paperCode         =   props.location.state.paperCode;
    const paperName         =   props.location.state.paperName;
    let history             =   useHistory();
    let subjectData         =   {...props.location.state.data};    

    const [myMsg, setMyMsg]         = useState('');
    const [loading, setLoading]     = useState(false);

    const myInitialValues           = {'score_view':subjectData.score_view,'review_question':subjectData.review_question,'proctoring':subjectData.proctoring,'photo_capture':subjectData.photo_capture,'capture_interval':subjectData.capture_interval,'negative_marking':subjectData.negative_marking,'negative_marks':subjectData.negative_marks,'time_remaining_reminder':subjectData.time_remaining_reminder,'exam_switch_alerts':subjectData.exam_switch_alerts,'option_shuffle':subjectData.option_shuffle,'question_marks':subjectData.question_marks,'ph_time':subjectData.ph_time};

    return (
        !loading && subjectData ? <Formik 
        initialValues= {myInitialValues}
        onSubmit= {async (values,actions) => 
        {
            //-----------------Save Values to Database--------------------------------------------
            setMyMsg('');
            saveExamConfig(values,setLoading,setMyMsg,paperId,props,history);
            actions.setSubmitting(false);
            //------------------------------------------------------------------------------------
        }}
        >
        {
            props => {
                const {
                    values,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                } = props;
                return (
                    <div>
                    <div className="container-fluid">
                        <h1 className="mt-4">Configure Test</h1>
                        <div className="breadcrumb mb-4 row">
                            <div className="col-lg-4">
                                <b>Paper Code: {paperCode}</b>
                            </div>
                            <div className="col-lg-4">
                                <b>Paper Name: {paperName}</b>
                            </div>
                            <div className="col-lg-4">
                                <Link to="addTest" className="btn btn-danger btn-sm" style={{float:'right'}}>Go Back</Link>
                            </div>
                        </div>
                        <form id="form-config" method="post" className="form-horizontal" onSubmit={handleSubmit}>
                        <div className="row col-lg-12  animate__animated animate__lightSpeedInLeft animate_slower">
                            <div className="col-lg-12">
                            <table className="table table-bordered" style={{width:"100%"}}>
                                <thead>
                                    <tr bgcolor="aqua">
                                        <th width="10%">Sr. No.</th>
                                        <th width="70%">Description</th>
                                        <th width="20%">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>
                                        Enable Score View
                                        </td>
                                        <td><center>
                                            <label className="switch">
                                                <input type="checkbox" name="score_view" id="score_view" onChange={() => setFieldValue("score_view", !values.score_view ?true:false)} onBlur={handleBlur} checked={values.score_view ? true:false}/>
                                                <span className="slider round"></span>
                                            </label></center>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>
                                        Enable Review Questions
                                        </td>
                                        <td><center>
                                            <label className="switch">
                                                <input type="checkbox" name="review_question" id="review_question" onChange={() => setFieldValue("review_question", !values.review_question ?true:false)} onBlur={handleBlur}checked={values.review_question ? true:false}/>
                                                <span className="slider round"></span>
                                            </label></center>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>
                                        Enable Proctoring
                                        </td>
                                        <td><center>
                                            <label className="switch">
                                                <input type="checkbox" name="proctoring" id="proctoring" onChange={() => setFieldValue("proctoring", !values.proctoring ?true:false)} onBlur={handleBlur} checked={values.proctoring ? true:false}/>
                                                <span className="slider round"></span>
                                            </label></center>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>
                                        Enable Photo Capture
                                        </td>
                                        <td><center>
                                            <label className="switch">
                                                <input type="checkbox" name="photo_capture" id="photo_capture" onChange={() => setFieldValue("photo_capture", !values.photo_capture ?true:false)} onBlur={handleBlur} checked={values.photo_capture ? true:false}/>
                                                <span className="slider round"></span>
                                            </label></center>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>
                                        Enter Capture Interval in Seconds
                                        </td>
                                        <td> <input type="text" className="form-control" id="capture_interval" name="capture_interval" onChange={handleChange} onBlur={handleBlur} value={values.capture_interval}/></td>
                                    </tr>
                                    <tr>
                                        <td>6</td>
                                        <td>
                                        Enable Negative Marking
                                        </td>
                                        <td><center>
                                            <label className="switch">
                                            <input type="checkbox" name="negative_marking" id="negative_marking" onChange={() => setFieldValue("negative_marking", !values.negative_marking ?true:false)} onBlur={handleBlur} checked={values.negative_marking ? true:false}/>
                                            <span className="slider round"></span>
                                            </label></center>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>7</td>
                                        <td>
                                        Enter Negative Marks
                                        </td>
                                        <td> <input type="text" className="form-control" id="negative_marks" name="negative_marks" onChange={handleChange} onBlur={handleBlur} value={values.negative_marks}/></td>
                                    </tr>
                                    <tr>
                                        <td>8</td>
                                        <td>
                                        Time Remaining Reminder
                                        </td>
                                        <td> <input type="text" className="form-control" id="time_remaining_reminder" name="time_remaining_reminder" value={values.time_remaining_reminder} onChange={handleChange} onBlur={handleBlur}/></td>
                                    </tr>
                                    <tr>
                                        <td>9</td>
                                        <td>
                                        Exam Switch Alerts
                                        </td>
                                        <td> <input type="text" className="form-control" id="exam_switch_alerts" name="exam_switch_alerts" value={values.exam_switch_alerts} onChange={handleChange} onBlur={handleBlur} /></td>
                                    </tr>
                                    <tr>
                                        <td>10</td>
                                        <td>
                                        Option Shuffle
                                        </td>
                                        <td><center>
                                            <label className="switch">
                                                <input type="checkbox" name="option_shuffle" id="option_shuffle" onChange={() => setFieldValue("option_shuffle", !values.option_shuffle ?true:false)} onBlur={handleBlur} checked={values.option_shuffle ? true:false}/>
                                                <span className="slider round"></span>
                                            </label></center>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>11</td>
                                        <td>
                                        Show Question Marks
                                        </td>
                                        <td><center>
                                            <label className="switch">
                                                <input type="checkbox" name="question_marks" id="question_marks" onChange={() => setFieldValue("question_marks", !values.question_marks ?true:false)} onBlur={handleBlur} checked={values.question_marks ? true:false}/>
                                                <span className="slider round"></span>
                                            </label></center>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>12</td>
                                        <td>
                                        Enter Physically Handicap Extra Time
                                        </td>
                                        <td> <input type="text" className="form-control" id="ph_time" name="ph_time" value={values.ph_time} onChange={handleChange} onBlur={handleBlur} /></td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3} bgcolor="aqua">
                                            <center>
                                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Submit</button>
                                            </center>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            {myMsg !== '' &&(
                                <div className="alert alert-dark animate__animated animate__tada animate_slower">{myMsg}</div>)}

                            {loading && (
                            <div className="col-lg-12" style={{position:"absolute",top:"40%",left:"40%"}}>
                                <ClipLoader color={'#ff0000'} loading={loading} size={200} />
                            </div>)}

                            </div>
                        </div>
                        </form>
                    </div>
                  </div>
                );
            }
        }
        </Formik>
        :null
    );
};

async function saveExamConfig(values,setLoading,setMyMsg,paperId,props,history)
{
    setLoading(true);
    await API.put('/subject/config/'+paperId, {'score_view':values.score_view,'review_question':values.review_question,'proctoring':values.proctoring,'photo_capture':values.photo_capture,'capture_interval':values.capture_interval,'negative_marking':values.negative_marking,'negative_marks':values.negative_marks,'time_remaining_reminder':values.time_remaining_reminder,'exam_switch_alerts':values.exam_switch_alerts,'option_shuffle':values.option_shuffle,'question_marks':values.question_marks,'ph_time':values.ph_time})
    .then(function (res) 
    {
        setMyMsg(res.data.message);
        if(res.data.status === 'success')
        {
            props.location.state.data.score_view              =   values.score_view;
            props.location.state.data.review_question         =   values.review_question;
            props.location.state.data.proctoring              =   values.proctoring;
            props.location.state.data.photo_capture           =   values.photo_capture;
            props.location.state.data.capture_interval        =   values.capture_interval;
            props.location.state.data.negative_marking        =   values.negative_marking;
            props.location.state.data.negative_marks          =   values.negative_marks;
            props.location.state.data.time_remaining_reminder =   values.time_remaining_reminder;
            props.location.state.data.exam_switch_alerts      =   values.exam_switch_alerts;
            props.location.state.data.option_shuffle          =   values.option_shuffle;
            props.location.state.data.question_marks          =   values.question_marks;
            props.location.state.data.ph_time                 =   values.ph_time;

            let obj = { paperId: props.location.state.paperId,
                        paperCode:props.location.state.paperCode,
                        paperName:props.location.state.paperName,data:props.location.state.data};
            history.replace('/configureTest',{...obj});
        }
        else
        {
            let obj = { paperId: props.location.state.paperId,
                paperCode:props.location.state.paperCode,
                paperName:props.location.state.paperName,data:props.location.state.data};
            history.replace('/configureTest',{...obj});
        }
        setLoading(false);
        setTimeout(()=>{setMyMsg('')}, 10000);
    })
    .catch(function (error) 
    {
        setLoading(false);
        setMyMsg(error.response.data.message);
        setTimeout(()=>{setMyMsg('')}, 10000);
    });   
}

export default ConfigureTest;