import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Editadmin = (props) => {
    const adminDetails = useSelector((state) => {
        return state.userdetail
    })
    const [username, setUsername] = useState(adminDetails.username)
    const [email, setEmail] = useState(adminDetails.email)
    const [acName, setAcname] = useState(adminDetails.academy.name)
    const [website, setWebsite] = useState(adminDetails.academy.website)
    const { handletoggle } = props

    const handlesubmit = (e) => {
        e.preventDefault()
        const formdata = {
            username: username,
            email: email,
            academy: {
                name: acName,
                website: website
            }
        }
        axios.put("https://dct-e-learning.herokuapp.com/api/admin", formdata, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                if (response.data.hasOwnProperty('errors'))
                    alert(response.data.errors)
                else {
                    handletoggle()
                    alert("Successfully Edited")
                }
            })
            .catch((err) => {
                alert(err.message)
            })
        setAcname('')
        setEmail('')
        setWebsite('')
        setUsername('')
    }
    const handlechange = (e) => {
        if (e.target.name === 'username')
            setUsername(e.target.value)
        else if (e.target.name === 'email')
            setEmail(e.target.value)
        else if (e.target.name === 'acname')
            setAcname(e.target.value)
        else if (e.target.name === 'website')
            setWebsite(e.target.value)
    }

    return (
        <div className="row m-2">
            <div className="col-md-4">
                <p><b>Edit your details</b></p>
                <form onSubmit={handlesubmit}>
                    <label>Username*</label>
                    <input type="text" className="form-control" value={username} name="username" onChange={handlechange} placeholder="Enter Username" />
                    <label>Email*</label>
                    <input type="text" className="form-control" value={email} name="email" onChange={handlechange} placeholder="Enter Email Id" />
                    <label>Academy Details</label> <br />
                    <label>Name*</label>
                    <input type="text" className="form-control" value={acName} name="acname" onChange={handlechange} placeholder="Enter Academy Name" />
                    <label>Website</label>
                    <input type="text" className="form-control" value={website} name="website" onChange={handlechange} placeholder="Enter Website" /> <br />
                    <input type="submit" className="btn btn-outline-primary" />
                </form>
            </div>
        </div>
    )
}

export default Editadmin