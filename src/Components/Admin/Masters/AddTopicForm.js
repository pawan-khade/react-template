import React, {useState,useContext} from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import API from '../../../api';
import {ShowContext} from '../../../App';

const AddTopicForm = (props) => {
    const [myMsg, setMyMsg]         = useState('');
    const [loading, setLoading]     = useState(false);
    const myInitialValues           = { paperId: '', topic: '', subTopic:'' ,questType:'' ,questions:'', marks:''};
    const {setShow,setMsg}          = useContext(ShowContext);
    const paperId                   = props.paperId;
    const paperCode                 = props.paperCode;
    const paperName                 = props.paperName;

    return (
        !loading ? <Formik 
        initialValues= {myInitialValues}
        onSubmit= {async (values,actions) => 
        {
            console.log(values);
            saveTopics(values,setLoading,setShow,setMsg,setMyMsg,props.setMyList,props.myList);
            actions.setSubmitting(false);
            actions.resetForm({
            values: {
                        paperId: '', topic: '', subTopic:'' ,questType:'' ,questions:'', marks:''
                    },
            });
        }}
        validationSchema = {Yup.object({
            paperId: Yup.number()
            .required("Subject is Required"),
            topic: Yup.number()
            .required("Topic number is Required."),
            subTopic: Yup.number(),
            questType: Yup.string(),
            questions: Yup.number()
            .required("Number of Questions are Required"),
            marks: Yup.number()
            .required('Marks Per Question is Required'),
        })}
        >
        {
            props => {
                const {
                    values,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit
                } = props;
                return (
                <div className="col-xl-8">
                    <form id="form-Topic" method="post" className="form-horizontal" onSubmit={handleSubmit}>
                        <div className="card mb-4">
                            <div className="card-header">
                                <i className="fas fa-address-card mr-1"/>
                                Add Topics Form
                            </div>
                            <div className="card-body">
                                <div className="form-group">
                                    <div className="col-lg-12 row">
                                        <div className="col-lg-4">
                                            Select Subject
                                        </div>
                                        <div className="col-lg-8">
                                            <select id="paperId" name="paperId" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.paperId}>
                                                <option value="">Select Subject</option>
                                                <option value={paperId}>({paperCode}) {paperName}</option>
                                            </select>

                                            {errors.paperId ? <div className="alert alert-info">{errors.paperId}</div> : null}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-lg-12 row">
                                        <div className="col-lg-4">
                                            Enter Topic Number
                                        </div>
                                        <div className="col-lg-8">
                                            <input type="text" id="topic" name="topic" onChange={handleChange} value={values.topic} onBlur={handleBlur} className="form-control" placeholder="Enter Topic Number..." />

                                            {errors.topic ? <div className="alert alert-info">{errors.topic}</div> : null}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-lg-12 row">
                                        <div className="col-lg-4">
                                            Enter Sub Topic Number
                                        </div>
                                        <div className="col-lg-8">
                                            <input type="text" id="subTopic" name="subTopic" onChange={handleChange} value={values.subTopic} onBlur={handleBlur} className="form-control" placeholder="Enter Sub Topic Number..." />

                                            {errors.subTopic ? <div className="alert alert-info">{errors.subTopic}</div> : null}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-lg-12 row">
                                        <div className="col-lg-4">
                                            Select Question Type
                                        </div>
                                        <div className="col-lg-8">
                                            <select id="questType" name="questType" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.questType}>
                                                <option value="">Select Question Type</option>
                                                <option value="R">R</option>
                                                <option value="U">U</option>
                                                <option value="A">A</option>
                                            </select> 

                                            {errors.questType ? <div className="alert alert-info">{errors.questType}</div> : null}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-lg-12 row">
                                        <div className="col-lg-4">
                                            Enter Number of Questions
                                        </div>
                                        <div className="col-lg-8">
                                            <input type="text" id="questions" name="questions" onChange={handleChange} value={values.questions} onBlur={handleBlur} className="form-control" placeholder="Enter Number of Questions..." />

                                            {errors.questions ? <div className="alert alert-info">{errors.questions}</div> : null}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-lg-12 row">
                                        <div className="col-lg-4">
                                            Enter Marks/Question
                                        </div>
                                        <div className="col-lg-8">
                                            <input type="text" id="marks" name="marks" onChange={handleChange} value={values.marks} onBlur={handleBlur} className="form-control" placeholder="Enter Marks Per Question..." />

                                            {errors.marks ? <div className="alert alert-info">{errors.marks}</div> : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="form-group">
                                    <center>
                                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Submit</button>
                                    </center>
                                </div>
                                
                                {myMsg !== '' &&(
                                    <div className="alert alert-dark animate__animated animate__tada animate_slower">{myMsg}</div>)}

                                {loading && (
                                    <div className="custom-loader"></div>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
                );
            }
        }
        </Formik>
        :null
    );
};


async function saveTopics(values,setLoading,setShow,setMsg,setMyMsg,setMyList,myList)
{
    setLoading(true);
    let paperId     = values.paperId;
    let topic       = values.topic;
    let subTopic    = values.subTopic;
    let questType   = values.questType;
    let questions   = values.questions;
    let marks       = values.marks;

    await API.post('/subject/topic',{'paperId':paperId,'topic':topic,'subTopic':subTopic,'questType':questType,'questions':questions,'marks':marks})
        .then((res) => 
        {
            if(res.data.status === 'success')
            {
                setMyMsg(res.data.message);
                setLoading(false);
                setMyList(!myList);
            }
            else
            {
                setMyMsg(res.data.message);
                setLoading(false);
                setMyList(!myList);
            }
        })
        .catch(function (error) {
            setMyMsg(error.response.data.message);
            setLoading(false);
        });
}

export default AddTopicForm;