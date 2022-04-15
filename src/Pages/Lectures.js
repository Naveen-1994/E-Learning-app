import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddLecture from "../component/addLecture";
import Navbar from "../Navbar";
import { getCourseDeatail, getLectureDetails } from "../reduxStore/Configaction";

const LecturePage = (props) => {
    const { idx, id } = props.location.state
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()
    const lectures = useSelector((state) => {
        return state.lectures
    })
    const courses = useSelector((state) => {
        return state.courses
    })

    useEffect(() => {
        dispatch(getCourseDeatail())
        dispatch(getLectureDetails(id))
    }, [])

    const handledelete = (id) => {
        console.log(id)
    }

    const handlesearch = (e) => {
        setSearch(e.target.value)
    }

    return (
        <div className="bg-light">
            <Navbar />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        {
                            courses.length > 0 ? (
                                <h4>{courses[idx].name.toUpperCase()}</h4>
                            ) : null
                        }

                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3 border">
                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Course Details
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        {
                                            courses.length > 0 ? (
                                                <div>
                                                    <label>Name:</label><span> {courses[idx].name}</span> <br />
                                                    <label>ID:<span> {courses[idx]._id}</span></label> <br />
                                                    <label>Category:<span> {courses[idx].category}</span></label> <br />
                                                    <label>Level:<span> {courses[idx].level}</span></label> <br />
                                                    <label>ID:<span> {courses[idx]._id}</span></label> <br />
                                                    <label>Author:<span> {courses[idx].author}</span></label> <br />
                                                    <label>Validity:<span> {courses[idx].validity}</span></label> <br />
                                                    <label>ReleaseDate:<span> {courses[idx].releaseDate}</span></label> <br />
                                                    <label>IsDelete:<span> {String(courses[idx].isDelete)}</span></label>
                                                </div>
                                            ) : null
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <h4>Lectures</h4>
                        <div className="row d-flex justify-content-between  ">
                            <div className="col-md-4">
                                <AddLecture id={id} />
                            </div>
                            <div className="col-md-4">
                                <input type="text" className="form-control" placeholder="Search course" onChange={handlesearch} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="container-fluid">
                                <div className="row row-cols- row-cols-md-3 g-4">
                                    {
                                        lectures.length > 0 ? (
                                            lectures.map((lecture, i) => {
                                                return (
                                                    <div key={i} className="col">
                                                        <div className="card h-100">
                                                            <div className="bg-secondary"></div>
                                                            <div className="card-body">
                                                                <Link to={{
                                                                    pathname: `lecture/${lecture.title}${i}`,
                                                                    state: { idC: id, idL: lecture._id }
                                                                }}
                                                                    style={{ textDecoration: 'none', color: 'inherit' }} >
                                                                    <h5 className="card-title">{lecture.title.toUpperCase()}</h5>
                                                                    <p className="card-text">{lecture.description}</p>
                                                                </Link>
                                                                <div>
                                                                    <button className="btn float-end" onClick={() => {
                                                                        handledelete(lecture._id)
                                                                    }}><i className="bi bi-journal-x" ></i></button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
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
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default LecturePage