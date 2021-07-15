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
        "title": "Secong blog",
        "author": "Jim",
        "url": "www.newblog2.com",
        "likes": 15
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = { api, initialBlogs, blogsInDb, usersInDb }