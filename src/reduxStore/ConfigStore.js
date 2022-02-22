import { createStore, combineReducers, applyMiddleware } from 'redux'
import UserReducer from './UserReducer'
import thunk from 'redux-thunk'

const ConfigureStore = () => {
    const store = createStore(combineReducers({
        userdetail: UserReducer,
    }), applyMiddleware(thunk))

    return store
}

export default ConfigureStore