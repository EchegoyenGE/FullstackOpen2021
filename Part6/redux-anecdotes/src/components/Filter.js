import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  
    const handleChange = (e) => {
        const content = e.target.value
        props.setFilter(content)
    }
    
    return (
        <div>
            <input onChange={handleChange}/>
        </div>
    )
}

export default connect(null, { setFilter })(Filter)