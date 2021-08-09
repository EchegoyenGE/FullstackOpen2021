const successMessageReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_ERROR_MESSAGE':
            return action.errorMessage
        case 'REMOVE_MESSAGE':
            return ''
        default:
            return state
    }
}

export const setErrorNotification = (message, time) => {
    return async dispatch => {
        dispatch({
            type: 'SET_ERROR_MESSAGE',
            errorMessage: message
        })

        setTimeout(() => {
            dispatch({
                type: 'REMOVE_MESSAGE'
            })
        }, time * 1000)
    }
}

export default successMessageReducer