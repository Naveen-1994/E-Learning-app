import React, { useState } from "react";

const AddCourse = () => {
    const [Cname, setName] = useState('')
    const [description, setDecsription] = useState('')
    const [duration, setDuration] = useState('')
    const [releaseDate, setReleasedate] = useState('')
    const [iseDelete, setIsdelete] = useState(false)
    const [category, setCategory] = useState('')
    const [validity, setValidty] = useState('')
    const [level, setLevel] = useState('')
    const [author, setAuthor] = useState('')

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

        console.log(formdata)

    }

    return (
        <div className="row">
            <div className="col-md-3">
                <p className="m-2">Add a Course <i type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className="bi bi-journal-plus"></i></p>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Enter Course Details</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <label>Name* </label>
                                    <input type="text" value={Cname} name="Cname" onChange={handlechange} className="form-control" />
                                    <label>Decsription* </label>
                                    <textarea value={description} name="discription" onChange={handlechange} className="form-control" />
                                    <label>Duration in Months* </label>
                                    <input type="text" value={duration} name="duration" onChange={handlechange} className="form-control" />
                                    <label>Release Date* </label>
                                    <input type="date" value={releaseDate} name="releasedate" onChange={handlechange} className="form-control" />
                                    <label>Delete</label>
                                    <select name="isdelete" value={iseDelete} onChange={handlechange} className="form-select" aria-label="Default select example">
                                        <option value={true}>True</option>
                                        <option value={false}>False</option>
                                    </select>
                                    <label>Category*</label>
                                    <select name="category" value={category} onChange={handlechange} className="form-select" aria-label="Default select example">
                                        <option value="html">HTML</option>
                                        <option value="css">CSS</option>
                                        <option value="javascript">Javascript</option>
                                        <option value="reactjs">reactJs</option>
                                        <option value="nodejs">nodeJs</option>
                                        <option value="expressJs">expressJs</option>
                                        <option value="mongodb">mongoDb</option>
                                    </select>
                                    <label>Validity in Months*</label>
                                    <input type="text" value={validity} name="validity" onChange={handlechange} className="form-control" />
                                    <label>Level</label>
                                    <select name="level" value={level} onChange={handlechange} className="form-select" aria-label="Default select example">
                                        <option value="beginner">Beginner</option>
                                        <option value="intermediate">Intermediate</option>
                                        <option value="expert">Expert</option>
                                    </select>
                                    <label>Author</label>
                                    <input type="text" value={author} name="author" onChange={handlechange} className="form-control" />
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={handlesubmit}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCourse