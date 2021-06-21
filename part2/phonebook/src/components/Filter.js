import React from 'react'

const Filter = ({newSearch, handleChangeSearch}) => {
    return (
        <div>
            <div>
                <input placeholder='Search contact' value={newSearch} onChange={handleChangeSearch}/>
            </div>
        </div>
    )
}

export default Filter