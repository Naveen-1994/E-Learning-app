import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { getStudentdetails } from "../reduxStore/Configaction";
import { useFormik } from "formik";
import * as Yup from 'yup'

const Addstudent = (props) => {
    const dispatch = useDispatch()
    const { handleclick } = props

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            isAllowed: true
        },
        validationSchema: Yup.object({
            name: Yup.string().max(12, "Character length should be less than 12").required("Required"),
            email: Yup.string().email("Email is not valid").required("Required"),
            password: Yup.string().required("Required"),
            isAllowed: Yup.string().required("Required")
        }),
        onSubmit: (values, { resetForm }) => {
            axios.post('https://dct-e-learning.herokuapp.com/api/admin/students', values, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
                .then((response) => {
                    if (response.data.hasOwnProperty("errors"))
                        alert(response.errors)
                    else {
                        alert("successfully added a student")
                        dispatch(getStudentdetails())
                        handleclick()
                    }
                })
                .catch((err) => {
                    alert(err.message)
                })
            resetForm({ values: '' })
        }
    })


    const handletoggle = () => {
        handleclick()
    }

    return (
        <div className="row">
            <div className="col-md-4 ms-2 pb-2">
                <form onSubmit={formik.handleSubmit}>
                    <label>Name</label>
                    <input
                        type="text"
                        value={formik.values.name}
                        name="name"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className="form-control" />
                    {formik.touched.name && formik.errors.name ? <p style={{ color: 'red' }}>{formik.errors.name}</p> : null}
                    <label>Email</label>
                    <input
                        type="text"
                        value={formik.values.email}
                        name="email"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className="form-control" />
                    {formik.touched.email && formik.errors.email ? <p style={{ color: 'red' }}>{formik.errors.email}</p> : null}
                    <label>Password</label>
                    <input
                        type="text"
                        value={formik.values.password}
                        name="password"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className="form-control" />
                    {formik.touched.password && formik.errors.password ? <p style={{ color: 'red' }}>{formik.errors.password}</p> : null}
                    <label>Is Allowed</label>
                    <select
                        value={formik.values.isAllowed}
                        name="isAllowed"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className="form-select"
                        aria-label="Default select example">
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                    </select>
                    {formik.touched.isAllowed && formik.errors.isAllowed ? <p style={{ color: 'red' }}>{formik.errors.isAllowed}</p> : null} <br />
                    <input type="submit" className="btn btn-outline-primary" />
                    <span type="button" className="btn btn-outline-primary ms-3" onClick={handletoggle} >Cancel</span>
                </form>
            </div>
        </div>
    )
}

export default Addstudent