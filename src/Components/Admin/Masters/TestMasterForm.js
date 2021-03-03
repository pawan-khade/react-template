import React, {useState,useEffect,useContext} from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import API from '../../../api';
import {ShowContext} from '../../../App';
import ClipLoader from "react-spinners/ClipLoader";
import DateTimePicker from 'react-datetime-picker';

const TestMasterForm = (props) => {
    const [fromDate, onFromDateChange]          = useState(new Date());
    const [toDate, onToDateChange]              = useState(new Date());
    const [myMsg, setMyMsg]                     = useState('');
    const [subjects,setSubjects]                = useState();
    const [loading, setLoading]                 = useState(false);
    const myInitialValues                       = { paperId: '', examName:'',marks:'',questions:'',durations:'',fromDate:fromDate,toDate:toDate};
    const {setShow,setMsg}                      = useContext(ShowContext);

    useEffect(() => {
        getSubjects(setSubjects,setShow,setMsg,setLoading);
    },[setShow,setMsg]);
        
    return (
        !loading && subjects!== undefined ? <Formik 
        initialValues= {myInitialValues}
        onSubmit= {async (values,actions) => 
        {
            setMyMsg('');
            if(!fromDate)
            {
                setMyMsg('Invalid From Date Format');
                return;
            }
            if(!toDate)
            {
                setMyMsg('Invalid To Date Format');
                return;
            }

            saveTest(values,setLoading,setShow,setMsg,setMyMsg,props.setMyList,props.myList,fromDate,toDate);
            actions.setSubmitting(false);
            actions.resetForm({
            values: {
                        paperId: '', examName:'',marks:'',questions:'',durations:'',fromDate:'',toDate:''
                    },
            });
        }}
        validationSchema = {Yup.object({
            paperId: Yup.string()
            .required("Subject is Required"),
            examName: Yup.string()
            .required("Exam Name is Required."),
            marks: Yup.number()
            .required("Marks is Required."),
            questions: Yup.number()
            .required("Total Number of Questions is Required."),
            durations: Yup.number()
            .required("Total Duration in Minutes is Required."),
            fromDate: Yup.string()
            .required("Exam Start Date time is Required."),
            toDate: Yup.string()
            .required("Exam End Date time is Required."),
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
                    <form id="form-Prog" method="post" className="form-horizontal" onSubmit={handleSubmit}>
                        <div className="card mb-4">
                            <div className="card-header">
                                <i className="fas fa-address-card mr-1"/>
                                Add Test Form
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
                                                {
                                                subjects.map(subject => 
                                                (
                                                    <option key={subject.id} value={subject.id}>
                                                    ({subject.paper_code}) {subject.paper_name}
                                                    </option>
                                                ))
                                                }
                                            </select>

                                            {errors.paperId ? <div className="alert alert-info">{errors.paperId}</div> : null}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="col-lg-12 row">
                                        <div className="col-lg-4">
                                            Enter Exam Name
                                        </div>
                                        <div className="col-lg-8">
                                            <input type="text" id="examName" name="examName" onChange={handleChange} value={values.examName} onBlur={handleBlur} className="form-control" placeholder="Enter Exam Name..." />

                                            {errors.examName ? <div className="alert alert-info">{errors.examName}</div> : null}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-lg-12 row">
                                        <div className="col-lg-4">
                                            Total Marks
                                        </div>
                                        <div className="col-lg-8">
                                            <input type="text" id="marks" name="marks" onChange={handleChange} value={values.marks} onBlur={handleBlur} className="form-control" placeholder="Enter Total Marks..." />

                                            {errors.marks ? <div className="alert alert-info">{errors.marks}</div> : null}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-lg-12 row">
                                        <div className="col-lg-4">
                                            Total Questions
                                        </div>
                                        <div className="col-lg-8">
                                            <input type="text" id="questions" name="questions" onChange={handleChange} value={values.questions} onBlur={handleBlur} className="form-control" placeholder="Enter Total Questions..." />

                                            {errors.questions ? <div className="alert alert-info">{errors.questions}</div> : null}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="col-lg-12 row">
                                        <div className="col-lg-4">
                                            Exam Duration
                                        </div>
                                        <div className="col-lg-8">
                                            <input type="text" id="durations" name="durations" onChange={handleChange} value={values.durations} onBlur={handleBlur} className="form-control" placeholder="Enter Total Duration in Minutes..." />

                                            {errors.durations ? <div className="alert alert-info">{errors.durations}</div> : null}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="col-lg-12 row">
                                        <div className="col-lg-4">
                                            From Date
                                        </div>
                                        <div className="col-lg-8">
                                        <DateTimePicker onChange={onFromDateChange} value={fromDate} id="fromDate" name="fromDate" className="form-control" format="yyyy-MM-dd HH:mm:ss"/>

                                            {errors.fromDate ? <div className="alert alert-info">{errors.fromDate}</div> : null}
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="col-lg-12 row">
                                        <div className="col-lg-4">
                                            To Date
                                        </div>
                                        <div className="col-lg-8">
                                        <DateTimePicker onChange={onToDateChange} value={toDate} id="toDate" name="toDate" className="form-control" format="yyyy-MM-dd HH:mm:ss"/>

                                            {errors.toDate ? <div className="alert alert-info">{errors.toDate}</div> : null}
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
                                    <div className="col-lg-12" style={{position:"absolute",top:"40%",left:"40%"}}>
                                        <ClipLoader color={'#ff0000'} loading={loading} size={200} />
                                    </div>)}
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

async function getSubjects(setSubjects,setShow,setMsg,setLoading)
{
    setLoading(true);
    await API.get('/subject',{params: {"type":"all"}})
        .then((res) => 
        {
            if(res.data.status === 'success')
            {
                setSubjects(res.data.data);
                setLoading(false);
            }
            else
            {
                setShow(true);
                setMsg('Problem Fetching Data from Server');
                setLoading(false);
            }
        });
}


async function saveTest(values,setLoading,setShow,setMsg,setMyMsg,setMyList,myList,fromDate,toDate)
{
    setLoading(true);
    let paperId     = values.paperId;
    let examName    = values.examName;
    let marks       = values.marks;
    let questions   = values.questions;
    let durations   = values.durations;


    await API.put('/subject/'+paperId,{'type':'test','exam_name':examName,'marks':marks,'questions':questions,'durations':durations,'from_date':fromDate,'to_date':toDate})
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
            }
        })
        .catch(function (error) {
            setMyMsg(error.response.data.message);
            setLoading(false);
        });

}

export default TestMasterForm;