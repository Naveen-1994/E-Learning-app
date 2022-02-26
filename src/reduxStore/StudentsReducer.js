const initialvalue = []

const StudentReducer = (state = initialvalue, action) => {
    switch (action.type) {
        case "ADD_STUDENTS": {
            return action.payload
        }
        default: {
            return [...state]
        }
    }
}

export default StudentReducer