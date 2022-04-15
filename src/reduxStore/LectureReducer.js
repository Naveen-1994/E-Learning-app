const initialvalue = []

const LectureReducer = (state = initialvalue, action) => {
    switch (action.type) {
        case "ADD_LECTURE": {
            return action.payload
        }
        default: {
            return state
        }
    }
}

export default LectureReducer