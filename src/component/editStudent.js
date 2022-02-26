import axios from "axios";
import React, { useState } from "react";

const EditStudent = (props) => {
    const { handledit, name: Sname, email: Semail, isallowed: Sallowed, id } = props
    const [name, setName] = useState(Sname)
    const [email, setEmail] = useState(Semail)
    const [isallowed, setIsallowed] = useState(Sallowed)

    const handlechange = (e) => {
        if (e.target.name === "name")
            setName(e.target.value)
        else if (e.target.name === "email")
            setEmail(e.target.value)
        else
            setIsallowed(!isallowed)
    }

    const handlesubmit = (e) => {
        e.preventDefault()
        const formdata = {
            name: name,
            email: email,
            isAllowed: isallowed
        }
        axios.put(`https://dct-e-learning.herokuapp.com/api/students/${id}`, formdata, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                if (response.data.hasOwnProperty('errors'))
                    alert(response.errors)
                else {
                    console.log(response.data)
                    handledit()
                }

            })
            .catch((err) => {
                alert(err.message)
            })
    }

    const handletoggle = () => {
        handledit()
    }

    return (
        <div className="row">
            <div className="col-md-4 ms-2 pb-2">
                <form onSubmit={handlesubmit}>
                    <label>Name</label>
                    <input type="text" value={name} name="name" onChange={handlechange} className="form-control" />
                    <label>Email</label>
                    <input type="text" value={email} name="email" onChange={handlechange} className="form-control" />
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

export default EditStudent