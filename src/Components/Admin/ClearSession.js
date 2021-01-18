import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {UserContext} from '../../App';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Formik } from 'formik';
import * as Yup from 'yup';
import API from '../../api';


function ClearSession(props)
{
    const {userType, setUserType}                   =   useContext(UserContext); 
    const [sessionNotLoaded, setSessionNotLoaded]   =   useState(false);
    let history                                     =   useHistory();

    useEffect(() => 
    {
        if(props.location.state)
        {
            setUserType(props.location.state.userType);
        }
        else
        {
            history.replace('/login');
        }
    });

    
    return (
        <Formik
            initialValues={{ enrollNo: ""}}
            onSubmit={(values,{ setSubmitting }) =>
            {
                console.log(values.enrollNo);
            }}
            validationSchema={Yup.object().shape({
                enrollNo:Yup.string()
                .required("Enrollment Number is Required.")
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
                            <h1 className="mt-4">Clear Session</h1>
                            <ol className="breadcrumb mb-4">
                                <li className="breadcrumb-item active">Clear Session</li>
                            </ol>
                            <div className="col-lg-12">
                                <Form className="row" onSubmit={handleSubmit}>
                                    <Form.Group className="col-lg-10">
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
                                    <div className="col-lg-2">
                                        <Button variant="primary" type="submit" disabled={sessionNotLoaded}>
                                            Submit
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                );
            }
        }
        </Formik>
    );
}

export default ClearSession;
