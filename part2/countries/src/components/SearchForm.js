import React from 'react'

const SearchForm = ({ search, handleChange }) => {
    return (
        <div>
            Find countries <input value={search} placeholder='Country...' onChange={handleChange} />
        </div>
    )
}

export default SearchForm