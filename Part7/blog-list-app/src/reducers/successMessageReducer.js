
const successMessageReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_SUCCESS_MESSAGE':
            return action.successMessage
        case 'REMOVE_MESSAGE':
            return ''
        default:
            return state
    }
}

export const setSuccessNotification = (message, time) => {
    return async dispatch => {
        dispatch({
            type: 'SET_SUCCESS_MESSAGE',
            successMessage: message
        })

        setTimeout(() => {
            dispatch({
                type: 'REMOVE_MESSAGE'
            })
        }, time * 1000)
    }
}

export default successMessageReducer