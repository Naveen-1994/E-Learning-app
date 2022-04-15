import React, { useState, useEffect } from "react";
import { getCourseDeatail } from "../reduxStore/Configaction";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from 'yup';

const EditLecture = (props) => {
    const { handleclick, lecture } = props
    const dispatch = useDispatch()

    const courses = useSelector((state) => {
        return state.courses
    })
    useEffect(() => {
        dispatch(getCourseDeatail())
    }, [])

    const formik = useFormik({
        initialValues: {
            title: lecture.title,
            description: lecture.description,
            assetType: lecture.assetType,
            assetURL: lecture.assetURL,
            course: '',
            isDelete: lecture.isDelete
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Required"),
            description: Yup.string().required("Required"),
            assetType: Yup.string().required("Required"),
            assetURL: Yup.string().required("Required"),
            course: Yup.string().required("Required"),
            isDelete: Yup.boolean().required("Required")
        }),
        onSubmit: (values) => {
            console.log(values)
            handleclick()
        }
    })

    const handlereturn = () => {
        handleclick()
    }

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label>Title* </label>
                <input type="text" value={formik.values.title} name="title" onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control" />
                {formik.touched.title && formik.errors.title ? <p style={{ color: 'red' }}>{formik.errors.title}</p> : null}
                <label>Decsription* </label>
                <textarea value={formik.values.description} name="description" onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control" />
                {formik.touched.description && formik.errors.description ? <p style={{ color: 'red' }}>{formik.errors.description}</p> : null}
                <label>Asset Type*</label>
                <select name="assetType" value={formik.values.assetType} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-select" aria-label="Default select example">
                    <option value="">Choose type</option>
                    <option value="video">Video</option>
                    <option value="audio">Audio</option>
                    <option value="text">Text</option>
                    <option value="pdf">PDF</option>
                    <option value="img">Image</option>
                </select>
                {formik.touched.assetType && formik.errors.assetType ? <p style={{ color: 'red' }}>{formik.errors.assetType}</p> : null}
                <label>Asset URL* </label>
                <input type="text" value={formik.values.assetURL} name="assetURL" onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-control" />
                {formik.touched.assetURL && formik.errors.assetURL ? <p style={{ color: 'red' }}>{formik.errors.assetURL}</p> : null}
                <label>Course</label>
                <select name="course" value={formik.values.course} onChange={formik.handleChange} onBlur={formik.handleBlur} className="form-select" aria-label="Default select example">
                    <option value="">Choose Course</option>
                    {
                        courses.map((course) => {
                            return <option key={course._id} value={course._id}>{course.name}</option>
                        })
                    }
                </select>
                {formik.touched.course && formik.errors.course ? <p style={{ color: 'red' }}>{formik.errors.course}</p> : null}
                <label>Delete</label>
                <select name="isDelete" value={formik.values.isDelete} onBlur={formik.handleBlur} onChange={formik.handleChange} className="form-select" aria-label="Default select example">
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                </select>
                {formik.touched.isDelete && formik.errors.isDelete ? <p style={{ color: 'red' }}>{formik.errors.isDelete}</p> : null}
                <input type="submit" className="btn" />
                <button className="btn" onClick={handlereturn}>cancel</button>
            </form>
        </div>
    )
}

export default EditLecture