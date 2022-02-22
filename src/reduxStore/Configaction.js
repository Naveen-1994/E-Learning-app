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
                const details = response.data
                dispatch(addAdmindetails(details))

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