import React, { useState , useEffect, useContext  } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import API from '../api';
import ReCAPTCHA   from "react-google-recaptcha";
import { useHistory } from 'react-router-dom';
import {UserContext} from '../App';

export default function Login(props)
{
  const {currentUser, setCurrentUser}              = useContext(UserContext);
  let history                                      = useHistory();
  const [flag, setFlag]                            =   useState();
  const [myRecaptcha, setMyRecaptcha]              =   useState();
  const [myMsg, setMyMsg]                          =   useState();

  useEffect(() => {updateFlag(setFlag);}, []);

  return (
    flag !== undefined && <Formik
        initialValues={{ username: "", password: "", flag:flag ,instId:"" }}
        onSubmit={(values,{ setSubmitting }) =>
        {
          if (myRecaptcha !== undefined){
            checkLogin(values.username,values.password,values.instId,flag,myRecaptcha,setMyMsg,history,setCurrentUser);
          }
        }}
        validationSchema={Yup.object().shape({
            username:Yup.string()
            .required("Username Required"),
            password: Yup.string()
            .required("Password is Required"),
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

                <div>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4">GudExams Login</h3></div>
                                    <div className="card-body" >
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <label>User Name</label>

                                                <input className="form-control py-4" id="username" type="text"
                                                value ={values.userame}
                                                placeholder="Enter User Name"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                class1name={errors.username && touched.username && "error"}
                                                />

                                                {errors.username && touched.username && (
                                                    <div className="alert alert-info">{errors.username}</div>
                                                )}

                                            </div>
                                            <div className="form-group">
                                                <label className="form-group">Password</label>

                                                <input className="form-control py-4" id="password" type="password"
                                                value ={values.password}
                                                placeholder="Enter password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                class1name={errors.password && touched.password && "error"}
                                                />

                                                {errors.password && touched.password && (
                                                    <div className="alert alert-info">{errors.password}</div>
                                                )}
                                            </div>

                                            {flag === 0 && (<div className="form-group">
                                                <label className="form-group">Inst ID</label>

                                                <input className="form-control py-4" id="instId" type="instId"
                                                value ={values.instId}
                                                placeholder="Enter Institute ID"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                class1name={errors.instId && touched.instId && "error"}
                                                />

                                                {errors.instId && touched.instId && (
                                                    <div className="alert alert-info">{errors.instId}</div>
                                                )}
                                            </div>)}

                                            <ReCAPTCHA name="myRecaptcha" id="myRecaptcha" sitekey="6LceEOcZAAAAAIc_LC_IgqVWIAEiB1PriQGqMtc5" onChange={(value) => setMyRecaptcha(value)}/>

                                            <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <button className="btn btn-primary" type="submit" id="submit" disabled={isSubmitting}>Login</button>
                                            </div><br/>

                                            {myMsg !== undefined && (
                                                <div className="alert alert-success">{myMsg}</div>
                                            )}

                                        </form>
                                    </div>
                                    <div className="card-footer text-center">
                                        <div className="small"><a href="/register">Need an account? Sign up!</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                      </div>
                </div>
            );
        }
    }
    </Formik>
  );
}

async function checkLogin(username,password,instId,flag,myRecaptcha,setMyMsg,history,setCurrentUser)
{
    await API.post('/login',{"username":username,"password":password,"inst_id":instId,"flag":flag,"myRecaptcha":myRecaptcha}).then(res =>
    {
        
            if(res.data.status === 'success')
            {
                localStorage.setItem("token",JSON.stringify(res.data.token));
                if(res.data.data.role === 'STUDENT')
                {
                    setCurrentUser(res.data.data);
                    history.replace({ pathname: '/studenthome',state:{currentUser: res.data.data}});
                }
                else if(res.data.data.role === 'ADMIN')
                {
                    setCurrentUser(res.data.data);
                    history.replace({ pathname: '/adminhome',state:{currentUser: res.data.data}});
                }
            }
            else
            {
                setMyMsg(res.data.message);
            }
    })
}

async function updateFlag(setFlag)
{
  const res = await API.get('/settings',{params: {"type":"login"}});
  if(res.data.status==='success')
  {
      setFlag(res.data.flag);
  }
}
