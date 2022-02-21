import { createStore, combineReducers } from 'redux'
import UserReducer from './UserReducer'

const ConfigureStore = () => {
    const store = createStore(combineReducers({
        users: UserReducer
    }))

    return store
}

export default ConfigureStore