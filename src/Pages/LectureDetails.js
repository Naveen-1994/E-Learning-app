import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getCourseDeatail } from "../reduxStore/Configaction";
import axios from "axios";
import ReactPlayer from "react-player";
import EditLecture from "../component/editLecture";

const LectureDetails = (props) => {
    const dispatch = useDispatch()
    const { idC, idL } = props.location.state
    const [lecture, setLecture] = useState({})
    const [editflag, setEditflag] = useState(false)
    const course = useSelector((state) => {
        return state.courses.filter((course) => {
            return course._id === idC
        })
    })

    useEffect(() => {
        dispatch(getCourseDeatail())
        axios.get(`https://dct-e-learning.herokuapp.com/api/courses/${idC}/lectures/${idL}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                if (response.data.hasOwnProperty("errors"))
                    alert(response.data.errors)
                else {
                    setLecture(response.data)
                }
            })
            .catch((err) => {
                console.log(err.message)
            })
    }, [])

    const handleclick = () => {
        setEditflag(!editflag)
    }

    return (
        <div className="bg-light">
            <Navbar />
            <div className="contianer-fluid">
                <div className="row">
                    <div className="col-md-3 border">
                        {
                            editflag ? (
                                <EditLecture handleclick={handleclick} lecture={lecture} />
                            ) : (
                                Object.keys(lecture).length > 0 ? (
                                    <div>
                                        <h5>{lecture.title.toUpperCase()}   <i type="button" className="bi bi-pencil-square" onClick={handleclick}></i></h5>
                                        <label>Description:</label>
                                        <p>{lecture.description}</p>
                                        <label>Asset Type:</label>
                                        <p>{lecture.assetType}</p>
                                        <label>User:</label>
                                        <p>{lecture.user}</p>
                                        <label>Course:</label>
                                        <p>{lecture.course}</p>
                                        <label>Created At:</label>
                                        <p>{lecture.createdAt}</p>
                                        <label>Updated At:</label>
                                        <p>{lecture.updatedAt}</p>
                                        <div className="overflow-scroll" style={{ height: '200px' }}>
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>Students</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        {
                                                            lecture.students.map((student) => {
                                                                return <th>{student._id}</th>
                                                            })
                                                        }
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ) : null
                            )
                        }
                    </div>
                    <div className="col-md-9">
                        <h4>content</h4>
                        <ReactPlayer url={`${lecture.assetURL}`} />
                    </div>
                </div>

            </div>

        </div>
    )
}

export default LectureDetails