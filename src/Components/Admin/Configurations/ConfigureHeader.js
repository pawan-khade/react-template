import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Formik } from 'formik';
import * as Yup from 'yup';
import API from '../../../api';
import {LogoContext} from '../../../App';
import ClipLoader from "react-spinners/ClipLoader";

function ConfigureHeader(props) 
{
    const [headerData ,setHeaderData]   =   useState(false);
    const [msg ,setMsg]                 =   useState('');
    let [loading, setLoading]           =   useState(false);
    const {logoVal, setLogoVal}         =   useContext(LogoContext);

    return(
        <>
            <Formik
            initialValues={{ orgName: "",file:""}}
            onSubmit={async (values,actions) =>
            {
                await configHeader(values.orgName,values.file,setHeaderData,setMsg,setLoading,setLogoVal);
                actions.setSubmitting(false);
                actions.resetForm({
                        values: {
                        orgName: '',
                        file: ''
                        },
                });
            }}
            validationSchema={Yup.object().shape({
                orgName:Yup.string()
                .required("Organization Name is Required for Configuring Header Text."),
                file:Yup.string()
                .required("Uploading Organization Logo is Mandatory.")
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
                        isSubmitting,
                        handleBlur,
                        handleSubmit,
                        setFieldValue
                    } = props;

                    return (
                        <div>
                            <div className="container-fluid">
                                <h1 className="mt-4">Configure Header</h1>
                                <ol className="breadcrumb mb-4">
                                    <li className="breadcrumb-item active">Configure Header</li>
                                </ol>
                                <div className="col-lg-12 animate__animated animate__lightSpeedInLeft animate_slower">
                                    
                                    <Form className="col-lg-12 row" onSubmit={handleSubmit}>
                                        <Form.Group className="col-lg-6 row">
                                            <Form.Control 
                                                type="text" 
                                                id="orgName" 
                                                placeholder="Enter Organization Name" 
                                                className="col-lg-12"
                                                value ={values.orgName}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            />
                                            {errors.orgName && touched.orgName && (
                                                <div className="alert alert-info col-lg-12">{errors.orgName}</div>
                                            )}
                                        </Form.Group>
                                        <div className="col-lg-1"></div>
                                        
                                        <Form.Group className="col-lg-5 row">
                                            <center>
                                            <input 
                                                id="file" 
                                                name="file" 
                                                type="file" 
                                                onChange={(event) => {
                                                    setFieldValue("file", event.currentTarget.files[0]);
                                                }} 
                                                onBlur={handleBlur}
                                                className="form-control" 
                                            />
                                            {errors.file && touched.file && (
                                                <div className="alert alert-info col-lg-12">{errors.file}</div>
                                            )}
                                            </center>
                                        </Form.Group>
                                        
                                        <div className="col-lg-12">
                                            <center><Button variant="primary" type="submit" disabled={isSubmitting}>Submit</Button></center>
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
                {headerData && !loading ? 
                    <div className="alert alert-danger animate__animated animate__tada animate_slower" role="alert">
                        {msg}
                    </div>
                : 
                    <div className="col-lg-12" style={{position:"absolute",top:"40%",left:"40%"}}>
                        <ClipLoader color={'#ff0000'} loading={loading} size={200} />
                    </div>
                }
            </div>
        </>
    );
}

async function configHeader(orgName,file,setHeaderData,setMsg,setLoading,setLogoVal)
{
    setLoading(true);
    let fd = new FormData();
    fd.append("type", 'headerconfig');
    fd.append("orgName", orgName);
    fd.append("file", file);

    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }

    await API.post('/configurations',fd,config)
    .then(function (res) 
    {
        if(res.data.status === 'success')
        {
            setHeaderData(true);
            setMsg(res.data.message);
            setLogoVal(Math.random());
            setTimeout(() => {
                setHeaderData(false);
            }, 10000);
        }
        else
        {
            setMsg(res.data.message);
            setHeaderData(true);
        }
        setLoading(false);
    })
    .catch(function (error) 
    {
        setHeaderData(true);
        setLoading(false);
        setMsg(error.response.data.message);
    });
}

export default ConfigureHeader;