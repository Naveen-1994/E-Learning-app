import axios from "axios";
import React, { useState } from "react";

const Addstudent = (props) => {
    const { handleclick } = props
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isallowed, setIsallowed] = useState(true)

    const handlechange = (e) => {
        if (e.target.name === "name")
            setName(e.target.value)
        else if (e.target.name === "email")
            setEmail(e.target.value)
        else if (e.target.name === "password")
            setPassword(e.target.value)
        else
            setIsallowed(!isallowed)
    }

    const handlesubmit = (e) => {
        e.preventDefault()
        const formdata = {
            name: name,
            email: email,
            password: password,
            isAllowed: isallowed
        }

        axios.post('https://dct-e-learning.herokuapp.com/api/admin/students', formdata, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                if (response.data.hasOwnProperty("errors"))
                    alert(response.errors)
                else {
                    alert("successfully added a student")
                    handleclick()
                }
            })
            .catch((err) => {
                alert(err.message)
            })


    }

    const handletoggle = () => {
        handleclick()

    }

    return (
        <div className="row">
            <div className="col-md-4 ms-2 pb-2">
                <form onSubmit={handlesubmit}>
                    <label>Name</label>
                    <input type="text" value={name} name="name" onChange={handlechange} className="form-control" />
                    <label>Email</label>
                    <input type="text" value={email} name="email" onChange={handlechange} className="form-control" />
                    <label>Password</label>
                    <input type="text" value={password} name="password" onChange={handlechange} className="form-control" />
                    <label>Is Allowed</label>
                    <select value={isallowed} name="select" onChange={handlechange} className="form-select" aria-label="Default select example">
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                    </select> <br />
                    <input type="submit" className="btn btn-outline-primary" />
                    <span type="button" className="btn btn-outline-primary ms-3" onClick={handletoggle} >Cancel</span>
                </form>
            </div>
        </div>
    )
}

export default Addstudent