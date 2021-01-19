import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {UserContext} from '../../App';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Formik } from 'formik';
import * as Yup from 'yup';
import API from '../../api';
import ClearSessionUserInfo from './ClearSessionUserInfo';


function ClearSession(props)
{
    const {userType, setUserType}                   =   useContext(UserContext); 
    const [fetchedUserData, setUserData]            =   useState();
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
        <>
            <Formik
                initialValues={{ enrollNo: ""}}
                onSubmit={(values,{ setSubmitting }) =>
                {
                    let userData = fetchUserData(values.enrollNo,setUserData);
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
                                            <Button variant="primary" type="submit">
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
            <div class="col-lg-12" style={{marginTop:"20px"}}>
                {fetchedUserData !== undefined ?
                    <ClearSessionUserInfo userData={fetchedUserData} setUserData={setUserData}/>
                : null}
            </div>
        </>
    );
}

async function fetchUserData(enrollNo,setUserData)
{
    const res = await API.get('/user',{params: {"username" : enrollNo}});
    if(res.data.status === 'success')
    {
        setUserData(res.data);
    }
    else
    {
        setUserData(undefined);
    }
}

export default ClearSession;
