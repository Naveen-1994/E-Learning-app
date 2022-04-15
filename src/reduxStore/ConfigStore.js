import { createStore, combineReducers, applyMiddleware } from 'redux'
import UserReducer from './UserReducer'
import StudentReducer from './StudentsReducer'
import CourseReducer from './CourseReducer'
import LectureReducer from './LectureReducer'
import thunk from 'redux-thunk'

const ConfigureStore = () => {
    const store = createStore(combineReducers({
        userdetail: UserReducer,
        students: StudentReducer,
        courses: CourseReducer,
        lectures: LectureReducer
    }), applyMiddleware(thunk))

    return store
}

export default ConfigureStore