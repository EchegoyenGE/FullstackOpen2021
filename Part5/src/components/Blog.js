import React, { useState } from 'react'

const Blog = ({ blog, likeBlog, userId, handleRemove }) => {

  const [showExtendedData, setShowExtendedData] = useState(false)

  const changeShowData = () => {
    setShowExtendedData(!showExtendedData)
  }

  const normalData = () => (
    <div>
      <p className='title-p'>{blog.title}</p>
      <p className='author-p'>{blog.author}</p>
      <button className='show-extended' onClick={changeShowData}>
        view
      </button>
    </div>
  )

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

  const extendedData = () => (
    <div>
      <p>Title: {blog.title}</p>
      <p>Author: {blog.author}</p>
      <p className='url-p'>Url: {blog.url}</p>
      <p className='likes-p'>
        Likes: {blog.likes}
        <button className='likeBtn' onClick={handleBlogLiked}>
          like
        </button>
      </p>
      <button onClick={changeShowData}>hide</button><br />
      <button onClick={() => handleRemove(blog)}>remove</button>
    </div>
  )

  return (
    <div className="blog">
      {showExtendedData ? extendedData() : normalData()}
    </div>
  )
}

export default Blog
