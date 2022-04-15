const initialvalue = []

const CourseReducer = (state = initialvalue, action) => {
    switch (action.type) {
        case "ADD_COURSE": {
            return action.payload
        }
        default: {
            return state
        }
    }
}

export default CourseReducer