const initialvalue = []

const UserReducer = (state = initialvalue, action) => {

    switch (action.type) {
        case "ADD_DETAILS": {
            return action.payload
        }
        default: {
            return state
        }
    }
}

export default UserReducer