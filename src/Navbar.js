import React from "react";

const Navbar = (props) => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top" id="nav-bar">
            <a className="navbar-brand ms-2" href="/">Learn-Hub</a>
            <div className="collapse navbar-collapse justify-content-end me-3" id="navbarNav">
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
            </div>
        </nav>
    )
}

export default Navbar