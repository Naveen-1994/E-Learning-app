import React, { useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import { addToken } from "../reduxStore/Configaction";

const Login = (props) => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handlechange = (e) => {
        if (e.target.name === "email")
            setEmail(e.target.value)
        else if (e.target.name === "password")
            setPassword(e.target.value)
    }

    const handlelogin = (e) => {
        e.preventDefault()
        const formdata = {
            email: email,
            password: password
        }
        axios.post("https://dct-e-learning.herokuapp.com/api/admin/login", formdata)
            .then((response) => {
                if (response.data.hasOwnProperty('errors'))
                    // console.log(response.data.errors)
                    alert(response.data.errors)
                else {
                    console.log(props.history)
                    localStorage.setItem('token', response.data.token)
                    alert('Successfully logged in')
                    props.history.push("/")
                }
            })
            .catch((err) => {
                console.log(err.message)
            })
    }


    return (
        <div>
            <Navbar props={props} />
            <div id="container">
                <div id="fill-screen">
                    <img src={require('../images/landingBG.jpg')} width="600" height="400" className="img-fill-screen" />
                </div>
                <div className="col-md-3 pt-3 ms-3" id="form">
                    <form onSubmit={handlelogin}>
                        <label>Email</label>
                        <input type="text" className="form-control" value={email} name="email" onChange={handlechange} placeholder="Enter your email" />
                        <label>Password</label>
                        <input type="text" className="form-control" value={password} name="password" onChange={handlechange} placeholder="Enter your password" /> <br />
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