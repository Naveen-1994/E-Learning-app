import { createStore, combineReducers, applyMiddleware } from 'redux'
import UserReducer from './UserReducer'
import StudentReducer from './StudentsReducer'
import thunk from 'redux-thunk'

const ConfigureStore = () => {
    const store = createStore(combineReducers({
        userdetail: UserReducer,
        students: StudentReducer
    }), applyMiddleware(thunk))

    return store
}

export default ConfigureStore