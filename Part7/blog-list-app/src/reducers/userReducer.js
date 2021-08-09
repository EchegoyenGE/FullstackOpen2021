import loginService from '../services/login'
import blogService from '../services/blogs'

const userReducer = (state = null, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return action.data
        case 'LOG_OUT':
            return null
        case 'SET_USER':
            return action.data
        default:
            return state
    }
}

export const loginUser = credentials => {
    return async dispatch => {
        const userData = await loginService.login(credentials)
        await blogService.setToken(userData.token)
        dispatch({
            type: 'LOGIN_USER',
            data: userData
        })
    }
}

export const logoutUser = () => {
    return async dispatch => {
        dispatch({
            type: 'LOG_OUT'
        })
    }
}

export const setUser = userData => {
    return async dispatch => {
        await blogService.setToken(userData.token)
        dispatch({
            type: 'SET_USER',
            data: userData
        })
    }
}

export default userReducer