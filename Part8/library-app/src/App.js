import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendation from './components/Recommendation'
import { gql, useApolloClient, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_DETAILS } from './queries'

export const BOOK_ADDED = gql`
    subscription{
        bookAdded{
            ...bookDetails
        }
    }
    ${BOOK_DETAILS}
`

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }

  return (
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState('')
  const client = useApolloClient()

  useEffect(() => {
    if (!token) {
      const oldToken = window.localStorage.getItem('library-app-token')
      if (oldToken) {
        setToken(oldToken)
      }
    }
  }, [token])

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => {
      set.map(p => p.id).includes(object.id)
    }
    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook)}
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify(`${addedBook.name} added`)
      updateCacheWith(addedBook)
    }
  })

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
          />
      </div>
    )
  }

  return (
    <div>
      <button onClick={logout}>logout</button>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')} >authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')} >add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
      </div>

      <Authors
        show={page === 'authors'}
        setError={notify}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        setError={notify}
      />

      <Recommendation
        show={page === 'recommend'}
        />

    </div>
  )
}

export default App