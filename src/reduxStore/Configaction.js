import axios from "axios"

export const addToken = (token) => {
    return {
        type: 'ADD_TOKEN',
        payload: token
    }
}

export const getAdmindetails = (adminURL) => {
    return (dispatch) => {
        axios.get(adminURL, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                if (response.data.hasOwnProperty("errors")) {
                    alert(response.errors)
                }
                else {
                    const details = response.data
                    dispatch(addAdmindetails(details))
                }


            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

export const addAdmindetails = (details) => {
    return {
        type: "ADD_DETAILS",
        payload: details
    }
}

export const getStudentdetails = () => {
    return (dispatch) => {
        axios.get('https://dct-e-learning.herokuapp.com/api/admin/students', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                if (response.data.hasOwnProperty("error")) {
                    alert(response.errors)
                }
                else {
                    const details = response.data
                    dispatch(addstudentdetails(details))
                }
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
}

export const addstudentdetails = (st_details) => {
    return {
        type: "ADD_STUDENTS",
        payload: st_details
    }
}

export const getCourseDeatail = () => {
    return (dispatch) => {
        axios.get("https://dct-e-learning.herokuapp.com/api/courses", {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                if (response.data.hasOwnProperty("errors"))
                    alert(response.data.errors)
                else
                    dispatch(addCourseDetails(response.data))
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
}

export const addCourseDetails = (courses) => {
    return {
        type: "ADD_COURSE",
        payload: courses
    }
}

export const getLectureDetails = (id) => {
    return (dispatch) => {
        axios.get(`https://dct-e-learning.herokuapp.com/api/courses/${id}/lectures`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                if (response.data.hasOwnProperty("errors"))
                    alert(response.data.errors)
                else
                    dispatch(addLectureDetails(response.data))
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
}

export const addLectureDetails = (lectures) => {
    return {
        type: "ADD_LECTURE",
        payload: lectures
    }
}

