import React from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";

const Login = (props) => {

    return (
        <div>
            <Navbar />
            <div id="container">
                <div id="fill-screen">
                    <img src={require('../images/landingBG.jpg')} width="600" height="400" className="img-fill-screen" />
                </div>
                <div className="col-md-3 pt-3 ms-3" id="form">
                    <form>
                        <label>Email</label>
                        <input type="text" className="form-control" placeholder="Enter your email" />
                        <label>Password</label>
                        <input type="text" className="form-control" placeholder="Enter your password" /> <br />
                        <input type="submit" className="btn btn-outline-primary" /> <br />
                        {
                            window.location.pathname.includes('/admin') ?
                                <span>Don't have an account already? <a style={{ textDecoration: "none" }} href="/admin/signup">Sign Up</a></span>
                                : null
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login