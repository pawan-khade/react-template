import React, {useState,useEffect,useContext} from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import API from '../../../api';
import {ShowContext} from '../../../App';

const ProgramMasterForm = (props) => {
    const [myMsg, setMyMsg]         = useState('');
    const [loading, setLoading]     = useState(false);
    const myFlag                    = useFlag(setLoading);
    const myInitialValues           = { progCode: '', progName: '', flag:myFlag , instId:''};
    const {setShow,setMsg}          = useContext(ShowContext);
    const [insts,setInsts]          = useState([]);
    const [value, setValue]         = useState();

    useEffect(() => {
        if(myFlag !== undefined && myFlag !== 1)
        {
            getInsts(setInsts,setShow,setMsg);
        }
    },[myFlag,setShow,setMsg]);

    return (
        !loading && myFlag !== undefined ? <Formik 
        initialValues= {myInitialValues}
        onSubmit= {async (values,actions) => 
        {
            setMyMsg('');
            registerProgram(values.progCode, values.progName,setLoading,setMyMsg,props.setMyList,props.myList,values.flag,values.instId);
            actions.setSubmitting(false);
            actions.resetForm({
            values: {
                        progCode: '', progName: '', flag:myFlag, instId:''
                    },
            });
        }}
        validationSchema = {Yup.object({
            progCode: Yup.string()
            .required("Program Code is Required"),
            progName: Yup.string()
            .required("Program Name is Required."),
            flag: Yup.number(),
            instId: Yup.string().when('flag', {
                is:0,
                then: Yup.string().required("Inst ID is Required")
            })
        })}
        >
        {
            props => {
                const {
                    values,
                    touched,
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
                                Add Program Form
                            </div>
                            <div className="card-body">
                                    <div className="form-group">
                                        <div className="col-lg-12 row">
                                            <div className="col-lg-4">
                                                Enter Program Code
                                            </div>
                                            <div className="col-lg-8">
                                                <input type="text" id="progCode" name="progCode" onChange={handleChange} value={values.progCode} onBlur={handleBlur} className="form-control" placeholder="Enter Program Code..." />

                                                {errors.progCode ? <div className="alert alert-info">{errors.progCode}</div> : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-lg-12 row">
                                            <div className="col-lg-4">
                                                Enter Program Name
                                            </div>
                                            <div className="col-lg-8">
                                                <input type="text" id="progName" name="progName" onChange={handleChange} value={values.progName} onBlur={handleBlur} className="form-control" placeholder="Enter Program Name..." />

                                                {errors.progName ? <div className="alert alert-info">{errors.progName}</div> : null}
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
                                            <select id="instId" name="instId" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.instId}>
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

async function registerProgram(progCode,progName,setLoading,setMyMsg,setMyList,myList,flag,instId)
{
    setLoading(true);
    await API.post('/program', {'progCode': progCode,'progName': progName,'flag':flag,'instId':instId})
    .then(function (res) 
    {
        setLoading(false);
        setMyMsg(res.data.message);
        setMyList(!myList);
        setTimeout(()=>{setMyMsg('')}, 10000);
    })
    .catch(function (error) 
    {
        setLoading(false);
        setMyMsg(error.response.data.message);
        setTimeout(()=>{setMyMsg('')}, 10000);
    });   
}

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

export default ProgramMasterForm;