import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";


const Navbar = () => {
    const [flag, setFlag] = useState(false)
    const history = useHistory()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setFlag(true)
        }
        else {
            setFlag(false)
        }
    }, [localStorage.getItem('token')])

    const handleclick = () => {
        localStorage.clear()
        history.push('/')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top" id="nav-bar">
            <a className="navbar-brand ms-2" href="/">Learn-Hub</a>
            <div className="collapse navbar-collapse justify-content-end me-3" id="navbarNav">
                {
                    flag ?
                        (
                            <ul className="navbar-nav me-5">
                                <li className="nav-item">
                                    <a className="nav-link" href="/admin/students"><i className="bi bi-people-fill"></i>Students</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/admin/account"><i className="bi bi-person-circle"></i>Account</a>
                                </li>
                                <li className="nav-item">
                                    <a type="button" className="nav-link" onClick={handleclick}><i className="bi bi-box-arrow-right"></i>Logout</a>
                                </li>
                            </ul>

                        ) :
                        (
                            <ul className="navbar-nav me-5">
                                <li className="nav-item dropdown me-5">
                                    <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Login
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <li><a className="dropdown-item" href="/admin/login">Admin Login</a></li>
                                        <li><a className="dropdown-item" href="/student/login">Student Login</a></li>
                                    </ul>
                                </li>
                            </ul>
                        )
                }
            </div>
        </nav>
    )
}

export default Navbar