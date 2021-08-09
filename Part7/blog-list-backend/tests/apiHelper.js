const { app } = require('../index')
const supertest = require('supertest')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        "title": "First blog",
        "author": "Me",
        "url": "www.newblog.com",
        "likes": 12
    },
    {
        "title": "Second blog",
        "author": "Jim",
        "url": "www.newblog2.com",
        "likes": 15
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const nonExistingId = async () => {
    const blog = new Blog({ title: 'new blog', author: 'me', url: 'this', likes: 50 })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = { api, initialBlogs, blogsInDb, usersInDb, nonExistingId }