import React, {useState,useEffect,useContext} from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import API from '../../../api';
import {ShowContext} from '../../../App';

const SubjectMasterForm = (props) => {
    const [myMsg, setMyMsg]         = useState('');
    const [loading, setLoading]     = useState(false);
    const myFlag                    = useFlag(setLoading);
    const myInitialValues           = { paperCode: '', paperName: '', flag:myFlag , programId:'', instId:'',semester:''};
    const {setShow,setMsg}          = useContext(ShowContext);
    const [insts,setInsts]          = useState([]);
    const [programs,setPrograms]    = useState([]);

    useEffect(() => {
        if(myFlag !== undefined && myFlag !== 1)
        {
            getInsts(setInsts,setShow,setMsg);
        }
        getPrograms(setPrograms,myFlag,setShow,setMsg);
    },[myFlag,setShow,setMsg]);

    return (
        !loading && myFlag !== undefined ? <Formik 
        initialValues= {myInitialValues}
        onSubmit= {async (values,actions) => 
        {
            setMyMsg('');
            saveSubject(values,setLoading,setShow,setMsg,setMyMsg,props.setMyList,props.myList);
            actions.setSubmitting(false);
            actions.resetForm({
            values: {
                        paperCode: '', paperName: '', flag:myFlag , programId:'', instId:'',semester:''
                    },
            });
        }}
        validationSchema = {Yup.object({
            paperCode: Yup.string()
            .required("Paper Code is Required"),
            paperName: Yup.string()
            .required("Paper Name is Required."),
            flag: Yup.number(),
            programId: Yup.number()
            .required("Program is Required"),
            instId: Yup.string().when('flag', {
                is:0,
                then: Yup.string().required("Inst ID is Required")
            }),
            semester: Yup.number()
            .required('Semester is Required'),
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
                                Add Subject Form
                            </div>
                            <div className="card-body">
                                    <div className="form-group">
                                        <div className="col-lg-12 row">
                                            <div className="col-lg-4">
                                                Enter Paper Code
                                            </div>
                                            <div className="col-lg-8">
                                                <input type="text" id="paperCode" name="paperCode" onChange={handleChange} value={values.paperCode} onBlur={handleBlur} className="form-control" placeholder="Enter Paper Code..." />

                                                {errors.paperCode ? <div className="alert alert-info">{errors.paperCode}</div> : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-lg-12 row">
                                            <div className="col-lg-4">
                                                Enter Program Name
                                            </div>
                                            <div className="col-lg-8">
                                                <input type="text" id="paperName" name="paperName" onChange={handleChange} value={values.paperName} onBlur={handleBlur} className="form-control" placeholder="Enter Program Name..." />

                                                {errors.paperName ? <div className="alert alert-info">{errors.paperName}</div> : null}
                                            </div>
                                        </div>
                                    </div>

                                    {myFlag === 0 && insts.length > 0 && (
                                    <div className="form-group">
                                        <div className="col-lg-12 row">
                                            <div className="col-lg-4">
                                                Enter Inst Id
                                            </div>
                                            <div className="col-lg-8">
                                            <select id="instId" name="instId" className="form-control" onChange={(e) => {
                                                setLoading(true);
                                                handleChange(e);
                                                getPrograms1(setPrograms,e.target.value,setShow,setMsg);
                                                setLoading(false);
                                            }} onBlur={handleBlur} value={values.instId}>
                                                <option value="">Select Institute</option>
                                                {
                                                insts.map(inst => 
                                                (
                                                    <option key={inst.uid} value={inst.uid}>
                                                    ({inst.username}) {inst.college_name}
                                                    </option>
                                                ))
                                                }
                                            </select>

                                            {errors.instId ? <div className="alert alert-info">{errors.instId}</div> : null}
                                            </div>
                                        </div>
                                    </div>)}

                                    <div className="form-group">
                                        <div className="col-lg-12 row">
                                            <div className="col-lg-4">
                                                Select Program
                                            </div>
                                            <div className="col-lg-8">
                                            <select id="programId" name="programId" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.programId}>
                                                <option value="">Select Program</option>
                                                {
                                                programs.map(program => 
                                                (
                                                    <option key={program.id} value={program.id}>
                                                    ({program.program_code}) {program.program_name}
                                                    </option>
                                                ))
                                                }
                                            </select>

                                            {errors.programId ? <div className="alert alert-info">{errors.programId}</div> : null}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="col-lg-12 row">
                                            <div className="col-lg-4">
                                                Select Semester
                                            </div>
                                            <div className="col-lg-8">
                                            <select id="semester" name="semester" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.semester}>
                                                <option value="">Select Semester</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                            </select>

                                            {errors.semester ? <div className="alert alert-info">{errors.semester}</div> : null}
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

function useFlag(setLoading)
{
    const [flag, setFlag]   =    useState();

    useEffect(() => {updateFlag();}, []);

    async function updateFlag()
    {
        setLoading(true);
        const res = await API.get('/settings',{params: {"type":"login"}});
        if(res.data.status==='success')
        {
            setFlag(res.data.flag);
            setLoading(false);
        }
    }

    return flag;
}

async function getInsts(setInsts,setShow,setMsg)
{
  await API.get('/user',{params: {"role":"EADMIN"}})
  .then((res) => {
    if(res.data.status === 'success')
    {
      setInsts(res.data.data);
    }
    else
    {
      setShow(true);
      setMsg('Problem Fetching Data from Server');
    }
  });
}

async function getPrograms(setPrograms,myFlag,setShow,setMsg)
{
    await API.get('/program',{params: {"type":"all"}})
        .then((res) => 
        {
            if(res.data.status === 'success')
            {
                setPrograms(res.data.data);
            }
            else
            {
                setShow(true);
                setMsg('Problem Fetching Data from Server');
            }
        });
}

async function getPrograms1(setPrograms,instUid,setShow,setMsg)
{
    await API.get('/program',{params: {"type":"instUid","instUid":instUid}})
        .then((res) => 
        {
            if(res.data.status === 'success')
            {
                setPrograms(res.data.data);
            }
            else
            {
                setShow(true);
                setMsg('Problem Fetching Data from Server');
            }
        });
}

async function saveSubject(values,setLoading,setShow,setMsg,setMyMsg,setMyList,myList)
{
    setLoading(true);
    let paperCode   = values.paperCode;
    let paperName   = values.paperName;
    let programId   = values.programId;
    let instId      = values.instId;
    let semester    = values.semester;

    await API.post('/subject',{'paperCode':paperCode,'paperName':paperName,'programId':programId,'instId':instId,'semester':semester})
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

export default SubjectMasterForm;