import React from 'react'

const Total = ({parts}) => {
    return (
      <p><strong>Total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</strong></p>
    )
}
  
export default Total