import { useQuery } from '@apollo/client'
import React from 'react'
import { ALL_BOOKS, USER_INFO } from '../queries'

const Recommendation = ({ show }) => {
    
  const result = useQuery(USER_INFO)
  const userData = result.data && result.data.me
  const favoriteGenre = userData?.favoriteGenre
  const bookResult = useQuery(ALL_BOOKS, {variables: {genre: favoriteGenre}})

  if (!show) {
    return null
  }

  const booksToShow = bookResult.data?.allBooks
  
  return (
      <div>
          <h2>recommendations</h2>
          <p>books in your favorite genre <strong>{userData?.favoriteGenre}</strong></p>
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
      </div>
  )
}

export default Recommendation