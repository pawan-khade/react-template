import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Formik } from 'formik';
import * as Yup from 'yup';
import API from '../../../api';

function ConfigureFooter(props) 
{
    const [footerData ,setFooterData]   =   useState(false);
    const [msg ,setMsg]                 =   useState('');
    
    return(
        <>
            <Formik
            initialValues={{ orgName: ""}}
            onSubmit={(values,{ setSubmitting }) =>
            {
                updateFooterData(values.orgName,setFooterData,setMsg);
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
                                <div className="col-lg-12">
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
                                            <center><Button variant="primary" type="submit">Submit</Button></center>
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
                {footerData ? 
                <div className="alert alert-danger" role="alert">
                    {msg}
                </div>
                : null}
            </div>
        </>
    );
}

async function updateFooterData(orgName,setFooterData,setMsg)
{
    const res = await API.put('/configurations',{"orgName" : orgName,"type":"footerconfig"});
    if(res.data.status === 'success')
    {
        setFooterData(true);
        setTimeout(() => {
            setFooterData(false);
        }, 10000);
    }
    else
    {
        setFooterData(false);
    }
    setMsg(res.data.message);
}

export default ConfigureFooter;