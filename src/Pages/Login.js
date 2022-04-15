import React, { useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { addToken } from "../reduxStore/Configaction";
import jwtDecode from "jwt-decode";
import { useFormik, yupToFormErrors } from 'formik'
import * as Yup from 'yup'

const Login = (props) => {
    let url = ''
    if (window.location.pathname.includes('/admin')) {
        url = "https://dct-e-learning.herokuapp.com/api/admin/login"
    }
    else if (window.location.pathname.includes('/student')) {
        url = "https://dct-e-learning.herokuapp.com/api/students/login"
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Email is not valid").required("Required"),
            password: Yup.string().required("Required")
        }),
        onSubmit: (values, { resetForm }) => {
            axios.post(url, values)
                .then((response) => {
                    if (response.data.hasOwnProperty('errors'))
                        // console.log(response.data.errors)
                        alert(response.data.errors)
                    else {
                        const decoder = jwtDecode(response.data.token)
                        localStorage.setItem('Id', decoder._id)
                        localStorage.setItem('token', response.data.token)
                        localStorage.setItem('role', decoder.role)
                        alert('Successfully logged in')
                        console.log(localStorage.length)
                        props.history.push("/")
                    }
                })
                .catch((err) => {
                    console.log(err.message)
                })
            resetForm({ values: '' })
        }
    })


    return (
        <div>
            <Navbar props={props} />
            <div id="container">
                <div id="fill-screen">
                    <img src={require('../images/landingBG.jpg')} width="600" height="400" className="img-fill-screen" />
                </div>
                <div className="col-md-3 pt-3 ms-3" id="form">
                    <form onSubmit={formik.handleSubmit}>
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            className="form-control"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter your email" />
                        {formik.touched.email && formik.errors.email ? <p style={{ color: 'red' }}>{formik.errors.email}</p> : null}
                        <label>Password</label>
                        <input
                            type="text"
                            name="password"
                            className="form-control"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter your password" />
                        {formik.touched.password && formik.errors.password ? <p style={{ color: 'red' }}>{formik.errors.password}</p> : null}<br />
                        <input type="submit" className="btn btn-outline-primary" /> <br />
                        {
                            window.location.pathname.includes('/admin') ?
                                <span>Don't have an account already? <a style={{ textDecoration: "none" }} href="/admin/signup">Sign Up</a></span>
                                : null
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login