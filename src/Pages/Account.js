import React, { useEffect, useState } from "react";
import { getAdmindetails } from "../reduxStore/Configaction";
import Navbar from "../Navbar";
import Editadmin from "../component/editAdmin";
import { useDispatch, useSelector } from "react-redux";

const Account = (props) => {
    const [editflag, setEditflag] = useState(false)
    const dispatch = useDispatch()
    const adminDetails = useSelector((state) => {
        return state.userdetail
    })
    console.log(adminDetails)

    useEffect(() => {
        let adminURL = ''
        if (localStorage.length > 0) {
            if (localStorage.getItem('role').includes('admin')) {
                adminURL = 'https://dct-e-learning.herokuapp.com/api/admin/account'
            }
            else if (localStorage.getItem('role').includes('student')) {
                adminURL = `https://dct-e-learning.herokuapp.com/api/students/${localStorage.getItem('Id')}`
            }
        }
        dispatch(getAdmindetails(adminURL))
    }, [editflag])

    const handletoggle = () => {
        setEditflag(!editflag)
    }

    return (
        <div className="bg-light">
            <Navbar />
            {
                editflag ? (
                    <div className="container-fluid">
                        <Editadmin handletoggle={handletoggle} />
                        <i type="button" onClick={handletoggle} className="bi bi-x-circle m-3"></i>
                    </div>
                ) :
                    (
                        Object.keys(adminDetails).length > 0 ? (
                            <div className="container-fluid">
                                <div className="row m-2">
                                    {
                                        Object.keys(adminDetails).length > 0 ? (
                                            <div className="col-md-6">
                                                <h4>User Details:</h4>
                                                <table className="table table-hover">
                                                    {
                                                        localStorage.getItem('role').includes('admin') ? (
                                                            <tbody>
                                                                <tr>
                                                                    <td>Role:</td>
                                                                    <td>{adminDetails.role}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Email:</td>
                                                                    <td>{adminDetails.email}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Username:</td>
                                                                    <td>{adminDetails.username}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>ID:</td>
                                                                    <td>{adminDetails.academy.academyId}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Academy Name:</td>
                                                                    <td>{adminDetails.academy.name}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Website:</td>
                                                                    <td>{adminDetails.academy.website}</td>
                                                                </tr>
                                                            </tbody>
                                                        ) : (
                                                            <tbody>
                                                                <tr>
                                                                    <td>Role:</td>
                                                                    <td>{adminDetails.role}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Email:</td>
                                                                    <td>{adminDetails.email}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Username:</td>
                                                                    <td>{adminDetails.name}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>ID:</td>
                                                                    <td>{adminDetails._id}</td>
                                                                </tr>
                                                            </tbody>
                                                        )
                                                    }
                                                </table>
                                            </div>
                                        ) :
                                            null
                                    }
                                </div>
                                <div className="row m-2">
                                    <p>Something's missing? Update here <i type="button" onClick={handletoggle} className="bi bi-pencil"></i> </p>
                                </div>
                            </div>
                        ) : (
                            <div className="container">
                                <div className="spinner-border m-5" role="status"></div>
                            </div>
                        )

                    )
            }
        </div>
    )
}

export default Account