import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {

  const [selectedGenre, setSelectedGenre] = useState('')
  const result = useQuery(ALL_BOOKS, { pollInterval: 2000 })

  if (!props.show) {
    return null
  }

  const books = result.data && result.data.allBooks

  const booksToShow = (selectedGenre !== '') ? books.filter(b => b.genres.includes(selectedGenre)) : books

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksToShow.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <button onClick={() => setSelectedGenre('refactoring')}>refactoring</button>
        <button onClick={() => setSelectedGenre('agile')}>agile</button>
        <button onClick={() => setSelectedGenre('patterns')}>patterns</button>
        <button onClick={() => setSelectedGenre('design')}>design</button>
        <button onClick={() => setSelectedGenre('crime')}>crime</button>
        <button onClick={() => setSelectedGenre('classic')}>classic</button>
        <button onClick={() => setSelectedGenre('')}>all genres</button>
      </div>
    </div>
  )
}

export default Books