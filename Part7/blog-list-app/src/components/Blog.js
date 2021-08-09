import React, { useState } from 'react'
import commentService from '../services/comments'
import styled from 'styled-components'

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const Blog = ({ blog, likeBlog, handleRemove, comments }) => {

  const [newComment, setNewComment] = useState('')
  const [currentComments, setCurrentComments] = useState(comments)

  const handleBlogLiked = () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id
    }

    likeBlog(updatedBlog)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    commentService
      .createComment(blog.id, newComment)
      .then(response => {
        setNewComment('')
        setCurrentComments([...currentComments, response])
      })
  }

  return (
    <div className="blog">
      <div>
        <h1>{blog.title}</h1>
        <p>added by {blog.author}</p>
        <p className='url-p'>Url: {blog.url}</p>
        <p className='likes-p'>
          Likes: {blog.likes}
          <Button className='likeBtn' onClick={handleBlogLiked}>
            like
          </Button>
        </p>
        <Button onClick={() => handleRemove(blog)}>remove</Button>
      </div>
      <div>
        <br />
        <br />
        {
          (comments === undefined)
            ? null
            : <div>
              <h4>Comments</h4>
              <form onSubmit={handleSubmit}>
                <input
                  id="comment"
                  type="text"
                  value={newComment}
                  onChange={({ target }) => setNewComment(target.value)}
                  placeholder="New Comment"
                />
                <Button>Save comment</Button>
              </form>
            </div>
        }
        <br />
        <ul>
          {
            currentComments !== undefined
              ? currentComments.map(c => <li key={c.id}>{c.content}</li>)
              : null
          }
        </ul>
      </div>
    </div>
  )
}

export default Blog
