import React, { useEffect, useState } from 'react'
import { Switch, Route, Link, useRouteMatch, Redirect } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import SuccessNotification from './components/SuccessNotification'
import Togglable from './components/Togglable'
import UsersList from './components/UsersList'
import Blog from './components/Blog'
import { Navbar, Nav } from 'react-bootstrap'
import commentService from './services/comments'
import userService from './services/users'

import { initializeBlogs, createBlog, updateBlog, removeBlog, sortBlogs } from './reducers/blogReducer'
import { setSuccessNotification } from './reducers/successMessageReducer'
import { loginUser, logoutUser, setUser } from './reducers/userReducer'

import styled from 'styled-components'

import './App.css'
import { useDispatch, useSelector } from 'react-redux'

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const Input = styled.input`
  margin: 0.25em
`

const App = () => {

  const dispatch = useDispatch()

  let blogs = useSelector(state => state.blogs)
  let errorMessage = useSelector(state => state.errorMessage)
  let successMessage = useSelector(state => state.successMessage)
  let user = useSelector(state => state.user)
  const [users, setUsers] = useState([])
  const [comments, setComments] = useState([])

  useEffect(() => {
    dispatch(initializeBlogs())
    userService
      .getUsersData()
      .then(response => {
        setUsers(response)
      })

    commentService
      .getAll()
      .then(response => setComments(response))

  }, [])

  useEffect(() => {
    if (user !== null) {
      showSuccessMessage('user accepted')
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    } else {
      const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')
      if (loggedUserJson) {
        const userData = JSON.parse(loggedUserJson)
        dispatch(setUser(userData))
      }
    }
  }, [user])

  const showSuccessMessage = message => {
    dispatch(setSuccessNotification(message, 2))
  }

  const handleLogin = (credentials) => {
    dispatch(loginUser(credentials))
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(logoutUser())
  }

  const handlePostBlog = (newBlog) => {

    dispatch(createBlog(newBlog))
    showSuccessMessage('Blog posted')
  }

  const handleUpdateBlogLikes = (newBlog) => {

    dispatch(updateBlog(newBlog))
    showSuccessMessage('Blog updated')
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
    dispatch(sortBlogs(blogs))
  }

  const handleRemoveBlog = blogToRemove => {
    if (window.confirm('Are you sure you want to remove this blog?')) {
      dispatch(removeBlog(blogToRemove))
    }
  }

  const padding = {
    padding: 5
  }

  const match = useRouteMatch('/users/:id')
  const userSelected = match ? users.find(u => u.id === match.params.id) : null

  const matchBlog = useRouteMatch('/blogs/:id')
  const blogSelected = matchBlog ? blogs.find(b => b.id === matchBlog.params.id) : null

  return (
    <div>

      <Navbar collapseOnSelect expand="lg" bg="danger" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">home</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {
                user === null
                  ? <Link style={padding} to="/login">login</Link>
                  : <p>{user.username} logged in  <Button onClick={handleLogout}>log out</Button></p>
              }
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <h2>Blogs</h2>
      <Notification message={errorMessage} />
      <SuccessNotification message={successMessage} />

      <br />

      <Switch>
        <Route path="/users/:id">
          <div>
            <h5>Added blogs</h5>
            <ul>
              {
                userSelected?.blogs.map(blog => <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>)
              }
            </ul>
          </div>
        </Route>
        <Route path="/users">
          <UsersList users={users} />
        </Route>
        <Route path="/blogs/:id">
          {
            blogSelected
              ? <Blog
                key={blogSelected.id}
                blog={blogSelected}
                likeBlog={handleUpdateBlogLikes}
                handleRemove={handleRemoveBlog}
                comments={comments.filter(c => c.blog === blogSelected.id)}
              />
              : null
          }
        </Route>
        <Route path="/login">
          {
            user === null
              ? loginForm()
              : <Redirect to="/" />
          }
        </Route>
        <Route path="/">
          {
            user !== null
              ? <div>
                {
                  blogForm()

                }
                <BlogList
                  user={user}
                  blogs={blogs}
                  handleUpdateBlogLikes={handleUpdateBlogLikes}
                  handleRemoveBlog={handleRemoveBlog}
                  handleLikesSort={handleLikesSort}
                />
              </div>

              : null
          }
        </Route>
      </Switch>
    </div>
  )
}

export default App