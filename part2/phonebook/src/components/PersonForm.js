import React from 'react'

const PersonForm = ({addContact, newName, newPhone, handleNameChange, handlePhoneChange}) => {
    return (
            <form onSubmit={addContact}>
                <div>
                    <div>
                        <input placeholder='Name' value={newName} onChange={handleNameChange} />
                    </div>
                    <div>
                        <input placeholder='Phone' value={newPhone} onChange={handlePhoneChange} />
                    </div>
                    <button>add</button>
                </div>
            </form>
    )
}

export default PersonForm