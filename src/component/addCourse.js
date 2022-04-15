import React, { useState } from "react";
import validator from "validator";
import { useDispatch } from "react-redux";
import { getCourseDeatail } from "../reduxStore/Configaction";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';

const AddCourse = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            duration: '',
            releaseDate: '',
            isDelete: false,
            category: '',
            validity: '',
            level: '',
            author: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().max(20, "character length should be less than 20").required("Required"),
            description: Yup.string().required("Required"),
            duration: Yup.number("Must be a number").required("Required"),
            releaseDate: Yup.date().required("Required"),
            isDelete: Yup.boolean().required("Required"),
            category: Yup.string().required("Required"),
            validity: Yup.number("must be a number").required("Required"),
            level: Yup.string().required("Required"),
            author: Yup.string().required("Required")
        }),
        onSubmit: (values, { resetForm }) => {
            axios.post("https://dct-e-learning.herokuapp.com/api/courses", values, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
                .then((response) => {
                    if (response.hasOwnProperty('errors'))
                        alert(response.errors)
                    else {
                        dispatch(getCourseDeatail())
                    }
                })
                .catch((err) => {
                    console.log(err.message)
                })
            resetForm({ values: '' })
        }
    })

    return (
        <div className="row">
            <div className="col-md-3">
                <p className="m-2">Add a Course <i type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className="bi bi-journal-plus"></i></p>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Enter Course Details</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={formik.handleSubmit}>
                                    <label>Name* </label>
                                    <input type="text" value={formik.values.name}
                                        onBlur={formik.handleBlur} name="name" onChange={formik.handleChange} className="form-control" />
                                    {formik.touched.name && formik.errors.name ? <p style={{ color: 'red' }}>{formik.errors.name}</p> : null}
                                    <label>Decsription* </label>
                                    <textarea value={formik.values.description} onBlur={formik.handleBlur} name="description" onChange={formik.handleChange} className="form-control" />
                                    {formik.touched.description && formik.errors.description ? <p style={{ color: 'red' }}>{formik.errors.description}</p> : null}
                                    <label>Duration in Months* </label>
                                    <input type="text" value={formik.duration} onBlur={formik.handleBlur} name="duration" onChange={formik.handleChange} className="form-control" />
                                    {formik.touched.duration && formik.errors.duration ? <p style={{ color: 'red' }}>{formik.errors.duration}</p> : null}
                                    <label>Release Date* </label>
                                    <input type="date" value={formik.values.releaseDate} onBlur={formik.handleBlur} name="releaseDate" onChange={formik.handleChange} className="form-control" />
                                    {formik.touched.releaseDate && formik.errors.releaseDate ? <p style={{ color: 'red' }}>{formik.errors.releaseDate}</p> : null}
                                    <label>Delete</label>
                                    <select name="isDelete" value={formik.values.isDelete} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-select" aria-label="Default select example">
                                        <option value={true}>True</option>
                                        <option value={false}>False</option>
                                    </select>
                                    {formik.touched.isDelete && formik.errors.isDelete ? <p style={{ color: 'red' }}>{formik.errors.isDelete}</p> : null}
                                    <label>Category*</label>
                                    <select name="category" value={formik.values.category} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-select" aria-label="Default select example">
                                        <option value="">Select the category</option>
                                        <option value="HTML">HTML</option>
                                        <option value="CSS">CSS</option>
                                        <option value="javascript">Javascript</option>
                                        <option value="reactjs">reactJs</option>
                                        <option value="nodejs">nodeJs</option>
                                        <option value="expressjs">expressJs</option>
                                        <option value="mongodb">mongoDb</option>
                                    </select>
                                    {formik.touched.category && formik.errors.category ? <p style={{ color: 'red' }}>{formik.errors.category}</p> : null}
                                    <label>Validity in Months*</label>
                                    <input type="text" value={formik.values.validity} onBlur={formik.handleBlur} name="validity" onChange={formik.handleChange} className="form-control" />
                                    {formik.touched.validity && formik.errors.validity ? <p style={{ color: 'red' }}>{formik.errors.validity}</p> : null}
                                    <label>Level</label>
                                    <select name="level" value={formik.values.level} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-select" aria-label="Default select example">
                                        <option value="">Choose the level</option>
                                        <option value="beginner">Beginner</option>
                                        <option value="intermediate">Intermediate</option>
                                        <option value="expert">Expert</option>
                                    </select>
                                    {formik.touched.level && formik.errors.level ? <p style={{ color: 'red' }}>{formik.errors.level}</p> : null}
                                    <label>Author</label>
                                    <input type="text" value={formik.values.author} onBlur={formik.handleBlur} name="author" onChange={formik.handleChange} className="form-control" />
                                    {formik.touched.author && formik.errors.author ? <p style={{ color: 'red' }}>{formik.errors.author}</p> : null}
                                    <button type="button" className="btn btn-secondary mt-1" data-bs-dismiss="modal">Close</button>
                                    <input type="submit" className="btn btn-primary mt-1" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCourse