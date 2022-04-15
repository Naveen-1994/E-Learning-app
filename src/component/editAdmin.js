import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from 'yup'

const Editadmin = (props) => {
    const adminDetails = useSelector((state) => {
        return state.userdetail
    })
    const { handletoggle } = props

    const formik = useFormik({
        initialValues: {
            username: adminDetails.username,
            email: adminDetails.email,
            acName: adminDetails.academy.name,
            website: adminDetails.academy.website
        },
        validationSchema: Yup.object({
            username: Yup.string().max(12, "Charcter length should be less than 12").required("Required"),
            email: Yup.string().email("Email is not valid").required("Required"),
            acName: Yup.string().required("Required"),
            website: Yup.string().optional()
        }),
        onSubmit: (values, { resetForm }) => {
            const formdata = {
                username: values.username,
                email: values.email,
                academy: {
                    name: values.acName,
                    website: values.website
                }
            }
            axios.put("https://dct-e-learning.herokuapp.com/api/admin", formdata, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
                .then((response) => {
                    if (response.data.hasOwnProperty('errors'))
                        alert(response.data.errors)
                    else {
                        handletoggle()
                        alert("Successfully Edited")
                    }
                })
                .catch((err) => {
                    alert(err.message)
                })
            resetForm({ values: '' })
        }
    })

    return (
        <div className="row m-2">
            <div className="col-md-4">
                <p><b>Edit your details</b></p>
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
                    <label>Academy Details</label> <br />
                    <label>Name*</label>
                    <input
                        type="text"
                        className="form-control"
                        value={formik.values.acName}
                        name="acName"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        placeholder="Enter Academy Name" />
                    {formik.touched.acName && formik.errors.acName ? <p style={{ color: 'red' }}>{formik.errors.acName}</p> : null}

                    <label>Website</label>
                    <input
                        type="text"
                        className="form-control"
                        value={formik.values.website}
                        name="website"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        placeholder="Enter Website" />
                    {formik.touched.website && formik.errors.website ? <p style={{ color: 'red' }}>{formik.errors.website}</p> : null}
                    <br />
                    <input type="submit" className="btn btn-outline-primary" /> <span>cancel button</span>
                </form>
            </div>
        </div>
    )
}

export default Editadmin