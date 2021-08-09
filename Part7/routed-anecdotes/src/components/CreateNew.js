import React from 'react'
import { useHistory } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = ({addNew, handleNotification}) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')
  
    const history = useHistory()
  
    const handleSubmit = (e) => {
      e.preventDefault()
      addNew({
        content: content.input.value,
        author: author.input.value,
        info: info.input.value,
        votes: 0
      })
      history.push('/anecdotes')
      handleNotification()
  }

  const handleReset = () => {
    content.reset()
    info.reset()
    author.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.input} />
        </div>
        <div>
          author
          <input {...author.input} />
        </div>
        <div>
          url for more info
          <input {...info.input} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={(e) => handleReset(e)}>reset</button>
      </form>
    </div>
  )
}
  
export default CreateNew