import React, { useState } from "react";
import validator from "validator";
import { useDispatch } from "react-redux";
import { getCourseDeatail } from "../reduxStore/Configaction";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Editcourse = (props) => {
    const { name: CEname, description: Cdescription, duration: Cduration, releaseDate: CreleaseDate, iseDelete: CiseDelete, category: Ccategory, validity: Cvalidity, level: Clevel, author: Cauthor } = props
    const dispatch = useDispatch()
    const history = useHistory()
    const [closeModal, setclosemodal] = useState("")
    const [Cname, setName] = useState(CEname)
    const [description, setDecsription] = useState(Cdescription)
    const [duration, setDuration] = useState(Cduration)
    const [releaseDate, setReleasedate] = useState(CreleaseDate)
    const [iseDelete, setIsdelete] = useState(CiseDelete)
    const [category, setCategory] = useState(Ccategory)
    const [validity, setValidty] = useState(Cvalidity)
    const [level, setLevel] = useState(Clevel)
    const [author, setAuthor] = useState(Cauthor)

    const handlechange = (e) => {
        if (e.target.name === "Cname")
            setName(e.target.value)
        else if (e.target.name === "discription")
            setDecsription(e.target.value)
        else if (e.target.name === "duration")
            setDuration(e.target.value)
        else if (e.target.name === "releasedate")
            setReleasedate(e.target.value)
        else if (e.target.name === "isdelete")
            setIsdelete(e.target.value)
        else if (e.target.name === "category")
            setCategory(e.target.value)
        else if (e.target.name === "validity")
            setValidty(e.target.value)
        else if (e.target.name === "level")
            setLevel(e.target.value)
        else
            setAuthor(e.target.value)
    }

    const handlesubmit = (e) => {
        e.preventDefault()
        const formdata = {
            name: Cname,
            description: description,
            duration: duration,
            releaseDate: releaseDate,
            iseDelete: iseDelete,
            category: category,
            validity: validity,
            level: level,
            author: author
        }
        axios.post("https://dct-e-learning.herokuapp.com/api/courses", formdata, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                console.log(response.data)
                if (response.hasOwnProperty('errors'))
                    alert(response.errors)
                else {
                    setclosemodal('modal')
                    setName('')
                    setDecsription('')
                    setDuration('')
                    setReleasedate('')
                    setIsdelete(false)
                    setCategory('')
                    setValidty('')
                    setLevel('')
                    setAuthor('')
                    dispatch(getCourseDeatail())
                }
            })
            .catch((err) => {
                console.log(err.message)
            })

    }

    return (
        <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="editModalLabel">Edit Course Details</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handlesubmit}>
                            {console.log(Cname)}
                            <label>Name* </label>
                            <input type="text" value={Cname} name="Cname" onChange={handlechange} className="form-control" />
                            <label>Decsription* </label>
                            <textarea value={description} name="discription" onChange={handlechange} className="form-control" />
                            <label>Duration in Months* </label>
                            <input type="text" value={duration} name="duration" onChange={handlechange} className="form-control" />
                            <label>Release Date* </label>
                            <input type="date" value={releaseDate} name="releasedate" onChange={handlechange} className="form-control" />
                            <label>Delete</label>
                            <select name="isdelete" value={iseDelete} onChange={handlechange} className="form-select" aria-label="Default select edit">
                                <option value={true}>True</option>
                                <option value={false}>False</option>
                            </select>
                            <label>Category*</label>
                            <select name="category" value={category} onChange={handlechange} className="form-select" aria-label="Default select edit">
                                <option value="">Select the category</option>
                                <option value="HTML">HTML</option>
                                <option value="CSS">CSS</option>
                                <option value="javascript">Javascript</option>
                                <option value="reactjs">reactJs</option>
                                <option value="nodejs">nodeJs</option>
                                <option value="expressjs">expressJs</option>
                                <option value="mongodb">mongoDb</option>
                            </select>
                            <label>Validity in Months*</label>
                            <input type="text" value={validity} name="validity" onChange={handlechange} className="form-control" />
                            <label>Level</label>
                            <select name="level" value={level} onChange={handlechange} className="form-select" aria-label="Default select edit">
                                <option value="">Choose the level</option>
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="expert">Expert</option>
                            </select>
                            <label>Author</label>
                            <input type="text" value={author} name="author" onChange={handlechange} className="form-control" />
                            <button type="button" className="btn btn-secondary mt-1" data-bs-dismiss="modal">Close</button>
                            <input type="submit" className="btn btn-primary mt-1" data-bs-dismiss="modal" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Editcourse