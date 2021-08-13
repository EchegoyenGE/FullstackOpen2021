import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries' 

const Authors = (props) => {

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [updateAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message)
    }
  })

  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })

  if (!props.show) {
    return null
  }

  const authors = result.data && result.data.allAuthors

  const handleUpdate = (event) => {
    event.preventDefault()

    if (name === '') {
      console.log('Pick an author')
      return 
    }
  
    updateAuthor({ variables: { name, born } })
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors && authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={handleUpdate}>
          <div>
            <select style={{ fontSize: 18 }} onChange={({ target }) => setName(target.value)}>
              <option value=''>Select the author</option>
              {
                authors && authors.map(a => 
                  <option key={a.name} value={a.name}>{a.name}</option>
                )
              }
            </select>
          </div>
          <div>
            born <input value={born} onChange={({ target }) => setBorn(Number(target.value))} />
          </div>
          <button type='submit'>update author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
