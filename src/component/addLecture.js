import React, { useState } from "react";
import validator from "validator";
import { useDispatch } from "react-redux";
import { getLectureDetails } from "../reduxStore/Configaction";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';

const AddLecture = (props) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = props

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            assetType: '',
            assetURL: ''
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Required"),
            description: Yup.string().required("Required"),
            assetType: Yup.string().required("Required"),
            assetURL: Yup.string().required("Required")
        }),
        onSubmit: (values, { resetForm }) => {
            axios.post(`https://dct-e-learning.herokuapp.com/api/courses/${id}/lectures`, values, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
                .then((response) => {
                    console.log(response.data)
                    if (response.hasOwnProperty('errors'))
                        alert(response.errors)
                    else {
                        dispatch(getLectureDetails(id))
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
            <p className="m-2">Add a Lecture <i type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className="bi bi-journal-plus"></i></p>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Enter Lecture Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={formik.handleSubmit}>
                                <label>Title* </label>
                                <input type="text" value={formik.values.title} name="title" onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control" />
                                {formik.touched.title && formik.errors.title ? <p style={{ color: 'red' }}>{formik.errors.title}</p> : null}
                                <label>Decsription* </label>
                                <textarea value={formik.values.description} name="discription" onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control" />
                                {formik.touched.description && formik.errors.description ? <p style={{ color: 'red' }}>{formik.errors.description}</p> : null}
                                <label>Asset Type*</label>
                                <select name="type" value={formik.values.assetType} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-select" aria-label="Default select example">
                                    <option value="">Choose type</option>
                                    <option value="video">Video</option>
                                    <option value="audio">Audio</option>
                                    <option value="text">Text</option>
                                    <option value="pdf">PDF</option>
                                    <option value="img">Image</option>
                                </select>
                                {formik.touched.assetType && formik.errors.assetType ? <p style={{ color: 'red' }}>{formik.errors.assetType}</p> : null}
                                <label>Asset URL* </label>
                                <input type="text" value={formik.values.assetURL} name="url" onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control" />
                                {formik.touched.assetURL && formik.errors.assetURL ? <p style={{ color: 'red' }}>{formik.errors.assetURL}</p> : null}
                                <button type="button" className="btn btn-secondary mt-1" data-bs-dismiss="modal">Close</button>
                                <input type="submit" className="btn btn-primary mt-1" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddLecture