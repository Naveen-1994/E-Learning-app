import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from 'yup'
import axios from "axios";
import { getCourseDeatail } from "../reduxStore/Configaction";

const EnrollStudent = (props) => {
    const dispatch = useDispatch()
    const { id, name, handleEnroll } = props
    const courses = useSelector((state) => {
        return state.courses
    })

    useEffect(() => {
        dispatch(getCourseDeatail())
    }, [])

    const formik = useFormik({
        initialValues: {
            courseId: ''
        },
        validationSchema: Yup.object({
            courseId: Yup.string().required("Required")
        }),
        onSubmit: (values) => {
            const url = `https://dct-e-learning.herokuapp.com/api/courses/enroll?courseId=${values.courseId}&studentId=${id}`
            console.log(localStorage.getItem('token'))
            axios.patch(url, null, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
                .then((response) => {
                    if (response.data.hasOwnProperty('errors'))
                        console.log(response.data.errors)
                    else {
                        console.log(response.data)
                    }
                })
                .catch((err) => {
                    console.log(err.message)
                })
        }
    })


    return (
        <div className="col-md-6">
            <div className="m-3 pt-3">
                <h5>Enroll a Student</h5>
                <p>{name}</p>
                <div className="col-md-6">
                    <form onSubmit={formik.handleSubmit}>
                        <select name="courseId" value={formik.values.courseId} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-select" aria-label="Default select example">
                            <option value="">Choose Course</option>
                            {
                                courses.map((course) => {
                                    return <option key={course._id} value={course._id}>{course.name}</option>
                                })
                            }
                        </select>
                        {formik.touched.courseId && formik.errors.courseId ? <p style={{ color: 'red' }}>{formik.errors.courseId}</p> : null}
                        <input type="submit" className="btn" />
                        <button className="btn" onClick={() => {
                            handleEnroll()
                        }}>cancel</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EnrollStudent