import React from 'react'
import Blog from './Blog'

const BlogList = ({ user, blogs, handleUpdateBlogLikes, handleRemoveBlog, handleLikesSort }) => {

    return (
        <div>
            {
                user &&
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

export default BlogList