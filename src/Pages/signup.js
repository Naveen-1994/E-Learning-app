import React from "react";
import Navbar from "../Navbar";
import axios from 'axios'
import { useFormik } from "formik";
import * as Yup from 'yup'

const Signup = () => {

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            acname: '',
            website: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Required"),
            email: Yup.string().email('Email is not valid').required("Required"),
            password: Yup.string().required("Required"),
            acname: Yup.string().required("Required"),
            website: Yup.string().optional()
        }),
        onSubmit: (values) => {
            const formdata = {
                username: values.username,
                email: values.email,
                password: values.password,
                academy: {
                    name: values.acname,
                    webiste: values.website
                }
            }
            axios.post("https://dct-e-learning.herokuapp.com/api/admin/register", formdata)
                .then((response) => {
                    console.log(response.data)
                })
                .catch((err) => {
                    console.log(err.message)
                })
        }
    })

    return (
        <div>
            <Navbar />

            <div id="container">
                <div id="fill-screen">
                    <img src={require('../images/landingBG.jpg')} width="600" height="400" className="img-fill-screen" />
                </div>
                <div className="col-md-3 pt-3 ms-3" id="form">
                    <form onSubmit={formik.handleSubmit}>
                        <label>Username*</label>
                        <input
                            type="text"
                            className="form-control"
                            value={formik.values.username}
                            name="username"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            placeholder="Enter Username" />
                        {formik.touched.username && formik.errors.username ? <p style={{ color: 'red' }}>{formik.errors.username}</p> : null}
                        <label>Email*</label>
                        <input
                            type="text"
                            className="form-control"
                            value={formik.values.email}
                            name="email"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            placeholder="Enter Email Id" />
                        {formik.touched.email && formik.errors.email ? <p style={{ color: 'red' }}>{formik.errors.email}</p> : null}
                        <label>Password*</label>
                        <input
                            type="text"
                            className="form-control"
                            value={formik.values.password}
                            name="password"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            placeholder="Set Password" />
                        {formik.touched.password && formik.errors.password ? <p style={{ color: 'red' }}>{formik.errors.password}</p> : null} <br />
                        <label>Academy Details</label> <br />
                        <label>Name*</label>
                        <input
                            type="text"
                            className="form-control"
                            value={formik.values.acname}
                            name="acname"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            placeholder="Enter Academy Name" />
                        {formik.touched.acname && formik.errors.acname ? <p style={{ color: 'red' }}>{formik.errors.acname}</p> : null}
                        <label>Website</label>
                        <input
                            type="text"
                            className="form-control"
                            value={formik.values.website}
                            name="website"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            placeholder="Enter Website" />
                        {formik.touched.website && formik.errors.website ? <p style={{ color: 'red' }}>{formik.errors.website}</p> : null} <br />
                        <input type="submit" className="btn btn-outline-primary" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup