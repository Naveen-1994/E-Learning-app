import React, { useState } from "react";
import Navbar from "../Navbar";
import axios from 'axios'

const Signup = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [acName, setAcname] = useState('')
    const [website, setWebsite] = useState('')

    const handlesubmit = (e) => {
        e.preventDefault()
        const formdata = {
            username: username,
            email: email,
            password: password,
            academy: {
                name: acName,
                website: website
            }
        }
        console.log(formdata)
        axios.post("https://dct-e-learning.herokuapp.com/api/admin/register", formdata)
            .then((response) => {
                console.log(response.data)
            })
            .catch((err) => {
                console.log(err.message)
            })
        setAcname('')
        setEmail('')
        setPassword('')
        setWebsite('')
        setUsername('')
    }

    const handlechange = (e) => {
        if (e.target.name === 'username')
            setUsername(e.target.value)
        else if (e.target.name === 'email')
            setEmail(e.target.value)
        else if (e.target.name === 'password')
            setPassword(e.target.value)
        else if (e.target.name === 'acname')
            setAcname(e.target.value)
        else if (e.target.name === 'website')
            setWebsite(e.target.value)
    }

    return (
        <div>
            <Navbar />

            <div id="container">
                <div id="fill-screen">
                    <img src={require('../images/landingBG.jpg')} width="600" height="400" className="img-fill-screen" />
                </div>
                <div className="col-md-3 pt-3 ms-3" id="form">
                    <form onSubmit={handlesubmit}>
                        <label>Username*</label>
                        <input type="text" className="form-control" value={username} name="username" onChange={handlechange} placeholder="Enter Username" />
                        <label>Email*</label>
                        <input type="text" className="form-control" value={email} name="email" onChange={handlechange} placeholder="Enter Email Id" />
                        <label>Password*</label>
                        <input type="text" className="form-control" value={password} name="password" onChange={handlechange} placeholder="Set Password" /> <br />
                        <label>Academy Details</label> <br />
                        <label>Name*</label>
                        <input type="text" className="form-control" value={acName} name="acname" onChange={handlechange} placeholder="Enter Academy Name" />
                        <label>Website</label>
                        <input type="text" className="form-control" value={website} name="website" onChange={handlechange} placeholder="Enter Website" /> <br />
                        <input type="submit" className="btn btn-outline-primary" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup