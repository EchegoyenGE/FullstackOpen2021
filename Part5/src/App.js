import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import SuccessNotification from './components/SuccessNotification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
        setBlogs(blogs)
      )
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showSuccessMessage = message => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage('')
    }, 1500)
  }

  const showErrorMessage = message => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 2000)
  }

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      showSuccessMessage('user accepted')
    } catch (exception) {
      showErrorMessage('Wrong credentials')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handlePostBlog = (newBlog) => {
    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs([...blogs, returnedBlog])
        showSuccessMessage('Blog posted')
      })
  }

  const handleUpdateBlogLikes = (newBlog) => {
    blogService
      .updateBlog(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(b => {
          if (b.id === returnedBlog.id) return returnedBlog
          return b
        }))
        showSuccessMessage('Blog updated')
      })
  }

  const loginForm = () => (
    <Togglable buttonLabel="log in">
      <LoginForm loginUser={handleLogin} />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel="create new blog">
      <BlogForm createBlog={handlePostBlog} />
    </Togglable>
  )

  const handleLikesSort = () => {
    const newBlogs = blogs.sort((a, b) => b.likes - a.likes)
    setBlogs([...newBlogs])
  }

  const handleRemoveBlog = blogToRemove => {

    if (window.confirm('Are you sure you want to remove this blog?')) {
      blogService
        .remove(blogToRemove)
        .then(deletedBlog => {
          setBlogs(blogs.filter(blog => blog.id !== deletedBlog.id))
        })
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      <SuccessNotification message={successMessage} />
      {
        user === null
          ? loginForm()
          : <>
            <p>{user.username} logged in  <button onClick={handleLogout}>log out</button></p>
            {blogForm()}
          </>
      }
      <br />
      {
        blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={handleUpdateBlogLikes}
            userId={user.id}
            handleRemove={handleRemoveBlog}
          />
        )
      }
      <button onClick={handleLikesSort}>Sort by likes</button>
    </div>
  )
}

export default App