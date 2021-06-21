import React from 'react'

            
const Notification = ({ message, success }) => {
    if (!message) {
        return null
    }

    return (
        <div className={success ? 'green-notification' : 'red-notification'}>
            <h4>
            { message }
            </h4>
        </div>
    )
}

export default Notification 