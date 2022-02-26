import axios from "axios"
export const addToken = (token) => {
    return {
        type: 'ADD_TOKEN',
        payload: token
    }
}

export const getAdmindetails = () => {
    return (dispatch) => {
        axios.get('https://dct-e-learning.herokuapp.com/api/admin/account', {
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