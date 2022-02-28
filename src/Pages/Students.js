import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import Addstudent from "../component/addStudent";
import EditStudent from "../component/editStudent";
import { useDispatch, useSelector } from "react-redux";
import { getStudentdetails } from "../reduxStore/Configaction";


const StudentsPage = () => {
    const dispatch = useDispatch()
    const students = useSelector((state) => {
        return state.students
    })
    const [student, setStudent] = useState({})
    const [stDetails, setDetails] = useState({})
    const [addFlag, setaddFlag] = useState(false)
    const [editFlag, setEditflag] = useState(false)

    useEffect(() => {
        dispatch(getStudentdetails())
    }, [student])
    const handleclick = () => {
        setaddFlag(!addFlag)
    }

    const handledit = (i) => {
        setEditflag(!editFlag)
        setStudent(students[i])
    }

    const handleDelete = (id) => {
        if (window.confirm("Are you sure ?") === true) {
            axios.delete(`https://dct-e-learning.herokuapp.com/api/admin/students/${id}`, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
                .then((response) => {
                    if (response.data.hasOwnProperty('errors'))
                        alert(response.data.errors)
                })
                .catch((err) => {
                    alert(err.message)
                })
        }
    }

    const addDetails = (i) => {
        setDetails(students[i])
    }

    return (
        <div className="bg-light">
            <Navbar />
            <div className="container-fluid">
                <div className="row m-2">
                    <p>Add a student: <i type="button" className="bi bi-person-plus-fill" onClick={handleclick} ></i></p>
                </div>
                {
                    addFlag ? (
                        <div className="container-fluid">
                            <Addstudent handleclick={handleclick} />
                        </div>
                    ) : null
                }
                {
                    editFlag ? (
                        <div className="container-fluid">
                            <EditStudent handledit={handledit}
                                name={student.name}
                                email={student.email}
                                isallowed={student.isAllowed}
                                id={student._id} />
                        </div>
                    ) : null
                }
                <div className="row">
                    {
                        students.length > 0 ? (
                            <div className="col-md-4">
                                <table className="table m-2">
                                    <thead>
                                        <tr>
                                            <th>Sl.No</th>
                                            <th>Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            students.map((student, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{i + 1}</td>
                                                        <td>
                                                            <span type="button" onClick={() => {
                                                                addDetails(i)
                                                            }} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                                                {student.name}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <i type="button" className="bi bi-pencil-square" onClick={() => {
                                                                handledit(i)
                                                            }}></i>
                                                        </td>
                                                        <td>
                                                            <i type="button" className="bi bi-person-x-fill" onClick={() => {
                                                                handleDelete(student._id)
                                                            }}></i>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        ) :
                            (
                                <div className="col-md-4">
                                    <div className="d-flex justify-content-center">
                                        <div className="spinner-border" role="status">
                                        </div>
                                    </div>
                                </div>
                            )
                    }
                    {
                        Object.keys(stDetails).length > 0 ? (
                            <div className="col-md-4">
                                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="staticBackdropLabel">{stDetails.name}</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <span><b>ID:</b> {stDetails._id}</span> <br />
                                                <span><b>Email:</b> {stDetails.email}</span> <br />
                                                <span><b>Role:</b> {stDetails.role}</span> <br />
                                                <span><b>Courses:</b></span> <br />
                                                <ul>
                                                    {
                                                        stDetails.courses.map((course, i) => {
                                                            return <li key={i}>{course.name}</li>
                                                        })
                                                    }

                                                </ul>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : null
                    }
                </div>
            </div>
        </div>
    )
}

export default StudentsPage