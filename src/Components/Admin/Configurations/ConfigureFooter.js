import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Formik } from 'formik';
import * as Yup from 'yup';
import API from '../../../api';
import {FooterContext} from '../../../App';
import ClipLoader from "react-spinners/ClipLoader";

function ConfigureFooter(props) 
{
    const [footerData ,setFooterData]   =   useState(false);
    const [msg ,setMsg]                 =   useState('');
    let [loading, setLoading]           =   useState(false);
    const {footerVal, setFooterVal}     = useContext(FooterContext);
    
    return(
        <>
            <Formik
            initialValues={{ orgName: ""}}
            onSubmit={async (values,actions) =>
            {
                await updateFooterData(values.orgName,setFooterData,setMsg,setLoading,setFooterVal);
                actions.setSubmitting(false);
                actions.resetForm({
                        values: {
                        orgName: ''
                        },
                });
            }}
            validationSchema={Yup.object().shape({
                orgName:Yup.string()
                .required("Organization Name is Required for Configuring Footer Text.")
            })}
            >
            {
                props => 
                {
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
                        <div>
                            <div className="container-fluid">
                                <h1 className="mt-4">Configure Footer</h1>
                                <ol className="breadcrumb mb-4">
                                    <li className="breadcrumb-item active">Configure Footer</li>
                                </ol>
                                <div className="col-lg-12 animate__animated animate__lightSpeedInLeft animate_slower">
                                    <Form className="col-lg-12 row" onSubmit={handleSubmit}>
                                        <Form.Group className="col-lg-10 row">
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
                                        <div className="col-lg-2">
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
                {footerData && !loading ? 
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

async function updateFooterData(orgName,setFooterData,setMsg,setLoading,setFooterVal)
{
    setLoading(true);
    const res = await API.put('/configurations',{"orgName" : orgName,"type":"footerconfig"});
    if(res.data.status === 'success')
    {
        setFooterData(true);
        setFooterVal(Math.random());
        setTimeout(() => {
            setFooterData(false);
        }, 10000);
    }
    else
    {
        setFooterData(false);
        setFooterVal(Math.random());
    }
    setLoading(false);
    setMsg(res.data.message);
}

export default ConfigureFooter;