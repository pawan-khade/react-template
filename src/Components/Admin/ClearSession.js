import React, { useState, useContext, useEffect } from 'react';
import {ShowContext} from '../../App';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Formik } from 'formik';
import * as Yup from 'yup';
import API from '../../api';
import ClearSessionUserInfo from './ClearSessionUserInfo';


function ClearSession(props)
{
    const {setShow,setMsg}                          =   useContext(ShowContext);
    const [fetchedUserData, setUserData]            =   useState();
    const [flag, setFlag]                           =   useState();

    useEffect(() => {updateFlag(setFlag);}, []);

    if(flag !== undefined)
    {
    return (
        <>
            <Formik
                initialValues={{ enrollNo: "",flag:flag ,instId:"" }}
                onSubmit={(values,{ setSubmitting }) =>
                {
                    fetchUserData(values.enrollNo,setUserData,setShow,setMsg,flag,values.instId);
                }}
                validationSchema={Yup.object().shape({
                    enrollNo:Yup.string()
                    .required("Enrollment Number is Required."),
                    flag: Yup.number(),
                    instId: Yup.string().when('flag', {
                        is:0,
                        then: Yup.string().required("Inst ID is Required")
                      })
                })}
            >
            {
                props => 
                {
                    const {
                        values,
                        touched,
                        errors,
                        handleChange,
                        handleBlur,
                        handleSubmit
                    } = props;
                
                    return (
                        <div>
                            <div className="container-fluid">
                                <h1 className="mt-4">Clear Session</h1>
                                <ol className="breadcrumb mb-4">
                                    <li className="breadcrumb-item active">Clear Session</li>
                                </ol>
                                <div className="col-lg-12">
                                    <Form className="row" onSubmit={handleSubmit}>
                                        <Form.Group className="col-lg-12">
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Enter Enrollment Number" 
                                                id="enrollNo"
                                                value ={values.enrollNo}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            />
                                            {errors.enrollNo && touched.enrollNo && (
                                                <div className="alert alert-info">{errors.enrollNo}</div>
                                            )}
                                        </Form.Group>
                                        {flag === 0 && (<div className="form-group col-lg-12">
                                            <input className="form-control" id="instId" type="instId"
                                                value ={values.instId}
                                                placeholder="Enter Institute ID"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.instId && touched.instId && (
                                                    <div className="alert alert-info">{errors.instId}</div>
                                            )}
                                        </div>)}

                                        <div className="col-lg-12">
                                            <center><Button variant="primary" type="submit">
                                                Submit
                                            </Button></center>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    );
                }
            }
            </Formik>
            <div className="col-lg-12" style={{marginTop:"20px"}}>
                {fetchedUserData !== undefined ?
                    <ClearSessionUserInfo userData={fetchedUserData} setUserData={setUserData}/>
                : null}
            </div>
        </>
    );
    }
    else
    {
        return null;
    }
}

async function fetchUserData(enrollNo,setUserData,setShow,setMsg,flag='1',instId='0000')
{
    await API.get('/user',{params: {"username" : enrollNo,"instId" : instId, "flag" : flag}})
    .then(res =>
    {
        if(res.data.status === 'success')
        {
            setUserData(res.data);
        }
        else
        {
            setUserData(undefined);
            setShow(true);
            setMsg('Unable to fetch Data of specified user...');
        }
    })
    .catch((error) =>
    {
        setUserData(undefined);
        setShow(true);
        setMsg('Unable to fetch Data of specified user...');
    });
}

async function updateFlag(setFlag)
{
  const res = await API.get('/settings',{params: {"type":"login"}});
  if(res.data.status==='success')
  {
      setFlag(res.data.flag);
  }
}

export default ClearSession;
