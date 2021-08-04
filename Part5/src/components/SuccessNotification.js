import React from 'react'

const SuccessNotification = ({message}) => {
    if (!message) {
        return null
    }

    return (
        <div className='success'>
            {message}
        </div>
    )
}

export default SuccessNotification