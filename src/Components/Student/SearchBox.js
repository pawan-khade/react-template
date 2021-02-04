import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

function SearchBox(props)
{
    return (
    <>  
        <Formik
            initialValues={{ searchSubject:""}}
            onSubmit={(values,{ setSubmitting }) =>
            {
                props.getExamData(props.setUserRequest,props.setLoading,values.searchSubject);
            }}
            validationSchema={Yup.object().shape({
                searchSubject:Yup.string()
                .required("Subject Name is Required...")
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
                        <div className="col-lg-2">
                            <form onSubmit={handleSubmit}>
                                <div className="input-group">
                                    <input 
                                        className="form-control" 
                                        type="text" 
                                        name="searchSubject" 
                                        id="searchSubject" 
                                        placeholder="Subjects..."
                                        value ={values.searchSubject}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    />
                                    <div className="input-group-append">
                                    <button type="button" className="btn btn-primary" type="submit"><i className="fas fa-search"></i></button>
                                    </div>
                                    {errors.searchSubject && touched.searchSubject && (
                                        <div className="alert alert-info col-lg-12">{errors.searchSubject}</div>
                                    )}
                                </div>
                            </form>
                        </div>
                    );
                }
            }
        </Formik>
    </>
    );
}

export default SearchBox;