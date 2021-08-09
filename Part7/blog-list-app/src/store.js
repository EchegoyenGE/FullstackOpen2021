import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogReducer from './reducers/blogReducer'
import successMessageReducer from './reducers/successMessageReducer'
import errorMessageReducer from './reducers/errorMessageReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
    blogs: blogReducer,
    successMessage: successMessageReducer,
    errorMessage: errorMessageReducer,
    user: userReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store