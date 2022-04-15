import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Link, from, state } from "react-router-dom";
import { getCourseDeatail } from "../reduxStore/Configaction";
import AddCourse from "../component/addCourse";
import Editcourse from "../component/editCourse";
import axios from "axios";

const CoursesPage = () => {
    const [serachCourse, setSearchC] = useState('')
    const dispatch = useDispatch()
    const courses = useSelector((state) => {
        return state.courses
    })
    useEffect(() => {
        dispatch(getCourseDeatail())
    }, [])

    const handlesearch = (e) => {
        setSearchC(e.target.value)
    }

    const handledelete = (id) => {
        if (window.confirm("Are you sure ?") === true) {
            axios.delete(`https://dct-e-learning.herokuapp.com/api/courses/${id}`, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
                .then((response) => {
                    if (response.data.hasOwnProperty('errors'))
                        alert(response.data.errors)
                    else {
                        dispatch(getCourseDeatail())
                    }
                })
                .catch((err) => {
                    alert(err.message)
                })
        }
    }

    return (
        <div className="bg-light">
            <Navbar />
            <div className="container-fluid">
                <AddCourse />
            </div >
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 m-2">
                        <input type="text" value={serachCourse} onChange={handlesearch} className="form-control" placeholder="Search Course name" />
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row row-cols- row-cols-md-3 g-4">
                    {
                        courses.length > 0 ? (
                            courses.map((course, i) => {
                                if (course.name.toLowerCase().includes(serachCourse.toLowerCase())) {
                                    return (
                                        <div key={i} className="col">
                                            <div className="card h-100">
                                                <Link to={{
                                                    pathname: `courses/${course.name}${i}`,
                                                    state: { idx: i, id: course._id }
                                                }} style={{ textDecoration: 'none' }}>
                                                    <img src={require(`../images/${course.category}.png`)} className="card-img-top" alt="..." style={{ height: '250px', width: 'auto' }}></img>
                                                </Link>
                                                <div className="bg-secondary"></div>
                                                <div className="card-body">
                                                    <h5 className="card-title">{course.name.toUpperCase()}</h5>
                                                    <p className="card-text">{course.description}</p>
                                                    <button className="btn float-end" onClick={() => {
                                                        handledelete(course._id)
                                                    }}><i className="bi bi-journal-x" ></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        ) : (
                            <div className="col-md-12">
                                <div className="d-flex justify-content-center">
                                    <div className="spinner-border" role="status">
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div >
    )
}

export default CoursesPage