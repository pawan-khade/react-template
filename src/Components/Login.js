import React, { useState , useEffect, useContext, createRef } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import API from '../api';
import ReCAPTCHA   from "react-google-recaptcha";
import { useHistory } from 'react-router-dom';
import {UserContext} from '../App';
import ClipLoader from "react-spinners/ClipLoader";

window.recaptchaOptions = {
    useRecaptchaNet: true,
  };

export default function Login(props)
{
  const {currentUser, setCurrentUser}               =    useContext(UserContext);
  let history                                       =    useHistory();
  const [myRecaptcha, setMyRecaptcha]               =    useState();
  const [myMsg, setMyMsg]                           =    useState();
  let [loading, setLoading]                         =    useState(true);
  const flag                                        =    useFlag(setLoading);
  const siteKey                                     =    process.env.REACT_APP_CAPTCHA_SITE_KEY;
  const recaptchaRef                                =    createRef();

  return (
    !loading ?
        flag !== undefined && <Formik
        initialValues={{ username: "", password: "", flag:flag ,instId:"" }}
        onSubmit={async (values,actions) =>
        {
          if (myRecaptcha !== undefined){
            await checkLogin(values.username,values.password,values.instId,flag,myRecaptcha,setMyMsg,history,setCurrentUser,recaptchaRef);
            actions.setSubmitting(false);
            actions.resetForm({
                values: {
                  username: '',
                  password: '',
                  flag: flag,
                  instId:''
                },
            });
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

                <div style={{marginBottom:"30px"}}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6">
                                <div className="card shadow-lg border-0 rounded-lg mt-10 animate__animated animate__backInDown animate__slow">
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4"><b>Login</b></h3></div>
                                    <div className="card-body" >
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <label><b>User Name</b></label>

                                                <input className="form-control py-4" id="username" type="text"
                                                name="username"
                                                value ={values.username}
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
                                                <label className="form-group"><b>Password</b></label>

                                                <input className="form-control py-4" id="password" name="password"
                                                type="password"
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
                                                <label className="form-group"><b>Inst ID</b></label>

                                                <input className="form-control py-4" id="instId" name="instId" type="instId"
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

                                            <ReCAPTCHA name="myRecaptcha" id="myRecaptcha" sitekey={siteKey} badge="inline" onChange={(value) => setMyRecaptcha(value)} ref={recaptchaRef}/>

                                            <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <button className="btn btn-primary" type="submit" id="submit" disabled={isSubmitting}>Login</button>
                                            </div><br/>

                                            {myMsg !== undefined && (
                                                <div className="alert alert-success animate__animated animate__bounceIn animate_slow">{myMsg}</div>
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
    :
    <div className="col-lg-12" style={{position:"absolute",top:"40%",left:"40%"}}>
        <ClipLoader color={'#ff0000'} loading={loading} size={100} />
    </div>
  );
}

async function checkLogin(username,password,instId,flag,myRecaptcha,setMyMsg,history,setCurrentUser,recaptchaRef)
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
                else if(res.data.data.role === 'EADMIN')
                {
                    setCurrentUser(res.data.data);
                    history.replace({ pathname: '/insthome',state:{currentUser: res.data.data}});
                }
                else if(res.data.data.role === 'GADMIN')
                {
                    setCurrentUser(res.data.data);
                    history.replace({ pathname: '/gadminhome',state:{currentUser: res.data.data}});
                }
                else if(res.data.data.role === 'CADMIN')
                {
                    setCurrentUser(res.data.data);
                    history.replace({ pathname: '/cadminhome',state:{currentUser: res.data.data}});
                }
            }
            else
            {
                recaptchaRef.current.reset();
                setMyMsg(res.data.message);
            }
    })
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
